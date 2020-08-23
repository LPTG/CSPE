<?php
    // Start the session
    session_start();

    // PHP version of JS console.log, but named console_log
    function console_log($output, $with_script_tags = true) {
        $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
        if ($with_script_tags) {
            $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
    }
    
    // Clear any existing session variables
    unset($_SESSION["userID"]);
    unset($_SESSION["userType"]);
    unset($_SESSION['LAST_ACTIVITY']);
    unset($_SESSION['firstName']);
    unset($_SESSION['lastName']);
    unset($_SESSION['examID']);
    
    // Single Sign-on Data (Production)
    // $userid = $_SERVER["ucfEmplid"];
    // $firstname = $_SERVER["givenName"];
    // $lastname = $_SERVER["sn"];

    // Single Sign-on Data (Development)
    $userid = $_POST["ucfEmplid"];
    $firstname = $_POST["givenName"];
    $lastname = $_POST["sn"];

    // console_log("ucfEmplid: " . $userid . " givenName: " . $firstname . " sn: " . $lastname); die();

    // Convert Server variables to session variables
    $_SESSION["userID"] = $userid;
    $_SESSION['LAST_ACTIVITY'] = time();
    $_SESSION["firstName"] = $firstname;
    $_SESSION["lastName"] = $lastname;
   

    // include database and table objects
    include_once './api/config/database.php';

    // Determine status of ID from single sign-on
    // Process SQL
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$userid]);
    $data = $stmt->fetchAll(); 
    
    // User Types
    // User Type 1. No Knowledge of user id entered
    // User Type 2. Student - Not Taken Exam
    // User Type 3. Student - Already Taken Exam
    // User Type 4. Faculty - Admin rights

    // User Type 1. No Knowledge of user id entered
    if (!$data) {
        // Set up security and session timeout
        $_SESSION["userType"] = "1";

        // Redirect to information page.
        header("Location: unknownID.php");
        exit();
    }

    // User Type 2. Student - Not Taken Exam
    if (!$data[0]["examDate"]  && $data[0]["isAdmin"] == 0) {
        // Set up security and session timeout
        $_SESSION["userType"] = "2";
        
        // We have their ID loaded in users table
        // Update First and Last Name in user table
        // Redirect to Exam instructions with button to start exam
        header("Location: beforeExam.php");
        exit();
    }
    
    // User Type 3. Student - Already Taken Exam
    if ($data[0]["examDate"] && $data[0]["isAdmin"] == 0) {
        // Set up security and session timeout
        $_SESSION["userType"] = "3";

        // Redirect to information page.
        header("Location: examComplete.php");
        exit();
    }

    // User Type 4. Faculty - Admin rights 
    if ($data[0]["isAdmin"] == 1) {
        // Set up security and session timeout
        $_SESSION["userType"] = "4";

        // Redirect to Faculty Portal
        header("Location: admin.php");
    }
    
?>