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
// Insérer un événement
    if (isset($_GET['titre'], $_GET['description'], $_GET['date'], $_GET['heure'], $_GET['lieu'], $_GET['is_public'], $_GET['id_categorie'], $_GET['id_createur'], $_GET['image'])) {
        $titre = $_GET['titre'];
        $description = $_GET['description'];
        $date = $_GET['date'];
        $heure = $_GET['heure'];
        $lieu = $_GET['lieu'];
        $is_public = $_GET['is_public'];
        $id_categorie = $_GET['id_categorie'];
        $id_createur = $_GET['id_createur'];
        $image = $_GET['image'];

        $sql = "INSERT INTO evenement (titre, `description`, `date`, heure, lieu, is_public, id_categorie, id_createur, `image`) VALUES ('$titre', '$description', '$date', '$heure', '$lieu', '$is_public', '$id_categorie', '$id_createur', '$image')";
        $result1 = mysqli_query($mysqli, $sql);

        // on retrouve l'id de l'événement qu'on vient d'insérer
        $sql = "SELECT 
                    id_evenement
                FROM
                    evenement
                WHERE
                    titre = '$titre'
                AND
                    'id_createur' = '$id_createur'
                AND
                    'date' = '$date'";

        $result = mysqli_query($mysqli, $sql);
        $row = $result->fetch_array();
        $id_evenement = $row['id_evenement'];

                  
        $sql ="INSERT INTO
                    inscription_evenement(id_utilisateur, id_evenement)
                VALUES
                    ('$id_createur', '$id_evenement')";
        

        $result = mysqli_query($mysqli, $sql);
        

        if ($result1) {
            // Enregistrement réussi
            echo json_encode(true);
        } else {
            // Erreur lors de l'enregistrement
            echo json_encode(false);
        }
    }else{
        echo json_encode(false);
    }
}