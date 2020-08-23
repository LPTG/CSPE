<?php
// Start the session
session_start();

// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and table objects
include_once '../config/database.php';

// Validate type of user
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] == "" )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Retrieve student inProgress or Abort
$data = $pdo->query('SELECT COUNT(*) AS total FROM users WHERE  isadmin = 0 AND examEndTime IS NULL AND examDate IS NOT NULL')->fetchAll();

if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(204);
    echo '{"message" : "No rows found" }';
}

?>