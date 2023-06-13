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
    // Retourne toutes les catégories
    $sql = "SELECT * FROM categorie";
    $result=mysqli_query($mysqli,$sql);
    while( $row = $result->fetch_array())
    {
        $data[]=array(        
        "id_categorie" => $row['id_categorie'],
        "categorie" => $row['categorie'],
       );
    }
    echo json_encode($data);
}
