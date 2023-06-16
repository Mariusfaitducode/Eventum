<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//Connexion database
include_once("../database.php");
include_once("../utils.php");
//Récupère données envoyés depuis angular surtout pour POST
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

/*
    Cette requete permet de modifier les informations d'un utilisateur
    
    Paramètres de la requete GET:
        - id_utilisateur : l'id de l'utilisateur

    Retourne un objet JSON contenant des nombres specifant si la requete a bien été effectué ou les erreurs
*/


// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['token']) && isset($_GET['nom']) && isset($_GET['pseudo']) && isset($_GET['prenom']) && isset($_GET['password'])) {
            
            // sécurisation des données
            $token = SecurizeString_ForSQL($_GET['token']);
            $nom = SecurizeString_ForSQL($_GET['nom']);
            $prenom = SecurizeString_ForSQL($_GET['prenom']);
            $pseudo = SecurizeString_ForSQL($_GET['pseudo']);
            $mdp = SecurizeString_ForSQL($_GET['password']);

            // vérification du mdp

            $sql_mdp = "select * from utilisateur where token = '$token'";
            $result_mdp = mysqli_query($mysqli,$sql_mdp);
            $row_mdp = $result_mdp->fetch_array();

            if ( $row_mdp ){
                // On vérifie le mdp
                if (!password_verify($mdp, $row_mdp["password"])){

                    $data = array(
                        "success" => false,
                        "message" => "Mot de passe incorrect"
                    );
                    echo json_encode($data);
                    exit();
                }else{
                    $sql = "UPDATE utilisateur SET nom = '$nom', prenom = '$prenom', pseudo = '$pseudo' WHERE token = '$token'";
    
                    $result=mysqli_query($mysqli,$sql);
            
                    if($result)
                    {
                        $data = array(
                            "success" => true,
                            "message" => "Modification effectué"
                        );
                    }
                    else
                    {
                        $data = array(
                            "success" => false,
                            "message" => "Erreur lors de la modification"
                        );
                    }
                            
                    echo json_encode($data);
                }
        }
    }
}