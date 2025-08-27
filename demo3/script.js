/*
Função calcularMedia()
Objetivos:
1-Obter os valores informados no formulário
2-Validar a entrada
3-Calcular a média aritmética
4-Verificar se o aluno foi APROVADO ou REPROVADO
5-Apresentar o resultado
*/

function calcularMedia() {
    // 1 - Obter os valores informados no formulário
    let nome = document.getElementById("nome").value;
    console.log(nome);

    let nota1 = parseFloat(document.getElementById("nota1").value);
    console.log(nota1);

    let nota2 = parseFloat(document.getElementById("nome2").value);
    console.log(nota2);

    // 2 - Validar os valores do formulário
    if (!nome || isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
        alert("Preencha todos os campos corretamente.");
    } else {
        // 3 - Calcular a média aritmética
        let media = (nota1 + nota2) / 2;
        console.log(media);
        // 4 - Verificar se o aluno foi APROVADO ou REPROVADO
        let mensagem = "";
        if (media >= 7) {
            mensagem = `${nome}, suas notas foram ${nota1} e ${nota2}, atingindo a média de ${media}, e você foi APROVADO`
        } else {
            mensagem = `${nome}, suas notas foram ${nota1} e ${nota2}, atingindo a média de ${media}, e você foi REPROVADO`
        }
        console.log(mensagem);
        // 5 - Aprsentar o resultado
        document.getElementById("mensagem").innerText = mensagem;
        document.getElementById("resultado").classList.remove("oculto");
        document.getElementById("formulario").classList.add("oculto");
    }
}

function outroCalculo() {
    document.getElementById("resltado").classList.add("oculto");
    document.getElementById("formulario").classList.remove("oculto");
    document.getElementById("nome").value="";
    document.getElementById("nota1").value="0";
    document.getElementById("nota2").value="0";
}