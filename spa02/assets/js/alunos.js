const formulario = document.getElementById('formularioAluno');
const tabela = document.getElementById('tabelaAlunos').querySelector('tbody');
const campoId = document.getElementById('campoId');
const campoNome = document.getElementById('campoNome');
const campoCurso = document.getElementById('campoCurso');

function carregarAlunos() {

    // NEW: faz com que os fetch executam simultaneamente
    Promise.all([
        fetch('./api/alunos/listarAlunos.php'),
        fetch('./api/cursos/listarCursos.php')
    ])
    .then(async ([resAlunos, resCursos]) => {

        if (!resAlunos.ok || !resCursos.ok) {
            throw new Error('Erro na resposta do servidor');
        }

        const alunos = await resAlunos.json();
        const cursos = await resCursos.json();

        return { alunos, cursos };
    })
    .then(({ alunos, cursos }) => {
        if (alunos.status === "erro") throw new Error(alunos.mensagem);
        if (cursos.status === "erro") throw new Error(cursos.mensagem);

        tabela.innerHTML = '';

        const selectOpcoes = document.getElementById('campoCurso');

        cursos.forEach(cursos => {
            const option = document.createElement('option');
            option.value = cursos.IDCURSO;
            option.textContent = cursos.NOME;
            selectOpcoes.appendChild(option);
        })

        alunos.forEach(aluno => {
            const curso = cursos.find(c => c.IDCURSO === aluno.IDCURSO);

            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${aluno.IDALUNO}</td>
                <td>${aluno.NOME}</td>
                <td>${curso ? curso.NOME : "—"}</td>
                <td>
                    <button onclick="editarAluno(${aluno.IDALUNO}, '${aluno.NOME}')">Editar</button>
                    <button onclick="excluirAluno(${aluno.IDALUNO})">Excluir</button>
                </td>
            `;
            
            tabela.appendChild(linha);
        });

    })
    .catch(erro => {
        console.error("Erro ao carregar alunos:", erro);
        alert("Erro ao carregar a lista de alunos: " + erro.message);
    });
}

carregarAlunos()

function excluirAluno(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        const dados = new FormData();
        dados.append('id', id);

        fetch('./api/alunos/excluirAluno.php', { method: 'POST', body: dados})
            .then(res => {
                if(!res.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return res.json();
            })
            .then(retorno => {
                alert(retorno.mensagem);
                if(retorno.status === "ok") {
                    carregarAlunos();
                }
            })
            .catch(erro => {
                console.error("Erro ao excluir aluno:", erro);
                alert("Erro ao excluir o aluno: " + erro.mensagem);
            });
    }
}

function editarAluno(id, nome, curso) {
    campoId.value = id;
    campoNome.value = nome;
    campoCurso.value = curso;
}

// Evento que é acionado quando o formulário é enviado
formulario.addEventListener('submit', e => {
    // Impede o comportamento padrão do formulário
    e.preventDefault();

    const dados = new FormData();
    dados.append('id', campoId.value);
    dados.append('nome', campoNome.value);
    dados.append('curso', campoCurso.value);

    const url = campoId.value ? './api/alunos/alterarAluno.php' : './api/alunos/inserirAluno.php';

    fetch(url, {method: 'POST', body: dados})
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return res.json();
        })
        .then(retorno => {
            alert(retorno.mensagem);
            if (retorno.status === "ok") {
                formulario.reset();
                campoId.value = '';
                carregarAlunos();
            }
        })
        .catch(erro => {
            console.error("Erro ao processar a requisição:", erro);
            alert("Erro ao processar a requisição: " + erro.mensagem);
        });
});