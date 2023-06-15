<?php
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
    if (isset($_GET['id_user']) && isset($_GET['id_event'])) {

        $id_user = $_GET['id_user'];
        $id_event = $_GET['id_event'];

        $sql = "SELECT * FROM inscription_evenement WHERE id_utilisateur = '$id_user' AND id_evenement = '$id_event'";

        $result=mysqli_query($mysqli,$sql);

        if ($result->num_rows > 0) {
            // Enregistrement réussi
            echo json_encode(true);
        } else {
            // Erreur lors de l'enregistrement
            echo json_encode(false);
        }
    } 
}
?>