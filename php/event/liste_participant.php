

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
    Cette requete permet de récupérer la liste des participants à un événement

    Paramètres de la requete GET:
        - id_evenement : l'id de l'événement

    Cette requete retourne un objet JSON contenant la liste des participants
*/

// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_evenement'])) {

        $id_event = $_GET['id_evenement'];

        // on récupère l'id des inscrits à l'événement
        $sql = "SELECT
                    uti.id_utilisateur,
                    uti.nom, 
                    uti.prenom,
                    uti.pseudo, 
                    uti.email,
                    uti.password,
                    uti.photo_profil,
                    uti.is_darkmode,
                    uti.role,
                    uti.token
                FROM
                    inscription_evenement ie INNER JOIN utilisateur uti 
                        ON ie.id_utilisateur = uti.id_utilisateur
                WHERE
                    id_evenement = '$id_event'";
            
        $result=mysqli_query($mysqli,$sql);
        while ($row = $result->fetch_array()) {

            $data[] = array(
                'id_utilisateur' => $row['id_utilisateur'],
                'nom' => $row['nom'],
                'prenom' => $row['prenom'],
                'pseudo' => $row['pseudo'],
                'email' => $row['email'],
                'password' => $row['password'],
                'photo_profil' => $row['photo_profil'],
                'is_darkmode' => $row['is_darkmode'],
                'role' => $row['role'],
                'token' => $row['token']
            );

        }
        
        echo json_encode($data);
    }
}

?>
