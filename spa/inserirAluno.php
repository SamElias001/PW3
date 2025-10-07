<?php
error_reporting((0));
ini_set('display_errors', 0);
 
require("conexaobd.php");
 
header('Content-Type: application/json');
 
try {
    if (!isset($_POST['nome'])) {
        throw new Exception("Nome não fornecido");
    }

    $nome = trim($_POST['nome']);

    if (empty($nome)) {
        throw new exception("Nome não pode ser vazio");
    }

    $stmt = $pdo->prepare("INSERT INTO aluno (NOME) VALUES (:nome)");
    $stmt->bindValue(':nome', $nome);
    $stmt->execute();

    echo json_encode([
        "status" => "ok",
        "mensagem" => "Aluno inserido com sucesso",
        "id" => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => $e->getMessage()
    ]);
}
?>