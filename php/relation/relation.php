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


// Requete GET
if(isset($postdata) && empty($postdata))
{
    if (isset($_GET['id_suiveur']) && isset($_GET['id_suivie'])) {

        $id_1 = $_GET['id_suiveur'];
        $id_2 = $_GET['id_suivie'];
        $sql = "SELECT * FROM relation WHERE id_suiveur = '$id_1' AND id_suivie = '$id_2'";

        $result=mysqli_query($mysqli,$sql);

        
        $row = $result->fetch_array();

        if ($row){
            $data = [               
                "id_1" => $row['id_suiveur'],
                "id_2" => $row['id_suivie'],
                "statut" => $row['statut']
            ];
        }
            
            
        
        else{
            $data = [];
        }
        echo json_encode($data);

    } 
}