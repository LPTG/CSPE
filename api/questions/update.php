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

// PUT method, depends on all fields passed back in for update

// Edit to check if question has already been used in a past exam
// $stmt = $pdo->prepare('SELECT 1 FROM results WHERE examID = ? LIMIT 1');
// $stmt->execute([$payload->examID]);
// $exists = $stmt->fetch();

//print_r($exists);

// Process SQL
$stmt = $pdo->prepare('UPDATE questions SET parentQuestion = ?, stem = ?, figure = ?, 
    choiceA = ?, choiceB = ?, choiceC = ?, choiceD = ?, choiceE = ?,
    answer = ?, category = ?, versioned = ? WHERE questionID = ?');
$stmt->execute([$payload->parentQuestion, $payload->stem, $payload->figure, $payload->choiceA,
    $payload->choiceB, $payload->choiceC, $payload->choiceD, $payload->choiceE,
    $payload->answer, $payload->category, $payload->versioned, $payload->questionID]);
$data = $stmt->rowCount();

if ($data) {
    http_response_code(200);
    echo '{"message" : "Updated question with ID ' . $payload->questionID . '"}';
} else {
    http_response_code(200);
    echo '{"message" : "Question not updated." }';
}