<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Access-Control-Allow-Headers, Authorization");
    header("Access-Control-Allow-Credentials: true");

    session_start();

    include 'functions.php';
    $pdo = connect_db();

    $user_id = $_SESSION['user_id'] ?? null;
    $input = json_decode(file_get_contents('php://input'), true);
    $shop_id = $input['shop_id'] ?? null;

    if (!$user_id || !$shop_id) {
        echo json_encode(["status" => "error", "message" => "User ID and Shop ID are required."]);
        exit();
    }

    $sql = "SELECT * FROM shop_situation WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $existing_entry = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing_entry) {
        echo json_encode(["status" => "error", "message" => "You are already in a shop."]);
        exit();
    }

    $sql = "INSERT INTO shop_situation (shop_id, user_id) VALUES (:shop_id, :user_id)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':shop_id', $shop_id, PDO::PARAM_INT);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to enter the shop."]);
    }
?>
