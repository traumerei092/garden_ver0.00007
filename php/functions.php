<?php
    // DB接続関数
    function connect_db() {
        $dsn = 'mysql:host=localhost;dbname=gs_d15_10;charset=utf8';
        $user = 'root';
        $password = '';
        try {
            $dbh = new PDO($dsn, $user, $password);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbh;
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            exit;
        }
    }

    // shopsテーブルのショップ一覧を取得する関数
    function getShops($pdo) {
        $stmt = $pdo->prepare("SELECT id, shop_name FROM shops");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
?>
