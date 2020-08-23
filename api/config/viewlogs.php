<?php

echo '<h1>access.log</h1>';
$file = file_get_contents('../../../../logs/access.log', FILE_USE_INCLUDE_PATH);
echo '<pre>';
echo $file;
echo '</pre>';

echo '<h1>error.log</h1>';
$file2 = file_get_contents('../../../../logs/error.log', FILE_USE_INCLUDE_PATH);
echo '<pre>';
echo $file2;
echo '</pre>';

echo '<h1>php_errors.log</h1>';
$file3 = file_get_contents('../../../../logs/php_errors.log', FILE_USE_INCLUDE_PATH);
echo '<pre>';
echo $file3;
echo '</pre>';

?>