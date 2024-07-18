<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // OPTIONSリクエストの早期終了
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }

    include('functions.php');
    $pdo = connect_db();

    try {
        $shops = getShops($pdo);
        echo json_encode($shops);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
?>
