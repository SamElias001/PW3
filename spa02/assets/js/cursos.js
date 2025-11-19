const formulario = document.getElementById('formularioCurso');
const tabela = document.getElementById('tabelaCursos').querySelector('tbody');
const campoId = document.getElementById('campoId');
const campoNome = document.getElementById('campoNome');
const campoCurso = document.getElementById('campoCurso');

function carregarCursos() {
    fetch('./api/cursos/listarCursos.php')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return res.json();
        }) 
        .then(dados => {
            if (dados.status === "erro") {
                throw new Error(dados.mensagem);
            }
            tabela.innerHTML = '';
            dados.forEach(curso => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${curso.IDCURSO}</td>
                    <td>${curso.NOME}</td>
                    <td>
                        <button onclick="editarCurso(${curso.IDCURSO}, '${curso.NOME}')">Editar</button>
                        <button onclick="excluirCurso(${curso.IDCURSO})">Excluir</button>
                    </td>`;
                tabela.appendChild(linha);
            });
        })
        .catch(erro => {
            console.error("Erro ao carregar cursos:", erro);
            alert("Erro ao carregar a lista de cursos: " + erro.mensagem);
        });
}
carregarCursos()

function excluirCurso(id) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
        const dados = new FormData();
        dados.append('id', id);

        fetch('./api/cursos/excluirCurso.php', { method: 'POST', body: dados})
            .then(res => {
                if(!res.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return res.json();
            })
            .then(retorno => {
                alert(retorno.mensagem);
                if(retorno.status === "ok") {
                    carregarCursos();
                }
            })
            .catch(erro => {
                console.error("Erro ao excluir curso:", erro);
                alert("Erro ao excluir o curso: " + erro.mensagem);
            });
    }
}

function editarCurso(id, nome) {
    campoId.value = id;
    campoNome.value = nome;
}

// Evento que é acionado quando o formulário é enviado
formulario.addEventListener('submit', e => {
    // Impede o comportamento padrão do formulário
    e.preventDefault();

    const dados = new FormData();
    dados.append('id', campoId.value);
    dados.append('nome', campoNome.value);

    const url = campoId.value ? './api/cursos/alterarCurso.php' : './api/cursos/inserirCurso.php';

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
                carregarCursos();
            }
        })
        .catch(erro => {
            console.error("Erro ao processar a requisição:", erro);
            alert("Erro ao processar a requisição: " + erro.mensagem);
        });
});