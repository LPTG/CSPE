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


// Process SQL
$stmt = $pdo->prepare('UPDATE categories SET name = ? WHERE name = ?');
$stmt->execute([$payload->name, $payload->prevName]);
$data = $stmt->rowCount();

if ($data) {
    http_response_code(200);
    echo '{"message" : "Category ' . $payload->name . ' updated"}';
} else {
    http_response_code(200);
    echo '{"message" : "Question not updated." }';
}
?>
