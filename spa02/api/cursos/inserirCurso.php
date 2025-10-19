<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['nome']);

$stmt = executarConsulta($pdo, "INSERT INTO curso (NOME) VALUES (:nome)",['nome'=> $_POST['nome']]);

retornarSucesso('Curso inserido com sucesso');
?>