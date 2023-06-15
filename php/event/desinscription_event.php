

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
    Cette requete permet de désinscrire un utilisateur à un événement

    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur
        - id_evenement : l'id de l'événement

    Cette requete s'occupe de : 
        - enlever l'utilisateur à la liste des inscrits à l'événement
        - baisser la preference de l'utilisateur pour la catégorie de l'événement

    Cette requete ne retourne rien
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur']) && isset($_GET['id_evenement'])) {

        $id_user = $_GET['id_utilisateur'];
        $id_event = $_GET['id_evenement'];


        // on enlève l'utilisateur à la liste des inscrits à l'événement
        $sql = "DELETE FROM 
                    inscription_evenement
                WHERE
                    id_utilisateur = '$id_user'
                AND
                    id_evenement = '$id_event'";

        $result=mysqli_query($mysqli,$sql);


        // on récupère l'id de la catégorie de l'événement
        $sql = "SELECT
                    id_categorie
                FROM
                    evenement
                WHERE
                    id_evenement = '$id_event'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();
        $id_categorie = $row['id_categorie'];


        // on baisse la preference de l'utilisateur pour la catégorie de l'événement
        $sql = "UPDATE
                    preferences
                SET
                    preference_value = preference_value - 1
                WHERE
                    id_utilisateur = '$id_user'
                AND
                    id_categorie = '$id_categorie'";

        $result=mysqli_query($mysqli,$sql);

        echo json_encode(true);
    }
}

?>
