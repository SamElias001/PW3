<?php
require("conexaobd.php");

$sql = "SELECT * FROM aluno ORDER BY NOME";

$stmt = $pdo->prepare($sql);
$stmt->execute();

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));