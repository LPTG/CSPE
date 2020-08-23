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
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "2" )
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

// Process SQL
$stmt = $pdo->prepare('update users set examID = IF (examID IS NULL, (SELECT examID FROM exams WHERE current = TRUE), examID), examdate = IF (examDate IS NULL, CURDATE(), examDate), examStartTime = IF (examStartTime IS NULL, NOW(), examStartTime) where id = ?');
$stmt->execute([$payload->id]);
$data = $stmt->rowCount(); 

// Send results back as JSON
if ($data) {
    $stmt2 = $pdo->prepare('SELECT examID FROM users WHERE id = ?');
    $stmt2->execute([$payload->id]);
    $data2 = $stmt2->fetch(); 

    if ($data2) {
        $_SESSION["examID"] = $data2["examID"];
        http_response_code(200);
        echo json_encode($data2);
    }

    // echo '{"message" : "Updated ' . $data . ' row" }';
} else {
    http_response_code(200);
    echo '{"message" : "No rows updated" }';
}

?>
