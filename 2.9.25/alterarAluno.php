<?php
error_reporting(0);
ini_set('display_errors', 0);

require("conexaobd.php");

header('Content-Type: application/json');

try {
    if(!isset($_POST['id'])) {
        throw new Exception("ID não fornecido");
    }

    if (!isset($_POST['nome'])) {
        throw new Exception("Nome não fornecido");
    }

    $id = trim($_POST['id']);
    $nome = trim($_POST['nome']);

    if(empty($id)) {
        throw new Exception("ID não pode ser vazio");
    }

    if(empty($nome)) {
        throw new Exception("Nome não pode ser vazio");
    }

    $stmt = $pdo->prepare("SELECT IDALUNO FROM aluno WHERE IDALUNO = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        throw new Exception("Aluno não encontrado");
    }

    $stmt = $pdo->prepare("UPDATE aluno SET NOME = :nome WHERE IDALUNO = :id");
    $stmt->bindValue(':nome', $nome);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        "status" => "ok",
        "mensagem" => "Aluno alterado com sucesso"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => $e->getMessage()
    ]);
}
?>