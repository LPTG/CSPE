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

if (empty($payload->examID) || empty($payload->questions)) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Remove all old question to exam mappings before bulk inserting the new list
$stmt = $pdo->prepare('DELETE FROM examContent WHERE examID = ?');
$success = $stmt->execute([$payload->examID]);

if (!$success) {
    http_response_code(200);
    echo '{"message" : "Old questions could not be removed from exam." }';
    die();
}

// Process SQL
$stmt = $pdo->prepare('INSERT IGNORE INTO examContent (examID, questionID) VALUES (?, ?)');

foreach ($payload->questions as $questionID) {
    $success = $stmt->execute([$payload->examID, $questionID]);
    // This does not undo all the previous inserts... consider a transaction?
    if (!$success) {
        http_response_code(200);
        echo '{"message" : "Question could not be inserted into exam." }';
    }
}

if ($success) {
    http_response_code(200);
    echo '{"message" : Inserted questions into exam '. $payload->examID .'.}';
} else {
    http_response_code(200);
    echo '{"message" : "Question could not be inserted into exam." }';
}