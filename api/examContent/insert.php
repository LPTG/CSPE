<?php
// Start the session
session_start();

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
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

$postData = json_decode(file_get_contents("php://input"));

if (empty($postData->examID) || empty($postData->questionID) ) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Process SQL
$stmt = $pdo->prepare('INSERT IGNORE INTO examContent (examID, questionID) VALUES (?, ?)');
$success = $stmt->execute([$postData->examID, $postData->questionID]);

if ($success) {
    http_response_code(200);
    echo '{"message" : Inserted question ' . $postData->questionID . " into exam " . $postData->examID . ".}";
} else {
    http_response_code(200);
    echo '{"message" : "Question could not be inserted into exam." }';
}