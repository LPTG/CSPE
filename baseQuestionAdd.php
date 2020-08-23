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
<html lang="en" id="top">

<head>
  <title>Add Questions Page</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.css">
  <link rel="stylesheet" href="./css/site.css">
</head>

<?php include_once 'header.php';?>

<body>
<div class="container-fluid col-8">

  <form action="javascript:void(0);" class="m-3" id="questionAddForm">
    <h2>Enter Question:</h2>
      <div class="form-group">
        <h4>Stem: <small class="text-muted" id="stemReq">Required</small></h4>
        <textarea class="stem" rows="10" cols="30" id="stem"></textarea>
      </div>

      <!-- <div class="form-group">
        <h4 class="d-inline">Figure:</h4>
        <input type="file" id="figure" accept="image/*">
      </div> -->

      <div class="form-group">
      <h4>Choice A: <small class="text-muted" id="aReq">Required</small></h4>
        <textarea class="choice" rows="1" cols="30" id="choiceA"></textarea>
      </div>

      <div class="form-group">
        <h4>Choice B: <small class="text-muted" id="bReq">Required</small></h4>
        <textarea class="choice" rows="1" cols="30" id="choiceB"></textarea>
      </div>

      <div class="form-group">
        <h4>Choice C:</h4>
        <textarea class="choice" rows="1" cols="30" id="choiceC"></textarea>
      </div>

      <div class="form-group">
        <h4>Choice D:</h4>
        <textarea class="choice" rows="1" cols="30" id="choiceD"></textarea>
      </div>

      <div class="form-group">
        <h4>Choice E:</h4>
        <textarea class="choice" rows="1" cols="30" id="choiceE"></textarea>
      </div>

      <div class="form-group">
        <h4 class="d-inline ">Answer: <small class="text-danger font-weight-bold d-none" id="validAns">Please choose a valid answer</small></h4>
        <select class="form-control form-control-lg mt-1" id="answer">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
        </select>
      </div>

      <input type="hidden" name="questionID" id="questionID"/>
      <input type="hidden" name="parentQuestion" id="parentQuestion"/>
      <input type="hidden" name="versioned" id="versioned"/>

      <div class="form-group">
        <h4 class="d-inline">Category:</h4>
        <select class="form-control form-control-lg mt-1" id="category"></select>
      </div>

      <button type="button" class="btn ucf-colors btn-lg" onclick="addQuestion()" id="addQuestionBtn">Add Question</button>
      <button type="button" class="btn ucf-colors btn-lg" onclick="updateQuestion()" id="updateQuestionBtn">Update Question</button>
      <button type="button" class="btn ucf-colors btn-lg" onclick="versionQuestion()" id="addVersionBtn">Add Version</button>
    </form>
</div>

<!-- jQuery, Popper, Bootstrap, Bootstrap-Table, Axios-->
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script src="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.2/tinymce.min.js"></script>

<!-- Local JS -->
<script src="./js/baseURL.js"></script>
<script type="text/javascript">var userID = "<?php echo $_SESSION['userID']; ?>";</script>

<?php
  // Check if we have required fields
  if (isset($_POST['stem']) && isset($_POST['choiceA']) && isset($_POST['choiceB']) && isset($_POST['answer'])) {
    // Set all post variables
    $questionID = $_POST['questionID'];
    $parentQuestion = $_POST['parentQuestion'];
    $stem = $_POST['stem'];
    if (isset($_POST['figure']))
      $figure = $_POST['figure'];
    else
      $figure = 'null';
    
    $choiceA = $_POST['choiceA'];
    $choiceB = $_POST['choiceB'];

    if (isset($_POST['choiceC'])){
      $choiceC = $_POST['choiceC'];
    } else {
      $choiceC = 'null';
    }

    if (isset($_POST['choiceD'])){
      $choiceD = $_POST['choiceD'];
    } else {
      $choiceD = 'null';
    }

    if (isset($_POST['choiceE'])){
      $choiceE = $_POST['choiceE'];
    } else {
      $choiceE = 'null';
    }

    $answer = $_POST['answer'];
    $category = $_POST['category'];
    $versioned = $_POST['versioned'];
    $edit = $_POST['edit'];

    echo "<script src='./js/baseQuestionAdd.js'></script>
          <script type='text/javascript'>";

    $question = json_encode(array($questionID, $parentQuestion, $stem, $figure, $choiceA, $choiceB, $choiceC,
                      $choiceD, $choiceE, $answer, $category, $versioned));

    echo "setFields(".$question.", ".$edit.");
          </script>";
  } else {
    echo '<script src="./js/baseQuestionAdd.js" defer></script>';
  }
?>

</body>
</html>
