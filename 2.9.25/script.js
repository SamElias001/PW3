const formulario = document.getElementById('formularioAluno');
const tabela = document.getElementById('tabelaAlunos').querySelector('tbody');
const campoId = document.getElementById('campoId');
const campoNome = document.getElementById('campoNome');

function carregarAlunos() {
    fetch('listarAlunos.php')
        .then(res => {
            // NEW: Verifica se a resposta do servidor esta ok
            if (!res.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            // NEW: Converte a resposta para JSON
            return res.json();
        }) 
        .then(dados => {
            // NEW: Verifica se houve erro na resposta
            if (dados.status === "erro") {
                throw new Error(dados.mensagem);
            }
            tabela.innerHTML = '';
            dados.forEach(aluno => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${aluno.IDALUNO}</td>
                    <td>${aluno.NOME}</td>
                    <td>
                        <button onclick="editarAluno(${aluno.IDALUNO}, '${aluno.NOME}')">Editar</button>
                        <button onclick="excluirAluno(${aluno.IDALUNO})">Excluir</button>
                    </td>`;
                tabela.appendChild(linha);
            });
        })
        .catch(erro => {
            console.error("Erro ao carregar alunos:", erro);
            alert("Erro ao carregar a lista de alunos: " + erro.mensagem);
        });
}
carregarAlunos();

function excluirAluno(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        const dados = new FormData();
        dados.append('id', id);

        fetch('excluirAluno.php', { method: 'POST', body: dados})
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

function editarAluno(id, nome) {
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

    const url = campoId.value ? 'alterarAluno.php' : 'inserirAluno.php';

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