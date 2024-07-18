<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }

    session_start();

    // DB接続
    include('functions.php');
    $pdo = connect_db();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'];
        $password = $input['password'];

        // ユーザー情報の取得
        $sql = "SELECT id, password FROM users WHERE mail = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // 認証成功
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(["status" => "success", "user_id" => $user['id']]);
        } else {
            // 認証失敗
            echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
        }
    } else {
        $response = array("status" => "error", "message" => "Invalid request method.");
        echo json_encode($response);
    }
?>