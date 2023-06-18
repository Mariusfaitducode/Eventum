<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//Connexion database
include_once("database.php");
include_once("./utils.php");

//Récupère données envoyés depuis angular surtout pour POST
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);


// Requete GET
if(isset($postdata) && empty($postdata))
{
// Insérer un événement
    // Insérer un événement
if (isset($_GET['titre'], $_GET['description'], $_GET['date'], $_GET['heure'], $_GET['lieu'], $_GET['id_categorie'], $_GET['id_createur'], $_GET['max_participants'])) {
    $titre = SecurizeString_ForSQL($_GET['titre']);
    $description = SecurizeString_ForSQL($_GET['description']);
    $date = SecurizeString_ForSQL($_GET['date']);
    $heure = SecurizeString_ForSQL($_GET['heure']);
    $lieu = SecurizeString_ForSQL($_GET['lieu']);
    $id_categorie = SecurizeString_ForSQL($_GET['id_categorie']);
    $id_createur = SecurizeString_ForSQL($_GET['id_createur']);
    $max = SecurizeString_ForSQL($_GET['max_participants']);

    if('$max' == "" || '$max' == 0 || $_GET['max_participants'] == 'undefined'){
        $sql = "INSERT INTO evenement (titre, `description`, `date`, heure, lieu, id_categorie, id_createur, is_disponible) VALUES ('$titre', '$description', '$date', '$heure', '$lieu', '$id_categorie', '$id_createur', true)";
    }else{
        $sql = "INSERT INTO evenement (titre, `description`, `date`, heure, lieu, id_categorie, id_createur, max_participant, is_disponible) VALUES ('$titre', '$description', '$date', '$heure', '$lieu', '$id_categorie', '$id_createur', '$max', true)";
    }

      $result1 = mysqli_query($mysqli, $sql);

        // on retrouve l'id de l'événement qu'on vient d'insérer
        $sql = "SELECT 
                    id_evenement
                FROM
                    evenement
                WHERE
                    titre = '$titre'
                AND
                    id_createur = '$id_createur'
                AND
                    date = '$date'";

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
            $data = array(
                "success" => true,
                "id" => $id_evenement,
            );
            
            echo json_encode($row['id_evenement']);
        } else {
            $data = array(
                "success" => false,
                "message" => " Remplissez tous les champs"
            );
            // Erreur lors de l'enregistrement
            echo json_encode($data);
        }
    }else{
        $data = array(
            "success" => false,
            "message" => " Remplissez tous les champs"
        );
        echo json_encode($data);
    }
}