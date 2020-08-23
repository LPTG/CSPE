<?php
// Start the session
session_start();

// Check for Existing Session timeout (120 minutes)
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 7200)) {
    // last request was more than 2 hours ago
    echo '<h1>Your session has timed out. Please sign-in again</h1>';
    session_unset();     // unset $_SESSION variable for the run-time 
    $_SESSION = array(); // above does not always clear variables for current page
    session_destroy();   // destroy session data in storage
    die();
}

// Update last activity time to refresh timeout counter
$_SESSION['LAST_ACTIVITY'] = time();

// Validate type of user
// User Types
// User Type 1. No Knowledge of user id entered
// User Type 2. Student - Not Taken Exam
// User Type 3. Student - Already Taken Exam
// User Type 4. Faculty - Admin rights
if ( isset($_SESSION["userType"]) && $_SESSION["userType"] != "4" )
{
    http_response_code(401);
    echo '<h1>You are not authorized to view this page</h1>';
    die();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Computer Science Placement Exam</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="./css/site.css">
</head>

<body>
  <div class="container-fluid">

  <?php include_once 'header.php';?>
  
  <br>

  <form class="ml-2">
    <div class="form-group">
      <label for="examID">Select Exam (Only Exams without historical records can be changed): </label>
      <select id="examID" name="examID" class="form-control col-3" onchange="selectedExam()">
      <?php
        include_once './api/config/database.php';
        $data = $pdo->query('SELECT examID, examName, examGroup FROM exams WHERE examID NOT IN (SELECT DISTINCT examID from results)');
        while ($row = $data->fetch()) {
          echo '<option value="' . $row['examID'] . '">' .  $row['examID'] . ' - ' . $row['examName'] . ' : ' . $row['examGroup'] . '</option>' . "\n";  
        }
      ?>
      </select>
    </div>
  </form>
  
  <div id="alertArea" class="alert alert-success" style="display: none;"></div>

  <button onclick="updateQuestions()" id="done" class="ml-3 btn btn-warning">Update Content</button>

    <table
        id="table"
        data-toggle="table"
        data-url="./api/questions/read.php"
        data-pagination = "true"
        data-page-size = "5"
        data-search = "true"
        data-show-search-clear-button = "true"
        data-show-button-text = "true"
        data-click-to-select = "true"
        data-buttons-class = "ucf"
        data-checkbox-header = "false">
        <thead>
            <tr>                      
                <th data-checkbox="true" data-formatter="stateFormatter"></th>
                <th data-sortable="true" data-field="category">Category</th>
                <th data-field="stem">Stem</th>
            </tr>
        </thead>
    </table>

</div>

  <!-- jQuery, Popper, Bootstrap, Bootstrap-Table, Axios-->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>

  <!-- Base Site URL, PHP Variables to Javascript, Page Specific JS -->
  <script src="./js/baseURL.js"></script>
  <script type="text/javascript">var userID = "<?php echo $_SESSION['userID']; ?>";</script>
  <script src="./js/editExam.js"></script>
</body>
</html>