<?php
// Start the session
session_start();

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// include database and table objects
include_once '../config/database.php';

// Validate type of user
// User Types
// User Type 1. No Knowledge of user id entered
// User Type 2. Student - Not Taken Exam
// User Type 3. Student - Already Taken Exam
// User Type 4. Faculty - Admin rights
if ( isset($_SESSION["userType"]) && !($_SESSION["userType"] == "2" || $_SESSION["userType"] == "4") )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Determine if required fields have been set
$payload = json_decode(file_get_contents("php://input"));

if (empty($payload->id) || empty($payload->examID) || empty($payload->questionID) ) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Debugging Code to display content of PHP variable
// echo json_encode($payload); die();

// Process SQL
$stmt = $pdo->prepare('SELECT answered FROM results WHERE id = ? AND examID = ? AND questionID = ?');
$stmt->execute([$payload->id, $payload->examID, $payload->questionID]);
$data = $stmt->fetch(); 

// Send results back as JSON
if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(200);
    // "z" implies a NULL answer
    echo '{"answered" : "z" }';
}

?>
