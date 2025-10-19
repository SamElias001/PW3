<?php
function retornarErro($mensagem) {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "erro",
        "mensagem" => $mensagem
    ]);
    exit;
}

function retornarSucesso($mensagem) {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "ok",
        "mensagem" => $mensagem
    ]);
    exit;
}

function verificarMetodoPost() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        retornarErro('M[etodo não permitido');
    }
}

function verificarCamposObrigatorios($campos) {
    foreach ($campos as $campo) {
        if (!isset($_POST[$campo]) || empty($_POST[$campo])) {
            retornarErro("O campo {$campo} é obrigatório.");
        }
    }
}

function executarConsulta($pdo, $sql, $parametros = []) {
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($parametros);
        return $stmt;
    } catch (PDOException $e) {
        retornarErro("Erro na consulta: " . $e->getMessage());
    }
}

function verificarRegistroAfetado($stmt, $mensagemSucesso, $mensagemErro = 'Registro não encontrado'){
    if ($stmt->rowCount() > 0) {
        retornarSucesso($mensagemSucesso);
    } else {
        retornarErro($mensagemErro);
    }
}

function processarValorOpcional($campo) {
    return !empty($_POST[$campo]) ? $_POST[$campo] : null;
}
?>