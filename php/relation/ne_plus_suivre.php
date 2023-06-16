

<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//Connexion database
include_once("../database.php");

//Récupère données envoyés depuis angular surtout pour POST
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

/*
    Cette requete permet de ne plus suivre un utilisateur

    Paramètres de la requete GET:
        - id_suiveur : l'id de l'utilisateur actuel
        - id_suivie : l'id de l'utilisateur à suivre

    Cette requete s'occupe de :
        - faire une notification (notif_friend) à l'utilisateur suivi
        - supprimer la relation entre les deux utilisateurs

    Cette requete ne retourne rien
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_suiveur']) && isset($_GET['id_suivie'])) {

        $id_suiveur = $_GET['id_suiveur'];
        $id_suivie = $_GET['id_suivie'];

        // on passe la relation en statut "null"
        $sql = "UPDATE
                    relation
                SET
                    statut = NULL
                WHERE
                    id_suiveur = '$id_suiveur'
                AND
                    id_suivie = '$id_suivie'";

        $result=mysqli_query($mysqli,$sql);

        echo $result;

        echo json_encode(true);
    }
}

?>
