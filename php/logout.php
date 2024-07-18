<?php
    session_start();
    session_destroy();
    $response = array("status" => "success", "message" => "Logged out successfully");
    echo json_encode($response);
?>
