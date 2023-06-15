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
    Cette requete permet de récupérer une liste de personnes qui pourraient intéresser l'utilisateur
    
    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur

    Retourne un objet JSON contenant une liste de entre 6 et 10 utilisateurs
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur'])) {

        $id_user = $_GET['id_utilisateur'];

        // renvoie les utilisateurs qui sont suivis par des utilisateurs que l'utilisateur suit
        $sql = "SELECT 
                    rel.id_suivie as id_utilisateur,
                    uti.nom,
                    uti.prenom,
                    uti.pseudo,   
                    uti.email,
                    uti.password,
                    uti.photo_profil,
                    uti.is_darkmode,
                    uti.role
                FROM
                    relation as rel INNER JOIN utilisateur as uti ON rel.id_suivie = uti.id_utilisateur
                WHERE
                    id_suiveur IN (
                        SELECT 
                            id_suivie
                        FROM
                            relation
                        WHERE
                            id_suiveur = '$id_user'
                        AND
                            statut = 'accepte'
                    )
                AND 
                    statut = 'accepte'
                AND 
                    id_suivie != '$id_user'
                AND
                    id_suivie NOT IN (
                        SELECT 
                            id_suivie
                        FROM
                            relation
                        WHERE
                            id_suiveur = '$id_user'
                        AND
                            statut = 'accepte'
                    )
                AND
                    id_suivie NOT IN (
                        SELECT 
                            id_suiveur
                        FROM
                            relation
                        WHERE
                            id_suivie = '$id_user'
                        AND
                            statut = 'accepte'
                    )
                GROUP BY
                    id_suivie
                ORDER BY
                    COUNT(id_suivie) DESC
                LIMIT 5";

        $result=mysqli_query($mysqli,$sql);

        while ($row = $result->fetch_array()) {

            $data[] = array(
                "id_utilisateur" => $row['id_utilisateur'],
                "nom" => $row['nom'],
                "prenom" => $row['prenom'],
                "pseudo" => $row['pseudo'],
                "email" => $row['email'],
                "password" => $row['password'],
                "photo_profil" => $row['photo_profil'],
                "is_darkmode" => $row['is_darkmode'],
                "role" => $row['role']
            );
        }


        // renvoie la liste des utilisateurs qui suivent l'utilisateur et qui ne sont pas suivis par l'utilisateur
        $sql = "SELECT
                    rel.id_suiveur as id_utilisateur,
                    uti.nom,
                    uti.prenom,
                    uti.pseudo,
                    uti.email,
                    uti.password,
                    uti.photo_profil,
                    uti.is_darkmode,
                    uti.role
                FROM
                    relation as rel INNER JOIN utilisateur as uti ON rel.id_suiveur = uti.id_utilisateur
                WHERE
                    id_suivie = '$id_user'
                AND
                    statut = 'accepte'
                AND
                    id_suiveur NOT IN (
                        SELECT 
                            id_suivie
                        FROM
                            relation
                        WHERE
                            id_suiveur = '$id_user'
                        AND
                            statut = 'accepte'
                    )
                LIMIT 5";
                    
        $result=mysqli_query($mysqli,$sql);

        while($row = $result->fetch_array()) {
                
                $data[] = array(
                    "id_utilisateur" => $row['id_utilisateur'],
                    "nom" => $row['nom'],
                    "prenom" => $row['prenom'],
                    "pseudo" => $row['pseudo'],
                    "email" => $row['email'],
                    "password" => $row['password'],
                    "photo_profil" => $row['photo_profil'],
                    "is_darkmode" => $row['is_darkmode'],
                    "role" => $row['role']
                );
        }

        // complète la liste avec des utilisateurs aléatoires
        $number_of_users = count($data);
        if ($number_of_users < 6) {
            $users_to_add = 6 - $number_of_users;
            $sql = "SELECT 
                        uti.id_utilisateur,
                        uti.nom,
                        uti.prenom,
                        uti.pseudo,
                        uti.email,
                        uti.password,
                        uti.photo_profil,
                        uti.is_darkmode,
                        uti.role
                    FROM 
                        utilisateur as uti
                    WHERE
                        id_utilisateur != '$id_user'
                    AND
                        id_utilisateur NOT IN (
                            SELECT 
                                id_suivie
                            FROM
                                relation
                            WHERE
                                id_suiveur = '$id_user'
                            AND
                                statut = 'accepte'
                        )
                    LIMIT $users_to_add";
            
            $result=mysqli_query($mysqli,$sql);
            while($row = $result->fetch_array()) {

                $data[] = array(
                    "id_utilisateur" => $row['id_utilisateur'],
                    "nom" => $row['nom'],
                    "prenom" => $row['prenom'],
                    "pseudo" => $row['pseudo'],
                    "email" => $row['email'],
                    "password" => $row['password'],
                    "photo_profil" => $row['photo_profil'],
                    "is_darkmode" => $row['is_darkmode'],
                    "role" => $row['role']
                );

            }

        }
                  
        echo json_encode($data);
    }
}

?>