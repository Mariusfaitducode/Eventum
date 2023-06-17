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
      $message = SecurizeString_ForSQL($_GET['message']);
    }
    else {
      $message = "";
    }
    
    

    // Insertion des données dans la base de données des messages
    $sql = "INSERT INTO 
                message_groupe (id_utilisateur_envoyeur, id_evenement, date_envoi, contenu)
            VALUES 
                ('$id_sender', '$id_evenement', CURRENT_TIMESTAMP, '$message')";

    $result = mysqli_query($mysqli, $sql);

    
    // Récupération de l'id du message
    $sql = "SELECT
              id_message 
            FROM 
              message_groupe
            WHERE
              id_utilisateur_envoyeur = '$id_sender'
            ORDER BY
              date_envoi DESC
            LIMIT 1";
                    
    $result = mysqli_query($mysqli, $sql);
    $row = $result->fetch_array();
    $id_message = $row["id_message"];

    // Insertion des données dans la base de données des notifications
    $sql = "INSERT INTO notifications (id_utilisateur, date_notif, vue, type_notif) VALUE ('$id_receiver', CURRENT_TIMESTAMP, 0, 'notif_mpg')";
    $result = mysqli_query($mysqli, $sql);

    // Récupération de l'id de la notification
    $sql = "SELECT 
              id_notif 
            FROM
              notifications 
            WHERE
              id_utilisateur = '$id_receiver'
            ORDER BY 
              date_notif 
            DESC LIMIT 1";

    $result = mysqli_query($mysqli, $sql);
    $row = $result->fetch_array();
    $id_notif = $row["id_notif"];

    $sql = "INSERT INTO notification_message_groupe (id_notif, id_message) VALUE ('$id_notif', '$id_message')";
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
