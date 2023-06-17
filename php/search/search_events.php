

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
    Cette requete permet de récuperer tout les evenement proche d'une recherche

    Paramètres de la requete GET:
        - recherche : la recherche de l'utilisateur
        - type : le type de recherche
            - titre
            - lieu
            - date
            - categorie

    Soit on recherche le titre
    Soit on recherche le lieu
    Soit on recherche la date
    Soit on recherche la catégorie

    Cette requete retourne une liste JSON d'evenement
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['recherche']) && isset($_GET['type'])) {

        $recherche = $_GET['recherche'];
        $type = $_GET['type'];

        if ($type == 'titre') {

            $sql = "SELECT
                        *
                    FROM
                        evenement
                    WHERE
                        titre LIKE '%$recherche%'
                    AND
                        is_disponible = 1
                    ORDER BY
                        date ASC";

        } else if ($type == 'lieu') {

            $sql = "SELECT
                        *
                    FROM
                        evenement
                    WHERE
                        lieu LIKE '%$recherche%'
                    AND
                        is_disponible = 1
                    ORDER BY
                        date ASC";

        } else if ($type == 'date') {

            $sql = "SELECT
                        *
                    FROM
                        evenement ev
                    WHERE
                        ev.date LIKE '%$recherche%'
                    AND
                        ev.is_disponible = 1
                    ORDER BY
                        ev.date ASC";

        } else if ($type == 'categorie') {

            $sql = "SELECT
                        *
                    FROM
                        evenement ev INNER JOIN categorie cat
                            ON ev.id_categorie = cat.id_categorie
                    WHERE
                        cat.categorie LIKE '%$recherche%'
                    AND
                        ev.is_disponible = 1
                    ORDER BY
                        ev.date ASC";

        }


        $result=mysqli_query($mysqli,$sql);
        $data = array();





        while($row = $result->fetch_array()) {

//            if ($row['image'] == null) {
//
//                $cat = $row['id_categorie'];
//
//                $sql = "SELECT
//                            image_cat
//                        FROM
//                            categorie
//                        WHERE
//                            id_categorie = '$cat'";
//
//                $result_image=mysqli_query($mysqli,$sql);
//                $row_image = $result_image->fetch_array();
//
//                $row['image'] = $row_image['image_cat'];
//            }


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
                "max_participant" => $row['max_participant'],
                "is_disponible" => $row['is_disponible']
            );

        }
        echo json_encode($data);
    }
}

?>
