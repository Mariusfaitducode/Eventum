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

/*
    Cette requete permet de récupérer toutes les personnes avec qui l'utilisateur a une discussion
    
    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur

    Retourne un objet JSON contenant les id des personnes avec qui l'utilisateur a une discussion
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_utilisateur'])) {

        $id_user = $_GET['id_utilisateur'];
        $sql = "SELECT 
                    DISTINCT id_utilisateur_envoyeur as id_utilisateur, 
                    uti.nom,
                    uti.prenom,
                    uti.pseudo,
                    uti.email,
                    uti.password,
                    uti.photo_profil,
                    uti.is_darkmode,
                    uti.role                    
                FROM 
                    message_prive as mp INNER JOIN utilisateur as uti ON mp.id_utilisateur_envoyeur = uti.id_utilisateur
                WHERE
                    id_utilisateur_destinataire = '$id_user'
                UNION
                SELECT 
                    DISTINCT id_utilisateur_destinataire as id_utilisateur,
                    uti.nom,
                    uti.prenom,
                    uti.pseudo,
                    uti.email,
                    uti.password,
                    uti.photo_profil,
                    uti.is_darkmode,
                    uti.role        
                FROM 
                    message_prive as mp INNER JOIN utilisateur as uti ON mp.id_utilisateur_destinataire = uti.id_utilisateur
                WHERE
                    id_utilisateur_envoyeur = '$id_user'";

        $result=mysqli_query($mysqli,$sql);

        while($row = $result->fetch_array()){
        
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

        echo json_encode($data);
    }
}

?>