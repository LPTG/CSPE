<?php

// Reference Design: https://phpdelusions.net/pdo
// Database Configuration
$host = "localhost";
$database = "mark";
$user = "mark";
$password = "4FwRc2WSnz7H.";
$charset = 'utf8mb4';

// Development Settings
ini_set('display_errors', 1);

// Production Settings
// ini_set('display_errors', 0);
// ini_set('log_errors', 1);

// Data Source Name (DSN) for PDO connection
$dsn = "mysql:host=$host;dbname=$database;charset=$charset";

// PDO::ERRMODE_EXCEPTION: Throw exceptions.
// PDO::FETCH_ASSOC: returns an array indexed by column name as returned in your result set
// PDO::ATTR_EMULATE_PREPARES: to try to use native prepared statements (if FALSE)
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// The only try catch clause needed. PDO errors are automatically handled
try {
     $pdo = new PDO($dsn, $user, $password, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Convert errors into exceptions
set_error_handler(function ($level, $message, $file = '', $line = 0)
{
    throw new ErrorException($message, 0, $level, $file, $line);
});

// Report errors for development settings, otherwise give clean message if in production
set_exception_handler(function ($e)
{
    error_log($e);
    http_response_code(500);
    if (ini_get('display_errors')) {
        echo $e;
    } else {
        header("Content-Type: text/html; charset=UTF-8"); 
        echo "<h1>500 Internal Server Error</h1>
              An internal server error has been occurred.<br>
              Please try again later.";
    }
});

?>
