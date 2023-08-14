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
if (isset($postdata) && empty($postdata)) {
  if (!empty($_GET['id_sender']) && !empty($_GET['id_receiver'])) {

      // Sécurisation des données saisies
      $id_sender = SecurizeString_ForSQL($_GET['id_sender']);
      $id_receiver = SecurizeString_ForSQL($_GET['id_receiver']);

      if (!empty($_GET['message'])) {
          $message = $_GET['message'];
      } else {
          $message = "";
      }

      if (!empty($_GET['id_event'])) {
          $id_event = SecurizeString_ForSQL($_GET['id_event']);
      } else {
          $id_event = null;
      }

      // Préparation de la première requête SQL pour insérer le message
      $sql_insert_message = "INSERT INTO message_prive (id_utilisateur_envoyeur, id_utilisateur_destinataire, date_envoi, contenu, vue, id_evenement) VALUES (?, ?, CURRENT_TIMESTAMP, ?, 0, ?)";
      $stmt_insert_message = mysqli_prepare($mysqli, $sql_insert_message);
      mysqli_stmt_bind_param($stmt_insert_message, "iisi", $id_sender, $id_receiver, $message, $id_event);
      $result_insert_message = mysqli_stmt_execute($stmt_insert_message);

      if ($result_insert_message) {
          // Récupération de l'id du message
          $sql_get_message_id = "SELECT id_message FROM message_prive WHERE id_utilisateur_envoyeur = ? ORDER BY date_envoi DESC LIMIT 1";
          $stmt_get_message_id = mysqli_prepare($mysqli, $sql_get_message_id);
          mysqli_stmt_bind_param($stmt_get_message_id, "i", $id_sender);
          mysqli_stmt_execute($stmt_get_message_id);
          $result_get_message_id = mysqli_stmt_get_result($stmt_get_message_id);
          $row = mysqli_fetch_assoc($result_get_message_id);
          $id_message = $row["id_message"];

          // Insertion des données dans la base de données des notifications
          $sql_insert_notification = "INSERT INTO notifications (id_utilisateur, date_notif, vue, type_notif) VALUES (?, CURRENT_TIMESTAMP, 0, 'notif_mp')";
          $stmt_insert_notification = mysqli_prepare($mysqli, $sql_insert_notification);
          mysqli_stmt_bind_param($stmt_insert_notification, "i", $id_receiver);
          mysqli_stmt_execute($stmt_insert_notification);

          $id_notif = mysqli_insert_id($mysqli); // Récupération de l'id de la notification insérée

          // Liaison de la notification au message
          $sql_insert_notification_message = "INSERT INTO notification_message_prive (id_notif, id_message) VALUES (?, ?)";
          $stmt_insert_notification_message = mysqli_prepare($mysqli, $sql_insert_notification_message);
          mysqli_stmt_bind_param($stmt_insert_notification_message, "ii", $id_notif, $id_message);
          mysqli_stmt_execute($stmt_insert_notification_message);

          echo json_encode(true); // Enregistrement réussi

      } else {
          echo json_encode(false); // Erreur lors de l'enregistrement
      }

      // Fermeture des statements
      mysqli_stmt_close($stmt_insert_message);
      mysqli_stmt_close($stmt_get_message_id);
      mysqli_stmt_close($stmt_insert_notification);
      mysqli_stmt_close($stmt_insert_notification_message);

      // Arrêter l'exécution ultérieure
      exit();
  }
}

?>
