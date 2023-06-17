

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
    Cette requete permet de récupérer les evenements qui pourraient intéresser l'utilisateur dans une catégorie

    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur
        - id_categorie : l'id de la catégorie

    Retourne un objet JSON contenant 10 événements qui pourraient intéresser l'utilisateur (ou moins si pas
    assez d'événements)
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur']) && isset($_GET['id_categorie'])) {

        $id_user = $_GET['id_utilisateur'];
        $id_categorie = $_GET['id_categorie'];

        $sql = "SELECT
                    ev.id_evenement,
                    ev.id_createur,
                    ev.titre,
                    ev.id_categorie,
                    ev.description,
                    ev.image,
                    ev.date,
                    ev.heure,
                    ev.lieu,
                    ev.is_public
                FROM
                    evenement as ev
                WHERE
                    ev.id_categorie = '$id_categorie'
                AND
                    '$id_user' NOT IN (
                        SELECT
                            id_utilisateur
                        FROM
                            inscription_evenement
                        WHERE
                            id_evenement = ev.id_evenement
                    )
                ORDER BY (
                    SELECT
                        COUNT(id_utilisateur)
                    FROM
                        inscription_evenement
                    WHERE
                        id_evenement = ev.id_evenement
                    AND
                        id_utilisateur IN (
                            SELECT
                                id_suivie
                            FROM
                                relation
                            WHERE
                                id_suiveur = '$id_user'
                            AND
                                statut = 'accepte'
                        )
                ) DESC";

        
        $result=mysqli_query($mysqli,$sql);
        while ($row = $result->fetch_array()) {


            if ($row['image'] == null) {
                
                $sql = "SELECT
                            image_cat
                        FROM    
                            categorie
                        WHERE
                            id_categorie = '$id_categorie'";
          
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
