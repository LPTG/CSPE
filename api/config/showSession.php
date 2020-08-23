<?php
  session_start();
  // echo '<pre>';
  // var_dump(array_merge($_SESSION,$_SERVER));
  // echo '</pre>';

  echo json_encode($_SESSION);
?>