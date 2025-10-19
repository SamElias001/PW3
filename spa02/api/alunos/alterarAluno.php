<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['id', 'nome']);

$stmt = executarConsulta($pdo, "UPDATE aluno SET NOME = :nome, IDCURSO = :curso WHERE IDALUNO = :id", ['id' => $_POST['id'],'nome' => $_POST['nome'],'curso' => processarValorOpcional('curso')]);

verificarRegistroAfetado($stmt, 'Aluno atualizado com sucesso', 'Aluno não encontrado');
?>