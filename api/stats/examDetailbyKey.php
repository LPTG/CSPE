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

if ( isset($_GET['key']) ) {
    $key = $_GET['key'];
} else {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}



// Retrieve all rows
$stmt = $pdo->prepare('select ec.examID, ec.questionID, q.stem
from examContent ec, questions q
where ec.questionID = q.questionID and ec.examID = ?');
$stmt->execute([$key]);
$data = $stmt->fetchAll(); 

if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(200);
    echo '{"message" : "No rows found" }';
}

?>