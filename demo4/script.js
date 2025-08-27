// Função responsável por limpar os campos de endereço.
// Caso o CEP seja inválido, não encontrado ou ocorra algum erro,
// os campos de Logradouro, Bairoo, Localidade e UF ficam em branco.

function limparEndereco() {
    document.getElementById("cep").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("complemento").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("localidade").value = "";
    document.getElementById("uf").value = "";
}

// Função assíncrona que consulta a API ViaCEP.
// essa função é chamada quando o usuário sai do campo CEP (evento onblur no index.html).

async function buscarCEP() {
    try {
    // Captura o campo CEP do formulário
    const cepInput = document.getElementById("cep");
    // Remove qualquer caractere que não seja número (mantém apenas dígitos)
    const cep = (cepInput.value || "").replace(/\D/g, "");

    // Verifica se o CEP informado possui exataente 8 dígitos
    if (cep.length !== 8 ) {
        // Limpa os campos de endereço
        limparEndereco();
        // Alerta o usúario sobre o erro de formatação
        alert("CEP inálido. Informe 8 dígitos, por exeplo: 14020000 ou 13020-000.");
        return;
    }

    // Enquanto consulta o CEP, exibe "Carregando..." nos campos de endereço
    document.getElementById("logradouro").value = "Carregando...";
    document.getElementById("bairro").value = "Carregando...";
    document.getElementById("localidade").value = "Carregando...";
    document.getElementById("uf").value = "Carregando...";

    // Monta a URL da API ViaCEP para consulta do CEP
    const url = `https://viacep.com.br/ws/${cep}/json`;
    // Realiza a requisição HTTP usando fetch
    const resposta = await fetch(url);

    // Caso a resposta não seja bem-sucedida (ex.: erro de rede ou servidor)
    if (!resposta.ok) {
        limparEndereco(); // limpa os campos
        alert("Não foi possível consultar o CEP. Tente novamente.");
        return; // encerra a execução da função
    }

    // Converte a resposta para JSON (objeto JavaScript)
    const dados = await resposta.json();

    // A API ViaCEP retorna { "erro" : true } quando o CEP não existe
    if (dados.erro) {
        limparEndereco();
        alert("CEP não encontrado. Verifique e tente novamente,");
        return;
    }

    // Se tudo deu certo, preenche os campos de endereço com os dados obtidos
    document.getElementById("logradouro").value = dados.logradouro || "";
    document.getElementById("bairoo").value = dados.bairro || "";
    document.getElementById("localidade").value = dados.localidade || "";
    document.getElementById("uf").value = dados.uf || "";

    // Os camps "Número" e " Complemento" peranecem editáveis elo usuário.
    // Colocar o cursor automaicamente em "Número":
    document.getElementById("numero").focus();

    } catch (erro) {
        // Caso aconteça algum erro inesperado (falha de conexão, problema na API, etc.)
        limparEndereco(); // limpa os campos
        alert("Ocorreu um erro ao consultar o CEP. Verifique sua conxão e tente novamente.");
        //  Exibe o erro no console para depuração em ambiente de desenvolvimento
        console.error("Erro ao consultar ViaCEP:", erro);
    }
}