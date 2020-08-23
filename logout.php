<?php
// Start the session
session_start();

// Clear any existing session variables
unset($_SESSION["userID"]);
unset($_SESSION["userType"]);
unset($_SESSION['LAST_ACTIVITY']);
unset($_SESSION['firstName']);
unset($_SESSION['lastName']);
unset($_SESSION['examID']);

session_unset();     // unset $_SESSION variable for the run-time 
$_SESSION = array(); // above does not always clear variables for current page
session_destroy();   // destroy session data in storage

header("Location: index.php");
?>