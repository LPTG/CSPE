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
  <title>New Exam</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="./css/site.css">
</head>

<body>

  <div class="container-fluid">
    <?php include_once 'header.php';?>
    <br>
    <br>
    <h2 class="text-center">Create a New Exam</h2>
    <br>
    <br>
    <div class="container col-8">
    <form>
      <div class="form-group row">
        <label for="examName" class="col-sm-3 col-form-label">Exam name:</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="examName" placeholder="Incoming Freshman">
        </div>
      </div>
      <div class="form-group row">
        <label for="examGroup" class="col-sm-3 col-form-label">Exam Group:</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="examGroup" placeholder="2020-Summer">
        </div>
      </div>
      <div class="form-group row">
        <label for="rate" class="col-sm-3 col-form-label">Passing Grade:</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="rate" value="0.70">
        </div>
      </div>
      <div class="form-group row">
        <label for="author" class="col-sm-3 col-form-label">Author:</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="author" value="<?php echo $_SESSION['userID'];?>" readonly="readonly">
        </div>
      </div>
      <br>  
      <button type="submit" class="btn btn-ucf float-right">Create</button>
    </form>
    </div>

  </div>
  <!-- jQuery, Popper, Bootstrap, Bootstrap-Table, Axios-->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>  
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>

  <!-- Base Site URL, PHP Variables to Javascript, Page Specific JS -->
  <script src="./js/baseURL.js" defer></script>
  <script type="text/javascript">var userID = "<?php echo $_SESSION['userID']; ?>";</script>
  <script src="./js/examNew.js" defer></script>


</body>

</html>