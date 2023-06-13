<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
include_once("database.php");

// Récupération des données envoyées depuis Angular (principalement pour la méthode POST)
$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

if(isset($postdata))
{
    if (isset($_GET['nom']) && isset($_GET['prenom']) && isset($_GET['pseudo']) && isset($_GET['email']) && isset($_GET['password']) && !empty($_GET['nom']) && !empty($_GET['prenom']) && !empty($_GET['pseudo']) && !empty($_GET['email']) && !empty($_GET['password'])) {
        
        // Sécurisation des données saisies
        $nom = SecurizeString_ForSQL($_GET['nom']);
        $prenom = SecurizeString_ForSQL($_GET['prenom']);
        $pseudo = SecurizeString_ForSQL($_GET['pseudo']);
        $email = SecurizeString_ForSQL($_GET['email']);
        $password = SecurizeString_ForSQL($_GET['password']);

        // Vérification si l'utilisateur existe déjà
        $sql = "SELECT * FROM utilisateur WHERE email = '$email'";
        $result = mysqli_query($mysqli, $sql);

        if ($result->num_rows > 0) {
            // Utilisateur existant
            echo json_encode(false);
            exit();
        }

        // Hashage du mot de passe
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insertion des données dans la base de données
        $sql = "INSERT INTO utilisateur (nom, prenom, pseudo, email, `password`) VALUES ('$nom', '$prenom', '$pseudo', '$email', '$hashed_password')";
        $result = mysqli_query($mysqli, $sql);

        if ($result) {
            // Enregistrement réussi
            echo json_encode(true);
        } else {
            // Erreur lors de l'enregistrement
            echo json_encode(false);
        }

        // Arrêter l'exécution ultérieure
        exit();
    }
}

echo json_encode(false);

// Fonction pour nettoyer l'entrée utilisateur pour des raisons de sécurité
//--------------------------------------------------------------------------------
function SecurizeString_ForSQL($string) {
    $string = trim($string);
    $string = stripcslashes($string);
    $string = addslashes($string);
    $string = htmlspecialchars($string);
    return $string;
}
