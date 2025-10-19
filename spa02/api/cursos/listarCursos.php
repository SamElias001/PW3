<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

try {
    $stmt = $pdo->query("SELECT IDCURSO, NOME FROM curso ORDER BY NOME");
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($cursos);
} catch (PDOException $e) {
    retornarErro('Erro ao listar cursos: ' . $e->getMessage());
}
?>