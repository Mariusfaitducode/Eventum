<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{

$pwd = trim($request->pwd);
$email = trim($request->email);


$sql = "SELECT * FROM utilisateur WHERE (utilisateur.email='$email' AND utilisateur.pwd='$pwd')";
$result=mysqli_query($mysqli,$sql);
$nums=mysqli_num_rows($result);

$sql2="SELECT * FROM vendeur WHERE vendeur.email='$email' AND vendeur.pwd='$pwd'";
$result2=mysqli_query($mysqli,$sql2);
$nums2=mysqli_num_rows($result2);


if($nums>0){
    $data=array('message'=>'success');
    echo json_encode($data);
    
}else{
    if($nums2>0){
        $data=array('message'=>'successvendor');
        echo json_encode($data);
    }else{
    $data=array('message'=>'failed');
    echo json_encode($data);
}

}
}
?>