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
    if (isset($_GET['nom']) && isset($_GET['prenom']) && isset($_GET['username']) && isset($_GET['email']) && isset($_GET['password'])) {
        
        // Sécurisation des données saisies
        $nom = SecurizeString_ForSQL($_GET['nom']);
        $prenom = SecurizeString_ForSQL($_GET['prenom']);
        $username = SecurizeString_ForSQL($_GET['username']);
        $email = SecurizeString_ForSQL($_GET['email']);
        $password = SecurizeString_ForSQL($_GET['password']);

        // Vérification si l'utilisateur existe déjà
        $sql = "SELECT * FROM utilisateur WHERE email = '$email'";
        $result = mysqli_query($mysqli, $sql);

        if ($result->num_rows > 0) {
            // Utilisateur existant
            $data = array('success' => false,
                          'message' => 'Cet email est déjà associé à un compte!');
            echo json_encode($data);
            exit();
        }

        $sql = "SELECT * FROM utilisateur WHERE pseudo = '$username'";
        $result = mysqli_query($mysqli, $sql);

        if ($result->num_rows > 0) {
            // Utilisateur existant
            $data = array('success' => false,
                          'message' => 'Ce pseudo est déjà utilisé par un autre utilisateur!');
            echo json_encode($data);
            exit();
        }

        // Hashage du mot de passe
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insertion des données dans la base de données
        $sql = "INSERT INTO utilisateur (nom, prenom, pseudo, email, `password`) VALUES ('$nom', '$prenom', '$username', '$email', '$hashed_password')";
        $result = mysqli_query($mysqli, $sql);

        if ($result) {
            // Enregistrement réussi
            $data = array('success' => true,
            'message' => '');
            echo json_encode($data);
        } else {
            // Erreur lors de l'enregistrement
            $data = array('success' => false,
            'message' => 'Utilisateur existant');
            echo json_encode($data);
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
