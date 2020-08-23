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
$data = $pdo->query('select "0-9" as Bucket,count(*) as GradeCount from users
where examScore between 0 and .09
union (
select "10-19" as Bucket,count(*) as GradeCount from users 
where examScore between .10 and .19)
union (
select "20-29" as Bucket,count(*) as GradeCount from users
where examScore between .20 and .29)
union (
select "30-39" as Bucket,count(*) as GradeCount from users
where examScore between .30 and .39)
union (
select "40-49" as Bucket,count(*) as GradeCount from users
where examScore between .40 and .49)
union (
select "50-59" as Bucket,count(*) as GradeCount from users
where examScore between .50 and .59)
union (
select "60-69" as Bucket,count(*) as GradeCount from users
where examScore between .60 and .69)
union (
select "70-79" as Bucket,count(*) as GradeCount from users
where examScore between .70 and .79)
union (
select "80-89" as Bucket,count(*) as GradeCount from users
where examScore between .80 and .89)
union (   
select "90-100" as Bucket,count(*) as GradeCount from users
where examScore between .90 and 1)')->fetchAll();

if ($data) {
    http_response_code(200);
    echo json_encode($data);
} else {
    http_response_code(200);
    echo '{"message" : "No rows found" }';
}

?>
