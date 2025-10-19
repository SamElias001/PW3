<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

verificarMetodoPost();
verificarCamposObrigatorios(['nome']);
?>