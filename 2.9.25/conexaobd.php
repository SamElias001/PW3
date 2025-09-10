<?php
error_reporting(0);
ini_set('display_errors',0);

$host = 'localhost'; 
$dbname = 'spa';
$username = 'localhost';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$username,$password);
    $pdo->exec("SET NAMES utf8");
    $pdo->exec("SET CHARACTER SET utf8");

    $connection_status = $pdo->getAttribute(PDO::ATTR_CONNECTION_STATUS);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encodem([
        "status" => "erro",
        "mensagem" => "Erro ao conectar com o banco de dados: " . $e->getMessage()
    ]);
    exit;
}