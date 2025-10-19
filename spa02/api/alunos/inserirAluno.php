<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['nome']);

$stmt = executarConsulta($pdo, "INSERT INTO aluno (NOME, IDCURSO) VALUES (:nome, :curso)", ['nome' => $_POST['nome'],'curso' => processarValorOpcional('curso')]);

retornarSucesso('Aluno inserido com sucesso');
?>