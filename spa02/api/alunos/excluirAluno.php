<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['id']);

$stmt = executarConsulta($pdo, "DELETE FROM aluno WHERE IDALUNO = :id", ['id' => $_POST['id']]);

verificarRegistroAfetado($stmt, 'Aluno excluído com sucesso', 'Aluno não encontrado');
?>