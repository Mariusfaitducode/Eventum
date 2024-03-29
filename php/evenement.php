<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//Connexion database
include_once("database.php");

//Récupère données envoyés depuis angular surtout pour POST
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);


// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id'])) { // Récupère un évènement par son id

        $id_evenement = $_GET['id'];
        $sql = "SELECT * FROM evenement WHERE id_evenement = '$id_evenement'";

        $result=mysqli_query($mysqli,$sql);

        if (!$result) {
            echo json_encode(null);
            exit;
        }

        $row = $result->fetch_array();

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

        $data = [
                "id_evenement" => $row['id_evenement'],
                "id_createur" => $row['id_createur'],
                "titre" => $row['titre'],
                "id_categorie" => $row['id_categorie'],
                "description" => $row['description'],
                "image" => $row['image'],
                "date" => $row['date'],
                "heure" => $row['heure'],
                "lieu" => $row['lieu'],
                "is_public" => $row['is_public'],
                "max_participants" => $row['max_participant'],
                "is_disponible" => $row['is_disponible']
            ];

        echo json_encode($data);

    }else{

        // Renvoi tous les événements
        $sql = "SELECT * FROM evenement";
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
                "is_public" => $row['is_public'],
                "max_participants" => $row['max_participant'],
                "is_disponible" => $row['is_disponible']
            );

        }
        echo json_encode($data);
        }
    }


?>
