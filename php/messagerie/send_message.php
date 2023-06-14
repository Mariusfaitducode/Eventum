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
  if (!empty($_GET['id_sender']) && !empty($_GET['id_receiver']) && !empty($_GET['message'])) {

    // Sécurisation des données saisies
    $id_sender = SecurizeString_ForSQL($_GET['id_sender']);
    $id_receiver = SecurizeString_ForSQL($_GET['id_receiver']);
    $message = SecurizeString_ForSQL($_GET['message']);

    // Insertion des données dans la base de données
    $sql = "INSERT INTO message_prive (id_utilisateur_envoyeur, id_utilisateur_destinataire, date_envoi, contenu, vue) VALUES ('$id_sender', '$id_receiver', CURRENT_TIMESTAMP, '$message', 0)";
    $result = mysqli_query($mysqli, $sql);

    if ($result) {
      // Enregistrement réussi
      echo json_encode(true);
    } else {
      // Erreur lors de l'enregistrement
      echo json_encode(false);
    }

    // Arrêter l'exécution ultérieure
    exit();
  }
}

?>