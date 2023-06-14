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
    Cette requete permet de récupérer les evenements qui pourraient intéresser l'utilisateur
    
    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur

    Retourne un objet JSON contenant 10 événements qui pourraient intéresser l'utilisateur (ou moins si pas 
    assez d'événements)
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur'])) {

        $id_user = $_GET['id_utilisateur'];

        /* 
            on récupère tout les événements qui : 
                -> dont la catégorie est dans le top 3 des catégories de l'utilisateur
                -> où l'utilisateur n'est pas inscrit

            on trie ces événements par nombre de personnnes suivies qui y sont inscrites
            on trie ces événements par date de la plus proche à la plus lointaine
        */

        // la limite dans les sous requetes n'étant pas possible, on commence par trouver les 3 
        // catégories préférées de l'utilisateur

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
        
        // permet de stocker les id des 3 catégories préférées de l'utilisateur
        $pref = array();

        while ($row = $result->fetch_array()) {
            $pref[] = $row['id_categorie'];
        }

        // on transforme le tableau en string pour la requete suivante
        $pref = implode("','",$pref);

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
                    evenement as ev INNER JOIN categorie as cat ON ev.id_categorie = cat.id_categorie
                WHERE
                    cat.id_categorie IN ('$pref')
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
                ) DESC,
                ev.date ASC,
                ev.heure ASC
                LIMIT 10";

        $result=mysqli_query($mysqli,$sql);
        $data = array();

        // on récupère les id des événements récupérés
        // cela permettra de ne pas les récupérer une seconde fois
        $id_events = array();

        while ($row = $result->fetch_array()) {

            $id_events[] = $row['id_evenement'];

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

        // on transforme le tableau en string pour la requete suivante
        $id_events = implode("','",$id_events);
        
        // on compte le nombre d'événements récupérés
        $number_of_events = count($data);

        // si on a moins de 10 événements, on complète
        if ($number_of_events < 10) {

            $number_of_events_to_get = 10 - $number_of_events;

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
                        '$id_user' NOT IN (
                            SELECT 
                                id_utilisateur
                            FROM
                                inscription_evenement
                            WHERE
                                id_evenement = ev.id_evenement
                        )
                    AND 
                        ev.id_evenement NOT IN ('$id_events')
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
                        ) DESC
                    LIMIT $number_of_events_to_get";
                    
            $result=mysqli_query($mysqli,$sql);

            while($row = $result->fetch_array()) {

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
        }
                 
        echo json_encode($data);
    }
}

?>