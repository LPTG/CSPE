<?php
// Start the session
session_start();

// Required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
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

if (empty($payload->stem) || empty($payload->choiceA) || empty($payload->choiceB) ||  
    empty($payload->answer)) {

    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Set all non null variables
$stem = $payload->stem;
$choiceA = $payload->choiceA;
$choiceB = $payload->choiceB;
$answer = $payload->answer;

// Check each variable that could be null and set it accordingly
if (!empty($payload->parentQuestion))
    $parentQuestion = $payload->parentQuestion;
else
    $parentQuestion = null;

if (!empty($payload->figure))
    $figure = $payload->figure;
else
    $figure = null;

if (!empty($payload->choiceC))
    $choiceC = $payload->choiceC;
else
    $choiceC = null;

if (!empty($payload->choiceD))
    $choiceD = $payload->choiceD;
else
    $choiceD = null;

if (!empty($payload->choiceE))
    $choiceE = $payload->choiceE;
else
    $choiceE = null;

if (!empty($payload->category))
    $category = $payload->category;
else
    $category = null;

if (!empty($payload->versioned))
    $versioned = $payload->versioned;
else
    $versioned = 0;

// Process SQL
$stmt = $pdo->prepare('INSERT INTO questions (parentQuestion, stem, figure, choiceA, choiceB, choiceC, 
                                              choiceD, choiceE, answer, category, versioned) VALUES (
                                              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$parentQuestion, $stem, $figure, $choiceA, $choiceB, $choiceC, $choiceD, $choiceE, $answer, $category, $versioned]);
$id = $pdo->lastInsertId();
$data = $stmt->rowCount(); 

if ($data) {
    if ($parentQuestion == null) {
        $stmt = $pdo->prepare('UPDATE questions SET parentQuestion = ? WHERE questionID = ?');
        $stmt->execute([$id, $id]);
        $data = $stmt->rowCount(); 

        if ($data) {
            http_response_code(200);
            echo '{"questionId" : ' . $id . '}';
        } else {
            http_response_code(200);
            echo '{"message" : "Unable to update parentQuestion." }';
        }
    }
    else {
        http_response_code(200);
        echo '{"questionId" : ' . $id . '}';
    }
} else {
    http_response_code(200);
    echo '{"message" : "Unable to insert question." }';
}