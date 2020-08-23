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
  
  <div class="row">
    <div class="col ucf-colors"><img src="./images/pegasus.png" alt="Pegasus Logo">University of Central Florida</div>
  </div>
  
  <br>

  <h1>Developer Single Sign-On Simulation</h1>

  <form action="simlogin.php" method="post">
    <div class="form-group">
      <label for="ucfEmplid">ID: </label>
      <input type="text" name="ucfEmplid" class="form-control" required>
    </div>

    <div class="form-group">
      <label for="givenName">First Name: </label>
      <input type="text" name="givenName" class="form-control" required>
    </div>

    <div class="form-group">
      <label for="sn">Last Name: </label>
      <input type="text" name="sn" class="form-control" required>
    </div>

    <button type="submit" id="submit" value="Sign In" class="btn ucf-colors m-3">Sign-In</button>
   
  </form>

</div>

  <!-- jQuery, Popper, Bootstrap, Bootstrap-Table, Axios-->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>

  <!-- Base Site URL, PHP Variables to Javascript, Page Specific JS -->
  <script src="./js/baseURL.js"></script>

</body>
</html>