<?php
// Start the session
session_start();

// Required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Include database and table objects
include_once '../config/database.php';

// Validate type of user
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "4" )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Load PUT variables
$payload = json_decode(file_get_contents('php://input'));

if (empty($payload->examID)) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Process SQL
$stmt = $pdo->prepare('UPDATE exams
                       SET current = CASE examID
                                     WHEN ? THEN 1
                                     ELSE 0
                                     END
                       WHERE 1 = 1');

$success = $stmt->execute([$payload->examID]);

if ($success) {
    http_response_code(200);
    echo '{"message" : Exam \'' . $payload->examID . '\' is now the current exam.}';
} else {
    http_response_code(200);
    echo '{"message" : "Exam not updated." }';
}