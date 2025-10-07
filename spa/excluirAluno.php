<?php
error_reporting(0);
ini_set('display_errors', 0);

require("conexaobd.php");

header('Content-Type: application/json');

try {
    if(!isset($_POST['id'])) {
            throw new Exception("ID n'ao fornecido");
    }

    // New: espaços em branco do início e fim do ID
    $id = trim($_POST['id']);

    if(empty($id)) {
        throw new Exception("ID não pode ser vazio");
    }

    $stmt = $pdo->prepare("SELECT IDALUNO FROM aluno WHERE IDALUNO = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        throw new Exception("Aluno não encontrado");
    }

    $stmt = $pdo->prepare("DELETE FROM aluno WHERE IDALUNO = :id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        "status" => "ok",
        "mensagem" => "Aluno excluido com sucesso."
    ]);
}  catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => $e->getMessage()
    ]);
}