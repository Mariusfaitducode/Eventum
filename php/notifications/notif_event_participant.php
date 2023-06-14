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
    Cette requete permet de récupérer l'id de l'évènement où une nouvelle personne participe
    
    Paramètres de la requete GET:
        - id_notif : l'id de la notification

    Retourne un objet JSON contenant l'id de l'évènement
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_notif'])) {

        $id_notif = $_GET['id_notif'];
        $sql = "SELECT 
                    nnp.id_evenement
                FROM
                    notification_new_participant as nnp
                WHERE
                    nnp.id_notif = '$id_notif'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();

        $data = [               
                "id_evenement" => $row['id_evenement']
        ];
                  
        echo json_encode($data);
    }
}

?>