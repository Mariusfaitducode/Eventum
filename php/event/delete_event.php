

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
    Cette requete permet de supprimer un événement

    Paramètres de la requete GET:
        - id_evenement : l'id de l'événement

    Cette requete s'occupe de : 
        - ajouter l'utilisateur à la liste des inscrits à l'événement
        - envoyer une notification à l'utilisateur qui a créé l'événement
        - augmenter la preference de l'utilisateur pour la catégorie de l'événement

    Cette requete ne retourne rien
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur']) && isset($_GET['id_evenement'])) {

        $id_user = $_GET['id_utilisateur'];
        $id_event = $_GET['id_evenement'];

        // on ajoute l'utilisateur à la liste des inscrits à l'événement
        $sql = "INSERT INTO 
                    inscription_evenement(id_utilisateur, id_evenement)
                VALUES
                    ('$id_user', '$id_event')";

        $result=mysqli_query($mysqli,$sql);

        // on récupère l'id de l'utilisateur qui a créé l'événement
        $sql = "SELECT
                    id_createur
                FROM
                    evenement
                WHERE
                    id_evenement = '$id_event'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();
        $id_createur = $row['id_createur'];

        date_default_timezone_set('Europe/Paris');

        // on envoie une notification à l'utilisateur qui a créé l'événement
        $date = date("Y-m-d H:i:s");

        $sql = "INSERT INTO 
                    notifications(id_utilisateur, date_notif, vue, type_notif)
                VALUES
                    ('$id_createur', '$date', '0', 'notif_event_participant')";
                     
        $result=mysqli_query($mysqli,$sql);
                

        // on récupère l'id de la notification qu'on vient d'ajouter
        $sql = "SELECT
                    id_notif
                FROM
                    notifications
                WHERE
                    id_utilisateur = '$id_createur'
                AND
                    date_notif = '$date'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();
        $id_notif = $row['id_notif'];


        // on ajoute la notification à la table notification_new_participant
        $sql = "INSERT INTO 
                    notification_new_participant(id_notif, id_evenement)
                VALUES
                    ('$id_notif', '$id_event')";      
        
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

        // on vérifie si l'utilisateur a déjà une préférence pour cette catégorie
        $sql = "SELECT
                    id_utilisateur
                FROM
                    preferences
                WHERE
                    id_utilisateur = '$id_user'
                AND
                    id_categorie = '$id_categorie'";
        
        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();

        // si l'utilisateur n'a pas de préférence pour cette catégorie, on en crée une
        if($row == null){
            $sql = "INSERT INTO 
                        preferences(id_utilisateur, id_categorie, preference_value)
                    VALUES
                        ('$id_user', '$id_categorie', '0')";

            $result=mysqli_query($mysqli,$sql);
        }

        // on augmente la preference de l'utilisateur pour la catégorie de l'événement
        $sql = "UPDATE
                    preferences
                SET
                    preference_value = preference_value + 1
                WHERE
                    id_utilisateur = '$id_user'
                AND
                    id_categorie = '$id_categorie'";

        $result=mysqli_query($mysqli,$sql);

        echo json_encode(true);
    }
}

?>
