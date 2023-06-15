

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
        - supprimer l'événement
        - supprimer les inscriptions à l'événement
        - fait une notification (change_event) aux utilisateurs inscrits à l'événement        

    Cette requete ne retourne rien
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur']) && isset($_GET['id_evenement'])) {

        $id_event = $_GET['id_evenement'];

        // on récupère l'id des inscrits à l'événement
        $sql = "SELECT
                    id_utilisateur
                FROM
                    inscription_evenement
                WHERE
                    id_evenement = '$id_event'";
            
        $result=mysqli_query($mysqli,$sql);
        while ($row = $result->fetch_array()) {

            $id_inscrits[] = array(
                'id_utilisateur' => $row['id_utilisateur']
            );
        }

        // on envoie une notification à tous les inscrits à l'événement
        $date = date("Y-m-d H:i:s");

        for ($i = 0; $i < count($id_inscrits); $i++) {

            $id_user = $id_inscrits[$i]['id_utilisateur'];

            $sql = "INSERT INTO 
                        notifications(id_utilisateur, date_notif, vue, type_notif)
                    VALUES
                        ('$id_user', '$date', '0', 'notif_change_event')";
                            
            $result=mysqli_query($mysqli,$sql);

            // on récupère l'id de la notification qu'on vient d'ajouter
            $sql = "SELECT
                        id_notif
                    FROM
                        notifications
                    WHERE
                        id_utilisateur = '$id_user'
                    AND
                        date_notif = '$date'";

            $result=mysqli_query($mysqli,$sql);
            $row = $result->fetch_array();
            $id_notif = $row['id_notif'];

            // on ajoute la notification à la table notification_new_participant
            $sql = "INSERT INTO 
                        notification_change_evenement(id_notif, id_evenement)
                    VALUES
                        ('$id_notif', '$id_event')";      
            
            $result=mysqli_query($mysqli,$sql);

        }

        // on supprime l'événement
        $sql = "DELETE FROM 
                evenement
            WHERE
                id_evenement = '$id_event'";

        $result=mysqli_query($mysqli,$sql);


        // on supprime les inscriptions à l'événement
        $sql = "DELETE FROM 
                    inscription_evenement
                WHERE
                    id_evenement = '$id_event'";

        $result=mysqli_query($mysqli,$sql);


        echo json_encode(true);
    }
}

?>
