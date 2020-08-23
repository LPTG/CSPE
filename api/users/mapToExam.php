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

$payload = json_decode(file_get_contents("php://input"));

if (empty($payload->examID) || empty($payload->students)) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Remove all old student to exam mappings before bulk inserting the new list
$stmt = $pdo->prepare('UPDATE users SET examID = NULL WHERE examID = ? AND examDate IS NULL AND isAdmin = 0');
$success = $stmt->execute([$payload->examID]);

if (!$success) {
    http_response_code(200);
    echo '{"message" : "Students could not be unassigned from previous exam." }';
    die();
}

// Process SQL
$stmt = $pdo->prepare('UPDATE users SET examID = ? WHERE id = ?');

foreach ($payload->students as $studentID) {
    $success = $stmt->execute([$payload->examID, $studentID]);

    if (!$success) {
        http_response_code(200);
        echo '{"message" : "Students\' exam could not assigned to exam." }';
    }
}

if ($success) {
    http_response_code(200);
    echo '{"message" : "Assigned students to exam '. $payload->examID .'."}';
} else {
    http_response_code(200);
    echo '{"message" : "Students could not be assigned to exam." }';
}