<?php
require_once '../conexaobd.php';
require_once '../funcoes.php';

try {
    $stmt = $pdo->query("
    SELECT
        a.IDALUNO,
        a.NOME,
        a.IDCURSO,
        c.NOME as CURSO NOME
    FROM aluno a
    LEFT JOIN curso c ON a.IDCURSO = c.IDCURSO
    ORDER BY a.NOME
    ");
    $alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($alunos);
} catch (PDOException $e) {
    retornarErro('Erro ao listar alunos: ' . $e->getMessage());
}
?>