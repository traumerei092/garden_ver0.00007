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
        echo json_encode(["status" => "error", "message" => "User ID is required."]);
        exit();
    }

    // Delete entry
    $sql = "DELETE FROM shop_situation WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to exit the shop."]);
    }
?>
