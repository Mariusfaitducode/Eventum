

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
    Cette requete permet de suivre un utilisateur

    Paramètres de la requete GET:
        - id_suiveur : l'id de l'utilisateur actuel
        - id_suivie : l'id de l'utilisateur à suivre
        
    Cette requete s'occupe de : 
        - ajouter une relation entre les deux utilisateurs
        - faire une notification (notif_friend) à l'utilisateur suivi

    Cette requete ne retourne rien
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_suiveur']) && isset($_GET['id_suivie'])) {

        $id_suiveur = $_GET['id_suiveur'];
        $id_suivie = $_GET['id_suivie'];

        // on ajoute une relation entre les deux utilisateurs
        $sql = "INSERT INTO 
                    relation(id_suiveur, id_suivie, statut)
                VALUES
                    ('$id_suiveur', '$id_suivie', 'accepte')";

        $result=mysqli_query($mysqli,$sql);

        // on récupère l'id de la relation qu'on vient d'ajouter
        $sql = "SELECT
                    id_relation
                FROM
                    relation
                WHERE
                    id_suiveur = '$id_suiveur'
                AND
                    id_suivie = '$id_suivie'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();
        $id_relation = $row['id_relation'];

        // on envoie une notification à l'utilisateur suivi        
        date_default_timezone_set('Europe/Paris');
        $date = date("Y-m-d H:i:s");

        $sql = "INSERT INTO 
                    notifications(id_utilisateur, date_notif, vue, type_notif)
                VALUES
                    ('$id_suivie', '$date', '0', 'notif_friend')";

        $result=mysqli_query($mysqli,$sql);
                

        // on récupère l'id de la notification qu'on vient d'ajouter
        $sql = "SELECT
                    id_notif
                FROM
                    notifications
                WHERE
                    id_utilisateur = '$id_suivie'
                AND
                    date_notif = '$date'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();
        $id_notif = $row['id_notif'];


        // on ajoute la notification à la table notification_change_relation
        $sql = "INSERT INTO 
                    notification_change_relation(id_notif, id_relation)
                VALUES
                    ('$id_notif', '$id_relation')";

        $result=mysqli_query($mysqli,$sql);

        echo json_encode(true);
    }
}

?>
