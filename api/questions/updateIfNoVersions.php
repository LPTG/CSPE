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
// User Types
// User Type 1. No Knowledge of user id entered
// User Type 2. Student - Not Taken Exam
// User Type 3. Student - Already Taken Exam
// User Type 4. Faculty - Admin rights
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "4" )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Determine if required fields have been set
$payload = json_decode(file_get_contents("php://input"));

if (empty($payload->questionID)) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Process SQL
$stmt = $pdo->prepare('SELECT COUNT(questionID) FROM questions WHERE parentQuestion = ?');
$stmt->execute([$payload->questionID]);
$data = $stmt->fetchColumn();

if ($data = 1) {
    $stmt = $pdo->prepare('UPDATE questions SET versioned = 0 WHERE questionID = ?');
    $stmt->execute([$payload->questionID]);
    $data = $stmt->rowCount();
}

if ($data) {
    http_response_code(200);
    echo '{"message" : "Updated question with ID ' . $payload->questionID . '"}';
} else {
    http_response_code(200);
    echo '{"message" : "Question not updated." }';
}