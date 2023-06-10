<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("database.php");
$postdata = file_get_contents("php://input");
echo $postdata;
$request = json_decode($postdata);

if(isset($postdata) && !empty($postdata))
{
    $keyword=trim($request->keyword);

    $sql = "SELECT * FROM utilisateur";
    $ret=$mysqli->query($sql);

    while( $row = $ret->fetch_array())
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

?>