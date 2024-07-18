<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Access-Control-Allow-Headers, Authorization");
    header("Access-Control-Allow-Credentials: true");

    session_start();

    include 'functions.php';
    $pdo = connect_db();

    $user_id = $_SESSION['user_id'] ?? null;

    if (!$user_id) {
        echo json_encode(["shop_name" => ""]);
        exit();
    }

    $sql = "SELECT s.shop_name FROM shop_situation ss JOIN shops s ON ss.shop_id = s.id WHERE ss.user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $shop = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($shop) {
        echo json_encode($shop);
    } else {
        echo json_encode(["shop_name" => ""]);
    }
?>
