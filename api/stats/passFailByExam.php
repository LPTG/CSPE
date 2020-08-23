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
$data = $pdo->query('select u.examID, e.examName,
count(*) as Total,
sum(case when u.examScore >= e.passFailPct then 1 else 0 end) as PassCount,
sum(case when u.examScore < e.passFailPct then 1 else 0 end) as FailCount,  
format(sum(case when u.examScore >= e.passFailPct then 1 else 0 end) / count(*) * 100,2) as PassPct,
format(sum(case when u.examScore < e.passFailPct then 1 else 0 end) / count(*) * 100,2) as FailPct
from users u, exams e
where u.examID = e.examID
group by u.examID, e.examName')->fetchAll();

if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(200);
    echo '{"message" : "No rows found" }';
}

?>
