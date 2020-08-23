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
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "2" )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

// Determine if required fields have been set
$payload = json_decode(file_get_contents("php://input"));

if (empty($payload->id) ) {
    http_response_code(400);
    echo '{"message" : "Missing required data" }';
    die();
}

// Update last activity time to refresh timeout counter
// Keeps session active each time user presses next or previous buttons
//   and answer is recorded here
$_SESSION['LAST_ACTIVITY'] = time();

// Debugging Code to display content of PHP variable
// echo json_encode($payload); die();

// If student did not provide an answer, the value 'z' was transmitted in post body
// The answer cannot be NULL because getScore.php does averages to compute grade
// Any aggregate function avg() or count() will result in total null if any term being
// aggregated is null, therefore an answer must exist 

// Process SQL
$stmt = $pdo->prepare('SELECT * FROM timelog WHERE id = ?');
$stmt->execute([$payload->id]);
$data = $stmt->fetchAll();

// Send results back as JSON
if ($data) {
    http_response_code(200);
    // echo json_encode($data); die();
    $max = count($data);
    $i = 1; // Start at second row of results since body references $i-1
    for($i; $i < $max; $i++) {
        $user = $data[$i]["id"];
        $examID = $data[$i]["examID"];
        $questionID = $data[$i]["questionID"];
        $seconds = strtotime($data[$i]["actionTime"])-strtotime($data[$i-1]["actionTime"]);
        if ($data[$i-1]["actionWord"] == "timeout") {
            $seconds = 0;
        }
        // echo $user . " " . $examID . " " . $questionID . " " . $seconds;
        $stmt2 = $pdo->prepare('UPDATE results SET seconds = seconds + ? WHERE id = ? AND examID = ? AND questionID = ?');
        $stmt2->execute([$seconds, $user, $examID, $questionID]);
        $data2 = $stmt2->rowCount(); 
    } 
    http_response_code(200);
    echo '{"message" : "Set values for seconds for all rows" }';
} else {
    http_response_code(200);
    echo '{"message" : "Unable to continue" }';
}

?>
