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

if(isset($postdata)){
    // Récupère les données envoyées
    
    if(isset($_GET["password"]) && isset($_GET["id_user"])){
        $password = SecurizeString_ForSQL($_GET["password"]);
        $id = SecurizeString_ForSQL($_GET["id_user"]);
        $sql = "SELECT password FROM utilisateur WHERE id_utilisateur = '$id'";
        $result = mysqli_query($mysqli, $sql);
        $row = $result->fetch_array();

        if(password_verify($password, $row["password"])){
            echo json_encode(true);
        }else{
            echo json_encode(false);
        }
        
    }
}