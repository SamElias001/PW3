<?php
    require('../conexaobd.php');
    try{
        $consulta="SELECT IDCATEGORIA,NOME FROM categoria ORDER BY NOME;";
        $stmt = $pdo->query($consulta);
        $categorias = $stmt->fetchAll(PDO:FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($categorias);
    } catch (PDOException $erro) {
        // pegar continuação 
    }
?>