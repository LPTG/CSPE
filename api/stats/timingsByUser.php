<?php
// Start the session
session_start();

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
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

// Amount of minutes to take exam for each user (Could be different across exams)
// $data = $pdo->query('SELECT id, timestampdiff(MINUTE, examStartTime, examEndTime) AS ExamDuration FROM users WHERE examScore IS NOT NULL')->fetchAll();
$data = $pdo->query('SELECT id, timestampdiff(MINUTE, examStartTime, examEndTime) AS ExamDuration, examStartTime, examEndTime FROM users WHERE examScore IS NOT NULL')->fetchAll();
if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(200);
    echo '{"message" : "No rows found" }';
}

?>