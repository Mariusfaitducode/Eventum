

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
    Cette requete permet de récupérer les catégories d'événements préférées de l'utilisateur

    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur

    Retourne un objet JSON contenant les id des 3 catégories préférées de l'utilisateur
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur'])) {

        $id_user = $_GET['id_utilisateur'];

        $sql = "SELECT
                    id_categorie
                FROM
                    preferences
                WHERE
                    id_utilisateur = '$id_user'
                ORDER BY
                    preference_value DESC
                LIMIT 3";


        $result=mysqli_query($mysqli,$sql);

        while ($row = $result->fetch_array()) {

            $id_cat = $row['id_categorie'];

            $sql3 = "SELECT
                        categorie
                    FROM
                        categorie
                    WHERE
                        id_categorie = '$id_cat'";

            $result3=mysqli_query($mysqli,$sql3);
            $row3 = $result3->fetch_array();

            $data[] = array(
                'id_categorie' => $row['id_categorie'],
                'nom_categorie' => $row3['categorie']
            );
        }

        if ($result->num_rows < 3) {

            $max = 3 - $result->num_rows;
            
            $sql2 = "SELECT
                        id_categorie, categorie
                    FROM
                        categorie
                    WHERE
                        id_categorie NOT IN (SELECT
                                                id_categorie
                                            FROM
                                                preferences
                                            WHERE
                                                id_utilisateur = '$id_user')
                    ORDER BY
                        RAND()
                    LIMIT $max";

            $result2=mysqli_query($mysqli,$sql2);

            while ($row = $result2->fetch_array()) {

                $data[] = array(
                    'id_categorie' => $row['id_categorie'],
                    'nom_categorie' => $row['categorie']
                );
            }
        }
        
        

        echo json_encode($data);
    }
}

?>
