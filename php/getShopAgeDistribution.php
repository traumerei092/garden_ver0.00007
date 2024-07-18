<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Access-Control-Allow-Headers, Authorization");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }

    session_start();

    include 'functions.php';

    $pdo = connect_db();

    if (isset($_GET['shop_id'])) {
        $shop_id = $_GET['shop_id'];

        $sql = "SELECT age FROM users u
                JOIN shop_situation ss ON u.id = ss.user_id
                WHERE ss.shop_id = :shop_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':shop_id', $shop_id, PDO::PARAM_INT);
        $stmt->execute();
        $ages = $stmt->fetchAll(PDO::FETCH_COLUMN);

        $ageDistribution = [
            "10s" => 0,
            "20s" => 0,
            "30s" => 0,
            "40s" => 0,
            "50s" => 0,
            "60s" => 0
        ];

        foreach ($ages as $age) {
            if ($age >= 10 && $age < 20) {
                $ageDistribution["10s"]++;
            } elseif ($age >= 20 && $age < 30) {
                $ageDistribution["20s"]++;
            } elseif ($age >= 30 && $age < 40) {
                $ageDistribution["30s"]++;
            } elseif ($age >= 40 && $age < 50) {
                $ageDistribution["40s"]++;
            } elseif ($age >= 50 && $age < 60) {
                $ageDistribution["50s"]++;
            } elseif ($age >= 60) {
                $ageDistribution["60s"]++;
            }
        }

        echo json_encode($ageDistribution);
    } else {
        echo json_encode(["error" => "Shop ID not provided"]);
    }
?>
