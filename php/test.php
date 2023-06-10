<?php

//enable cors
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include_once("database.php");
$sql = "SELECT MAX(ID) FROM article";
$ret=$mysqli->query($sql);
$return=$ret->fetch_assoc();
$id=$return['MAX(ID)'];
$id=$id+1;


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
	if (isset($_FILES['file']['name'])) {
		if (0 < $_FILES['file']['error']) {
			echo 'Error during file upload ' . $_FILES['file']['error'];
		} else {
			$upload_path = '../src/assets/';			//attention au chemin absolue TRES IMPORTANT !!!!!!!!!!!!!
			//if (file_exists($upload_path . $_FILES['file']['name'])) {
				//echo 'File already exists => ' . $upload_path . $_FILES['file']['name'];
			//} else {
				if (!file_exists($upload_path)) {
					mkdir($upload_path, 0777, true);
				}
                $temp = explode(".", $_FILES["file"]["name"]);
                $newfilename = $id. '.' . 'png'/*end($temp)*/;			//ça marche mais ce n'est pas propre

				move_uploaded_file($_FILES['file']['tmp_name'], $upload_path . $newfilename);
				echo 'File successfully uploaded => "' . $upload_path . $_FILES['file']['name'];
			//}
		}
	} else {
		echo 'Please choose a file';
	}
	echo nl2br("\n");
}