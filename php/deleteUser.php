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
        $user_id = $_SESSION['user_id'] ?? null;

        if (!$user_id) {
            $response = array("status" => "error", "message" => "User not logged in.");
            echo json_encode($response);
            exit;
        }

        $sql = "DELETE FROM users WHERE id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            session_destroy();
            $response = array("status" => "success");
        } else {
            $response = array("status" => "error", "message" => "Failed to delete user.");
        }

        echo json_encode($response);
    } else {
        $response = array("status" => "error", "message" => "Invalid request method.");
        echo json_encode($response);
    }
?>
