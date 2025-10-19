<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['id', 'nome']);

$stmt = executarConsulta($pdo, "UPDATE curso SET NOME = :nome WHERE IDCURSO = :id", ['id' => $_POST['id'],'nome' => $_POST['nome']]);

verificarRegistroAfetado($stmt, 'Curso atualizado com sucesso', 'Curso não encontrado');
?>