<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }

    include('functions.php');
    $pdo = connect_db();

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $user_id = $_SESSION['user_id'] ?? null;
        $name = $data['name'] ?? null;
        $age = $data['age'] ?? null;
        $mail = $data['mail'] ?? null;
        $shop = $data['shop'] ?? null;

        if (!$user_id || !$name || !$age || !$mail || !$shop) {
            $response = array("status" => "error", "message" => "All fields are required.");
            echo json_encode($response);
            exit;
        }

        $sql = "UPDATE users SET name = :name, age = :age, mail = :mail, shop_id = :shop WHERE id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':name', $name, PDO::PARAM_STR);
        $stmt->bindValue(':age', $age, PDO::PARAM_INT);
        $stmt->bindValue(':mail', $mail, PDO::PARAM_STR);
        $stmt->bindValue(':shop', $shop, PDO::PARAM_STR);
        $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $response = array("status" => "success");
        } else {
            $response = array("status" => "error", "message" => "Failed to update profile.");
        }

        echo json_encode($response);
    } else {
        $response = array("status" => "error", "message" => "Invalid request method.");
        echo json_encode($response);
    }
?>
