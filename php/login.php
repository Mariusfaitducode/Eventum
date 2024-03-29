<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//Connexion database
include_once("database.php");
include_once("utils.php");
include_once("./event/past_event.php");

//Récupère données envoyés depuis angular surtout pour POST
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

if(isset($postdata))
{

  past_events($mysqli);

    if (isset($_GET['password']) && isset($_GET['email']) && !empty($_GET['email']) && !empty($_GET['password'])) {

        // Sécuriser l'entrée des données
        $email = SecurizeString_ForSQL($_GET['email']);
        $password = SecurizeString_ForSQL($_GET['password']);

        // Requete pour récupérer le mdp de l'utilisateur dont l'email est celui donné par $email
        $sql = "SELECT * FROM utilisateur WHERE email = '$email'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();

        if ( $row ){

            // On vérifie le mdp
            if (password_verify($password, $row["password"])){
                // login correct

                //generate token and store it in the database
                $token = generateToken();

                $sql = "UPDATE utilisateur SET token = ('$token') WHERE id_utilisateur = '$row[id_utilisateur]'";
                $result = mysqli_query($mysqli, $sql);



                echo json_encode($token);

            }else{
                // Mauvais mdp
                echo json_encode(false);
            }
        }else{
            // Mauvais email
            echo json_encode(false);
        }



        // Stop further execution
        exit();
    }
}

echo json_encode(false);


// Fonction pour nettoyer l'entrée utilisateur pour des raisons de sécurité
//--------------------------------------------------------------------------------



?>
