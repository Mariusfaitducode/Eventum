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


// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_user'])) { // Récupère un évènement par son id

        $id_user = $_GET['id_user'];

        //Récupère les événements auxquels l'utilisateur est inscrit
        $sql = "SELECT 
                    ie.id_evenement 
                FROM 
                    inscription_evenement ie INNER JOIN evenement ev
                        ON ie.id_evenement = ev.id_evenement
                WHERE 
                    ie.id_utilisateur = '$id_user'
                AND 
                    ev.is_disponible=1
                AND
                    ev.id_utilisateur != '$id_user'";

        $result=mysqli_query($mysqli,$sql);

        while( $row = $result->fetch_array())
        {

            $id_evenement = $row['id_evenement'];

            //Récupère les événements auxquels l'utilisateur est inscrit et qui ont le mois et l'année demandés
            $sql_event = "SELECT * FROM evenement 
                            WHERE id_evenement = '$id_evenement'";

            $result_event=mysqli_query($mysqli,$sql_event);

            while( $row_event = $result_event->fetch_array())
            {

                if ($row_event['image'] == null) {

                    $cat = $row_event['id_categorie'];
                
                    $sql = "SELECT
                                image_cat
                            FROM    
                                categorie
                            WHERE
                                id_categorie = '$cat'";
              
                    $result_image=mysqli_query($mysqli,$sql);
                    $row_image = $result_image->fetch_array();
        
                    $row_event['image'] = $row_image['image_cat'];
                }

                $data[] = array(
                    "id_evenement" => $row_event['id_evenement'],
                    "id_createur" => $row_event['id_createur'],
                    "titre" => $row_event['titre'],
                    "id_categorie" => $row_event['id_categorie'],
                    "description" => $row_event['description'],
                    "image" => $row_event['image'],
                    "date" => $row_event['date'],
                    "heure" => $row_event['heure'],
                    "lieu" => $row_event['lieu'],
                    "is_public" => $row_event['is_public']
                );                    
            }                   
        }


        //Récupère les événements créés par l'utilisateur et qui ont le mois et l'année demandés
        $sql = "SELECT 
                    * 
                FROM 
                    evenement 
                WHERE 
                    id_createur = '$id_user'
                AND 
                    is_disponible=1";

        $result=mysqli_query($mysqli,$sql);

        while( $row = $result->fetch_array())
        {

            if ($row['image'] == null) {

                $cat = $row['id_categorie'];
                
                $sql = "SELECT
                            image_cat
                        FROM    
                            categorie
                        WHERE
                            id_categorie = '$cat'";
          
                $result_image=mysqli_query($mysqli,$sql);
                $row_image = $result_image->fetch_array();
    
                $row['image'] = $row_image['image_cat'];
            }

            $data[] = array(
                "id_evenement" => $row['id_evenement'],
                "id_createur" => $row['id_createur'],
                "titre" => $row['titre'],
                "id_categorie" => $row['id_categorie'],
                "description" => $row['description'],
                "image" => $row['image'],
                "date" => $row['date'],
                "heure" => $row['heure'],
                "lieu" => $row['lieu'],
                "is_public" => $row['is_public']
            );                    
        }

        echo json_encode($data);

    }
} 


?>