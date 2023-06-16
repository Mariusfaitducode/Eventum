<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$db_host = 'localhost';
$db_username = 'root';
$db_password = 'root';
$db_name = 'eventum';

try { // on essaie une connexion avec les paramètres XAMPP
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
} catch (Exception $e) {
  try { // si ça ne marche pas, on essaie une connexion avec les paramètres UWAMP
    $db_password = '';
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  } catch (Exception $e) {
    // pas de connexion possible
    die('Error : (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
  }
}


// $mysqli = new mysqli($db_host, $db_username, $db_password,$db_name);
// if ($mysqli->connect_error) {
// die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
// }


?>
