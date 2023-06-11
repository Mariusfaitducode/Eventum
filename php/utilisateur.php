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
    if (isset($_GET['id'])) {

        $id_utilisateur = $_GET['id'];
        $sql = "SELECT * FROM utilisateur WHERE id_utilisateur = '$id_utilisateur'";

        $result=mysqli_query($mysqli,$sql);
        $row = $result->fetch_array();

        $data=[        
            "id_utilisateur" => $row['id_utilisateur'],
            "nom" => $row['nom'],
            "prenom" => $row['prenom'],
            "pseudo" => $row['pseudo'],
            "email" => $row['email'],
            "password" => $row['password'],
            "photo_profil" => $row['photo_profil'],
            "is_darkmode" => $row['is_darkmode'],
            "role" => $row['role']];
        echo json_encode($data);

    } 
    else 
    {
        echo "test";
        $sql = "SELECT * FROM utilisateur";
        $result=mysqli_query($mysqli,$sql);
        while( $row = $result->fetch_array())
        {
            $data[]=array(        
            "id_utilisateur" => $row['id_utilisateur'],
            "nom" => $row['nom'],
            "prenom" => $row['prenom'],
            "pseudo" => $row['pseudo'],
            "email" => $row['email'],
            "password" => $row['password'],
            "photo_profil" => $row['photo_profil'],
            "is_darkmode" => $row['is_darkmode'],
            "role" => $row['role']);
        }
        echo json_encode($data);
    }   
}

?>