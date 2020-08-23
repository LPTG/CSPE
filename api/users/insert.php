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
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "4" )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Determine if required fields have been set
$payload = json_decode(file_get_contents("php://input"));
if (empty($payload->id) || empty($payload->firstName) || empty($payload->lastName) ) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Set all non null variables
$bind1 = $payload->id;
$bind2 = $payload->firstName;
$bind3 = $payload->lastName;

// Check each variable that could be null and set it accordingly
if (!empty($payload->examID))
    $bind4 = $payload->examID;
else
    $bind4 = null;

if (!empty($payload->examTimeLimit))
    $bind5 = $payload->examTimeLimit;
else
    $bind5 = null;

if (!empty($payload->isAdmin)) {
    $bind4 = null;   // Dont set examID for faculty
    $bind6 = $payload->isAdmin;
} else {
    $bind6 = 0;
}

// Process SQL
$stmt = $pdo->prepare('INSERT INTO users (id, firstName, lastName, examID, examTimeLimit, isAdmin) VALUES(?, ?, ?, ?, ?, ?)');
$stmt->execute([$bind1, $bind2, $bind3, $bind4, $bind5, $bind6]);
$data = $stmt->rowCount(); 

// Send results back as JSON
if ($data) {
    http_response_code(200);
    echo '{"message" : "Inserted user -  ' . $payload->id . '" }';
} else {
    http_response_code(200);
    echo '{"message" : "Unable to insert row" }';
}

?>
