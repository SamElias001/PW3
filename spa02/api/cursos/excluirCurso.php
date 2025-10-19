<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['id']);

$stmt = executarConsulta($pdo, "SELECT COUNT(*) FROM aluno WHERE IDCRUSO = :id", ['id' => $_POST['id']]);
$numAlunos = $stmt->fetchColumn();

if ($numAlunos > 0) {
    retornarErro('Não é possível excluir o curso pois existem alunos vinculados a ele');
}

$stmt = executarConsulta($pdo, "DELETE FROM curso WHERE IDCURSO = :id", ['id' => $_POST['id']]);

verificarRegistroAfetado($stmt, 'Curso excluído com sucesso', 'Curso não encontrado');
?>