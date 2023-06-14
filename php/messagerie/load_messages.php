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
  if (!empty($_GET['id_sender']) && !empty($_GET['id_receiver'])) {

    // Sécurisation des données saisies
    $id_sender = SecurizeString_ForSQL($_GET['id_sender']);
    $id_receiver = SecurizeString_ForSQL($_GET['id_receiver']);

    $sql = "SELECT
                    mp.id_message,
                    mp.id_utilisateur_envoyeur,
                    mp.id_utilisateur_destinataire,
                    mp.date_envoi,
                    mp.contenu,
                    mp.image as image_mp,
                    mp.vue,
                    ev.id_evenement,
                    ev.id_createur,
                    ev.titre,
                    ev.id_categorie,
                    ev.description,
                    ev.image as image_ev,
                    ev.date,
                    ev.heure,
                    ev.lieu,
                    ev.is_public
                FROM
                    message_prive mp
                LEFT OUTER JOIN
                    evenement ev ON mp.id_evenement = ev.id_evenement
                WHERE
                    (id_utilisateur_envoyeur = '$id_sender' AND id_utilisateur_destinataire = '$id_receiver')
                OR
                    (id_utilisateur_envoyeur = '$id_receiver' AND id_utilisateur_destinataire = '$id_sender')
                ORDER BY
                    date_envoi ASC";
    $result = mysqli_query($mysqli, $sql);
    $data = array();
    while($row = $result->fetch_array()) {

      $data[] = array(
        "id_message" => $row['id_message'],
        "id_utilisateur_envoyeur" => $row['id_utilisateur_envoyeur'],
        "id_utilisateur_destinataire" => $row['id_utilisateur_destinataire'],
        "date_envoi" => $row['date_envoi'],
        "contenu" => $row['contenu'],
        "image_mp" => $row['image_mp'],
        "vue" => $row['vue'],
        "id_evenement" => $row['id_evenement'],
        "id_createur" => $row['id_createur'],
        "titre" => $row['titre'],
        "id_categorie" => $row['id_categorie'],
        "description" => $row['description'],
        "image_ev" => $row['image_ev'],
        "date" => $row['date'],
        "heure" => $row['heure'],
        "lieu" => $row['lieu'],
        "is_public" => $row['is_public']
      );

    }

    echo json_encode($data);

    // Arrêter l'exécution ultérieure
    exit();
  }
}

?>
