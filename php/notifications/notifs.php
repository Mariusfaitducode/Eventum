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
    Cette requete permet de récupérer les notifications d'un utilisateur

    Paramètres de la requete GET:
        - id_user : l'id de l'utilisateur

    Retourne un objet JSON contenant les notifications de l'utilisateur

    Une notification a un type parmis : 
        - notif_mp : message privé
        - notif_mpg : message groupe
        - notif_friend : demande d'ami
        - notif_event : changement d'un évènement
        - notif_event_participant : nouveau participant à un évènement

    Suivant le type de la notif il faudra appeler la bonne requete pour récupérer les données.
    Voici les données que l'on récupère pour chaque type de notif :
        - notif_mp : id_utilisateur_envoyeur
        - notif_mpg : id_evenement
        - notif_friend : id_suiveur
        - notif_event : id_evenement
        - notif_event_participant : id_evenement
        
*/


// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_user'])) {

        $id_user = $_GET['id_user'];
        $sql = "SELECT 
                    * 
                FROM 
                    notifications 
                WHERE 
                    id_utilisateur = '$id_user'
                ORDER BY
                    date_notif DESC";

        $result=mysqli_query($mysqli,$sql);

        while ( $row = $result->fetch_array()) {

            // correspond à la classe Notification
            $data[] = array(
                "id_notif" => $row['id_notif'],
                "id_utilisateur" => $row['id_utilisateur'],
                "date_notif" => $row['date_notif'],
                "type_notif" => $row['type_notif'],
                "vue" => $row['vue']
            );

        }
        echo json_encode($data);
    }
    // Si on veut marquer une notification comme vue
    else if (isset($_GET['id_notif'])){

        $id_notif = $_GET['id_notif'];
        
        $sql = "UPDATE notifications SET vue = 1 WHERE id_notif = '$id_notif'";

        $result=mysqli_query($mysqli,$sql);

        if ($result){
            echo json_encode(true);
        }
    }
    // Si on veut marquer comme vue toutes les notifications message
    else if (isset($_GET['id_message_user']) && isset($_GET['user'])){

        $id_user = $_GET['user'];
        $id_message_user = $_GET['id_message_user'];
        
        $sql = "UPDATE notifications n
                SET n.vue = 1
                WHERE n.id_notif IN (
                    SELECT nm.id_notif
                    FROM notification_message_prive nm
                    INNER JOIN message_prive m ON nm.id_message = m.id_message
                    WHERE (m.id_utilisateur_envoyeur = $id_message_user AND m.id_utilisateur_destinataire = $id_user)
               
        )";

        $result=mysqli_query($mysqli,$sql);

        if ($result){
            echo json_encode(true);
        }

    }
}

?>