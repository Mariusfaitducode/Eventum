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
  if (!empty($_GET['id_sender']) && !empty($_GET['id_evenement'])) {

    // Sécurisation des données saisies
    $id_sender = SecurizeString_ForSQL($_GET['id_sender']);
    $id_evenement = SecurizeString_ForSQL($_GET['id_evenement']);

    if (!empty($_GET['message'])){
      $message = $_GET['message'];
    }
    else {
      $message = "";
    }
    
  // Préparation de la requête SQL
    $sql = "INSERT INTO 
                message_groupe (id_utilisateur_envoyeur, id_evenement, date_envoi, contenu)
            VALUES 
                (?, ?, CURRENT_TIMESTAMP, ?)";

    // Utilisation d'une requête préparée
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "iis", $id_sender, $id_evenement, $message);

    // Exécution de la requête
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        // Enregistrement réussi
        echo json_encode(true);
    } else {
        // Erreur lors de l'enregistrement
        echo json_encode(false);
    }

    // Fermeture du statement
    mysqli_stmt_close($stmt);


    // Arrêter l'exécution ultérieure
    exit();
  }
}

?>
