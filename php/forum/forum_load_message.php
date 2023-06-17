<?php
global $mysqli;
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//Connexion database
include_once("../database.php");
include_once("../utils.php");

//Récupère données envoyés depuis angular surtout pour POST
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);


// Requete GET
if(isset($postdata) && empty($postdata))
{
  if (isset($_GET['id_evenement'])) {

    // Sécurisation des données saisies
    $id_evenement = SecurizeString_ForSQL($_GET['id_evenement']);

    $sql = "SELECT
                mpg.id_message,
                mpg.id_utilisateur_envoyeur,
                mpg.id_evenement,
                mpg.date_envoi,
                mpg.contenu
            FROM
                message_groupe mpg
            WHERE
                id_evenement = '$id_evenement'
            ORDER BY
                date_envoi ASC";

    $result = mysqli_query($mysqli, $sql);
    $data = array();
    while($row = $result->fetch_array()) {

      $data[] = array(

        "id_message" => $row['id_message'],
        "id_utilisateur_envoyeur" => $row['id_utilisateur_envoyeur'],
        "id_evenement" => $row['id_evenement'],
        "date_envoi" => $row['date_envoi'],
        "contenu" => $row['contenu']

      );

    }

    echo json_encode($data);

    exit();
  }
}

?>
