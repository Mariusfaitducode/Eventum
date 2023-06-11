<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Inclure votre fichier database.php pour la connexion à la base de données
include_once 'database.php';

// Endpoint pour récupérer tous les utilisateurs
$app->get('/users', function ($request, $response) {
    // Connexion à la base de données
    $conn = connect(); // Utilisation de la fonction connect() définie dans votre fichier database.php

    // Requête SQL pour récupérer tous les utilisateurs
    $query = "SELECT * FROM utilisateur";
    $result = $conn->query($query);

    // Vérifier si des utilisateurs ont été trouvés
    if ($result->num_rows === 0) {
        return $response->withStatus(404)->write('Aucun utilisateur trouvé');
    }

    // Tableau pour stocker les utilisateurs
    $users = [];

    // Parcourir les résultats de la requête et ajouter chaque utilisateur au tableau
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Fermer la connexion à la base de données
    $conn->close();

    // Après avoir construit le tableau $users
    $response->getBody()->write(json_encode($users));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});

// Endpoint pour récupérer un utilisateur spécifique
$app->get('/users/{userId}', function ($request, $response, $args) {
    $userId = $args['userId'];

    // Connexion à la base de données
    $conn = connect(); // Utilisation de la fonction connect() définie dans votre fichier database.php

    // Requête SQL pour récupérer l'utilisateur spécifié
    $query = "SELECT * FROM utilisateur WHERE id = $userId";
    $result = $conn->query($query);

    // Vérifier si l'utilisateur a été trouvé
    if ($result->num_rows === 0) {
        return $response->withStatus(404)->write('Utilisateur non trouvé');
    }

    // Récupérer les données de l'utilisateur
    $user = $result->fetch_assoc();

    // Fermer la connexion à la base de données
    $conn->close();

    // Envoyer les données de l'utilisateur en réponse
    return $response->withJson($user);
});
