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
  if (!empty($_GET['text'])) {

    // Sécurisation des données saisies
    $text = SecurizeString_ForSQL($_GET['text']);

    // Insertion des données dans la base de données des messages
    $sql = "SELECT
                id_utilisateur,
                nom,
                prenom,
                pseudo,
                email,
                password,
                photo_profil,
                is_darkmode,
                role
            FROM
                utilisateur
            WHERE
                nom LIKE '%$text%'
            OR
                prenom LIKE '%$text%'
            OR
                pseudo LIKE '%$text%'";
    $result = mysqli_query($mysqli, $sql);

    while( $row = $result->fetch_array())
    {
      $data[]=array(
        "id_utilisateur" => $row['id_utilisateur'],
        "nom" => $row['nom'],
        "prenom" => $row['prenom'],
        "pseudo" => $row['pseudo'],
        "email" => $row['email'],
        "password" => $row['password'],
        "photo_profil" => $row['photo_profil'],
        "is_darkmode" => $row['is_darkmode'],
        "role" => $row['role']);
    }
    echo json_encode($data);

    // Arrêter l'exécution ultérieure
    exit();
  }
}

?>
