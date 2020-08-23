<?php
// Start the session
session_start();

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
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
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "4" ) 
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Determine if required fields have been set
$payload = json_decode(file_get_contents("php://input"));

if (empty($payload->id)) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Debugging Code to display content of PHP variable
// echo json_encode($payload); die();

// Process SQL for cleaning Users table
$stmt = $pdo->prepare('UPDATE users SET examDate = NULL, examStartTime = NULL, examEndTime = NULL, examScore = NULL WHERE id = ?');
$stmt->execute([$payload->id]);
$data = $stmt->rowCount(); 

// Process SQL for results table
$stmt2 = $pdo->prepare('DELETE FROM results WHERE id = ?');
$stmt2->execute([$payload->id]);
$data2 = $stmt2->rowCount(); 

// Process SQL for timelog table
$stmt3 = $pdo->prepare('DELETE FROM timelog WHERE id = ?');
$stmt3->execute([$payload->id]);
$data3 = $stmt3->rowCount(); 

// Send results back as JSON
if ($data) {
    http_response_code(200);
    // echo '{"message" : "Deleted ' . $data . ' row" }';
    echo '{"message" : "Cleaned session" }';
} else {
    http_response_code(200);
    echo '{"message" : "No rows deleted" }';
}

?>
