<?php
// Start the session
session_start();

// Validate type of user
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "4" )
{
    http_response_code(401);
    echo '{"message" : "Authorization required" }';
    die();
}

$output = shell_exec('mysql --defaults-extra-file=pass.txt -v < createStructure.sql');
echo "<pre> $output </pre>";

$output2 = shell_exec('mysql --defaults-extra-file=pass.txt -v < reloadData.sql');
echo "<pre> $output2 </pre>";

?>
