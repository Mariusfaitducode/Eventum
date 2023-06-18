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

if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_evenement']) && isset($_GET['titre']) && isset($_GET['description']) && isset($_GET['date']) && isset($_GET['heure']) && isset($_GET['lieu']) && isset($_GET['id_categorie']) && isset($_GET['id_createur'])) {
        // Récupérer les valeurs des paramètres depuis la requête GET
        $id_evenement = securizeString_ForSQL($_GET['id_evenement']);
        $titre = securizeString_ForSQL($_GET['titre']);
        $description = securizeString_ForSQL($_GET['description']);
        $date = securizeString_ForSQL($_GET['date']);
        $heure = securizeString_ForSQL($_GET['heure']);
        $lieu = securizeString_ForSQL($_GET['lieu']);
        $max_participants = securizeString_ForSQL($_GET['max_participants']);
        $id_categorie = securizeString_ForSQL($_GET['id_categorie']);
        $id_createur = securizeString_ForSQL($_GET['id_createur']);

        // Requête SQL
        $sql = "UPDATE evenement SET titre = '$titre', description = '$description', date = '$date', heure = '$heure', lieu = '$lieu', id_categorie = '$id_categorie', id_createur = '$id_createur', max_participant = '$max_participants' WHERE id_evenement = '$id_evenement'";
        $result=mysqli_query($mysqli,$sql);


        //On envoie la notif à tous les participants

        $sql2 = "SELECT id_utilisateur FROM inscription_evenement WHERE id_evenement = '$id_evenement'";

        $result2=mysqli_query($mysqli,$sql2);

        date_default_timezone_set('Europe/Paris');
        $date = date("Y-m-d H:i:s");

        while($row = $result2->fetch_array()){
            $id_user = $row['id_utilisateur'];

            $sql3 = "INSERT INTO notifications(id_utilisateur, date_notif, vue, type_notif) VALUES ('$id_user', '$date', '0', 'notif_change_event')";

            $result3=mysqli_query($mysqli,$sql3);


            $id = $mysqli->insert_id;

            $sql4 = "INSERT INTO notification_change_evenement(id_notif, id_evenement) VALUES ('$id', '$id_evenement')";

            $result4=mysqli_query($mysqli,$sql4);

            
        }


        // return true ou false avec message d'erreur si erreur
        if (!$result) {
            echo json_encode(array(
                "success" => false,
                "message" => "Erreur lors de la modification de l'évènement"
            ));
            exit;
        }else{
            echo json_encode(array(
                "success" => true,
                "message" => "Evènement modifié avec succès"
            ));
        }
    }else{
        echo json_encode(array(
            "success" => false,
            "message" => " Champs manquants"
        ));
    }
}