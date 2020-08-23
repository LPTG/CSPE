<?php
// Start the session
session_start();

// required header
header("Access-Control-Allow-Origin: *");
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

// Retrieve all rows
$data = $pdo->query('SELECT id, firstName, lastName, uploadDate, examID, examTimeLimit,  
                     examStartTime, NOW() as currentServerTime, 
                     IF(TIMESTAMPDIFF(MINUTE,examStartTime,NOW()) > examTimeLimit,"Aborted","In-Progress") as status  
                     FROM users WHERE examDate IS NOT NULL AND id NOT IN (SELECT id FROM timelog WHERE actionWord = "finish")')->fetchAll();

if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(200);
    echo '{"message" : "No rows found" }';
}

?>
