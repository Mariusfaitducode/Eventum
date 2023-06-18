-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 18 juin 2023 à 19:13
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eventum`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `image_cat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `categorie`, `image_cat`) VALUES
(14, 'Fêtes', 'images/categorie/fete.jpg'),
(15, 'Soirée', 'images/categorie/soiree.jpg'),
(16, 'Concert', 'images/categorie/concert.jpg'),
(17, 'Cinéma', 'images/categorie/cinema.jpg'),
(18, 'Théâtre', 'images/categorie/theatre.jpg'),
(19, 'Musée', 'images/categorie/musee.jpeg'),
(20, 'Sport', 'images/categorie/sport.jpg'),
(21, 'Jeux de société', 'images/categorie/jeux.jpg'),
(22, 'Gaming', 'images/categorie/gaming.jpg'),
(23, 'Professionnel', 'images/categorie/professionnel.jpg'),
(24, 'Ballade', 'images/categorie/balade.jpg'),
(25, 'Autres', 'images/categorie/autre.jpg'),
(26, 'Repas', 'images/categorie/repas.jpeg'),
(27, 'Méga Soirée', 'images/categorie/mega_soiree.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

CREATE TABLE `evenement` (
  `id_evenement` int(11) NOT NULL,
  `id_createur` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `heure` time DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL,
  `max_participant` int(11) DEFAULT NULL,
  `is_disponible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `evenement`
--

INSERT INTO `evenement` (`id_evenement`, `id_createur`, `titre`, `id_categorie`, `description`, `image`, `date`, `heure`, `lieu`, `is_public`, `max_participant`, `is_disponible`) VALUES
(52, 15, 'Soutenance WE4B', 23, 'Venez à la soutenance avec nous !!', NULL, '2023-06-23', '10:00:00', 'UTBM', 0, 4, 1),
(53, 15, 'Soirée des finaux', 27, 'Venez à la plus grosse soirée de l\'année !!! Ça va être le feu je vous promets !!', NULL, '2023-06-23', '21:00:00', 'MDE', 0, 300, 1),
(54, 18, 'Petite marche', 24, 'On va aller faire un tour en forêt pour se vider la tête avant le final d\'IT45', NULL, '2023-06-24', '14:00:00', 'Belfort', 0, NULL, 1),
(55, 19, 'Soirée karaoké', 15, 'Venez à l\'ABC pour un karaoké tous ensemble', NULL, '2023-06-22', '20:30:00', 'Belfort', 0, 50, 1),
(56, 19, 'Marathon', 20, 'La ville de Belfort à l\'honneur d\'organiser son premier marathon !! Avis à tout les sportifs de la ville : n\'hésitez pas à nous rejoindre', NULL, '2023-07-02', '13:00:00', 'Belfort', 0, 150, 1),
(57, 19, 'Ouverture musée', 19, 'La ville de Belfort ouvre son musée, venez nombreux pour son inauguration', NULL, '2023-07-01', '15:00:00', 'Belfort', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `inscription_evenement`
--

CREATE TABLE `inscription_evenement` (
  `id_relation` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `inscription_evenement`
--

INSERT INTO `inscription_evenement` (`id_relation`, `id_utilisateur`, `id_evenement`) VALUES
(50, 15, 52),
(51, 17, 52),
(52, 15, 53),
(53, 17, 53),
(54, 18, 52),
(55, 18, 54),
(56, 16, 53),
(57, 19, 55),
(58, 19, 56),
(59, 19, 57),
(61, 19, 52);

-- --------------------------------------------------------

--
-- Structure de la table `message_groupe`
--

CREATE TABLE `message_groupe` (
  `id_message` int(11) NOT NULL,
  `id_utilisateur_envoyeur` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL,
  `date_envoi` datetime NOT NULL,
  `contenu` text NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message_groupe`
--

INSERT INTO `message_groupe` (`id_message`, `id_utilisateur_envoyeur`, `id_evenement`, `date_envoi`, `contenu`, `image`) VALUES
(14, 17, 52, '2023-06-18 16:40:12', 'Noooon c\'est déjà vendredi ???!!!', NULL),
(15, 15, 52, '2023-06-18 16:54:42', 'oui !! il va falloir se dépêcher...', NULL),
(16, 17, 52, '2023-06-18 16:55:21', 'rolala il nous reste quoi à faire ?', NULL),
(17, 15, 52, '2023-06-18 16:55:59', 'préparer la soutenance', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `message_prive`
--

CREATE TABLE `message_prive` (
  `id_message` int(11) NOT NULL,
  `id_utilisateur_envoyeur` int(11) NOT NULL,
  `id_utilisateur_destinataire` int(11) NOT NULL,
  `date_envoi` datetime NOT NULL,
  `contenu` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `vue` tinyint(1) DEFAULT NULL,
  `id_evenement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message_prive`
--

INSERT INTO `message_prive` (`id_message`, `id_utilisateur_envoyeur`, `id_utilisateur_destinataire`, `date_envoi`, `contenu`, `image`, `vue`, `id_evenement`) VALUES
(73, 17, 15, '2023-06-18 17:01:50', 'Hello comment tu vas ?', NULL, 0, NULL),
(74, 17, 15, '2023-06-18 17:02:00', 'Dit moi on passe quand le final de WEB ?', NULL, 0, NULL),
(75, 15, 17, '2023-06-18 17:02:19', 'Salut Salut', NULL, 0, NULL),
(76, 15, 17, '2023-06-18 17:02:29', 'On passe le vendredi matin', NULL, 0, NULL),
(77, 15, 17, '2023-06-18 17:02:45', 'regarde l\'événement c\'est marqué', NULL, 0, NULL),
(78, 17, 15, '2023-06-18 17:03:06', 'Super et t\'as quelque chose de prévu le soir ?', NULL, 0, NULL),
(79, 15, 17, '2023-06-18 17:03:17', 'euuh non pourquoi ?', NULL, 0, NULL),
(80, 15, 17, '2023-06-18 17:06:58', 'aaah si pardon c\'est la soirée des finaux !!', NULL, 0, NULL),
(81, 17, 15, '2023-06-18 17:07:13', 'la soirée des finaux ???', NULL, 0, NULL),
(82, 15, 17, '2023-06-18 17:07:23', '', NULL, 0, 53);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id_notif` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `date_notif` datetime NOT NULL,
  `vue` tinyint(1) DEFAULT NULL,
  `type_notif` enum('notif_mp','notif_mpg','notif_friend','notif_change_event','notif_event_participant') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id_notif`, `id_utilisateur`, `date_notif`, `vue`, `type_notif`) VALUES
(72, 15, '2023-06-18 16:39:52', 0, 'notif_event_participant'),
(73, 15, '2023-06-18 16:59:37', 0, 'notif_friend'),
(74, 17, '2023-06-18 16:59:50', 0, 'notif_friend'),
(75, 15, '2023-06-18 17:01:50', 0, 'notif_mp'),
(76, 15, '2023-06-18 17:02:00', 0, 'notif_mp'),
(77, 17, '2023-06-18 17:02:19', 0, 'notif_mp'),
(78, 17, '2023-06-18 17:02:30', 0, 'notif_mp'),
(79, 17, '2023-06-18 17:02:45', 0, 'notif_mp'),
(80, 15, '2023-06-18 17:03:06', 0, 'notif_mp'),
(81, 17, '2023-06-18 17:03:17', 0, 'notif_mp'),
(82, 17, '2023-06-18 17:06:59', 0, 'notif_mp'),
(83, 15, '2023-06-18 17:07:13', 0, 'notif_mp'),
(84, 17, '2023-06-18 17:07:23', 0, 'notif_mp'),
(85, 15, '2023-06-18 17:07:36', 0, 'notif_event_participant'),
(86, 15, '2023-06-18 17:11:09', 0, 'notif_event_participant'),
(87, 18, '2023-06-18 17:13:13', 0, 'notif_change_event'),
(88, 15, '2023-06-18 17:16:33', 0, 'notif_event_participant'),
(89, 19, '2023-06-18 17:21:38', 0, 'notif_change_event'),
(90, 19, '2023-06-18 17:29:59', 0, 'notif_change_event'),
(91, 19, '2023-06-18 17:30:09', 0, 'notif_change_event'),
(92, 19, '2023-06-18 17:30:12', 0, 'notif_change_event'),
(93, 19, '2023-06-18 17:30:17', 0, 'notif_change_event'),
(94, 19, '2023-06-18 17:30:24', 0, 'notif_change_event'),
(95, 19, '2023-06-18 18:11:26', 0, 'notif_change_event'),
(96, 19, '2023-06-18 18:12:17', 0, 'notif_change_event'),
(97, 19, '2023-06-18 18:13:03', 0, 'notif_change_event'),
(98, 19, '2023-06-18 18:13:30', 0, 'notif_change_event'),
(99, 19, '2023-06-18 18:13:39', 0, 'notif_change_event'),
(100, 19, '2023-06-18 18:15:18', 0, 'notif_change_event'),
(101, 15, '2023-06-18 18:22:43', 0, 'notif_event_participant'),
(102, 15, '2023-06-18 18:26:00', 0, 'notif_event_participant'),
(103, 18, '2023-06-18 18:27:04', 0, 'notif_event_participant'),
(104, 18, '2023-06-18 18:28:15', 0, 'notif_event_participant'),
(105, 18, '2023-06-18 18:28:18', 0, 'notif_event_participant');

-- --------------------------------------------------------

--
-- Structure de la table `notification_change_evenement`
--

CREATE TABLE `notification_change_evenement` (
  `id_notif` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notification_change_evenement`
--

INSERT INTO `notification_change_evenement` (`id_notif`, `id_evenement`) VALUES
(87, 54),
(89, 55),
(90, 57),
(91, 57),
(92, 57),
(93, 57),
(94, 57),
(95, 57),
(96, 57),
(97, 57),
(98, 57),
(99, 57),
(100, 57);

-- --------------------------------------------------------

--
-- Structure de la table `notification_change_relation`
--

CREATE TABLE `notification_change_relation` (
  `id_notif` int(11) NOT NULL,
  `id_relation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notification_change_relation`
--

INSERT INTO `notification_change_relation` (`id_notif`, `id_relation`) VALUES
(73, 27),
(74, 28);

-- --------------------------------------------------------

--
-- Structure de la table `notification_message_groupe`
--

CREATE TABLE `notification_message_groupe` (
  `id_notif` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notification_message_prive`
--

CREATE TABLE `notification_message_prive` (
  `id_notif` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notification_message_prive`
--

INSERT INTO `notification_message_prive` (`id_notif`, `id_message`) VALUES
(75, 73),
(76, 74),
(77, 75),
(78, 76),
(79, 77),
(80, 78),
(81, 79),
(82, 80),
(83, 81),
(84, 82);

-- --------------------------------------------------------

--
-- Structure de la table `notification_new_participant`
--

CREATE TABLE `notification_new_participant` (
  `id_notif` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notification_new_participant`
--

INSERT INTO `notification_new_participant` (`id_notif`, `id_evenement`) VALUES
(72, 52),
(86, 52),
(101, 52),
(102, 52),
(85, 53),
(88, 53),
(103, 54),
(104, 54),
(105, 54);

-- --------------------------------------------------------

--
-- Structure de la table `preferences`
--

CREATE TABLE `preferences` (
  `id_utilisateur` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `preference_value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `preferences`
--

INSERT INTO `preferences` (`id_utilisateur`, `id_categorie`, `preference_value`) VALUES
(16, 24, 0),
(16, 27, 1),
(17, 23, 1),
(17, 27, 1),
(18, 23, 1),
(19, 23, 1);

-- --------------------------------------------------------

--
-- Structure de la table `relation`
--

CREATE TABLE `relation` (
  `id_relation` int(11) NOT NULL,
  `id_suiveur` int(11) DEFAULT NULL,
  `id_suivie` int(11) DEFAULT NULL,
  `statut` enum('en attente','accepte','bloque') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `relation`
--

INSERT INTO `relation` (`id_relation`, `id_suiveur`, `id_suivie`, `statut`) VALUES
(27, 17, 15, 'accepte'),
(28, 15, 17, 'accepte');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id_role`, `role`) VALUES
(1, 'administrator'),
(2, 'user');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_profil` varchar(255) DEFAULT NULL,
  `is_darkmode` tinyint(1) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `prenom`, `pseudo`, `email`, `password`, `photo_profil`, `is_darkmode`, `role`, `token`) VALUES
(15, 'Maurer', 'Gilles', 'gilles_mr', 'gilles.maurer@mail.fr', '$2y$10$G851079Ab4SCYxK6.X0EUeJaqavR4HxtY9LDHbRM7HOYDmdLMbEna', 'images/avatars/admin_avatar2.jpg', 0, NULL, 'QLh0zrA0K1QE5dL5ZQFzEF8tfCDawxBV6ajW07E'),
(16, 'Diguat', 'Marius', 'SkateZen', 'marius.diguat@mail.fr', '$2y$10$ReWf9qxJ2REvnRXo4uz0HetAQCnsW5iGGoMkRYNb9neHu835jl8Rm', 'images/avatars/admin_avatar1.jpg', 0, NULL, 'GXpaiCrRbltBORjx1fOTX7h9mBJrIJeQDEGv6kx4'),
(17, 'Athane', 'Augustin', 'august2', 'augustin.athane@mail.fr', '$2y$10$9a9ROzrBiA/gOJwqgdWl1Onuq8ySwFvzbx2BqRVfWmxEIvqAjGUyC', 'images/avatars/admin_avatar4.jpg', 0, NULL, 'ibMQbUBf9mLhORIdBEU5jNaGxXsvpmdgNRthOYT8'),
(18, 'Victor', 'Goudal', 'vitrolles', 'victor.goudal@mail.fr', '$2y$10$7fLOxzQ0UrM7DqeOJkprZ.a8r489YKVt4syqVdSUq5psCktOFvZzu', 'images/avatars/admin_avatar3.jpg', 0, NULL, '0u8s9an2B7d0Qmem8UU4r1gbZcdcgp7x8J3Untsw'),
(19, 'de Belfort', 'Mairie', 'mairie2belfort', 'mairie.belfort@mail.fr', '$2y$10$g9hngZBwukDGVaJpUsdh6eI497SIaaazUh0c8tpYrecF4oEcEN3be', 'images/avatars/avatar16.jpg', 0, NULL, 'AlO3JrCdNNnLW4FnfSGnPAUScQYOybvVif23RF0o1M');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id_evenement`),
  ADD KEY `id_createur` (`id_createur`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `inscription_evenement`
--
ALTER TABLE `inscription_evenement`
  ADD PRIMARY KEY (`id_relation`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_utilisateur_envoyeur` (`id_utilisateur_envoyeur`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `message_prive`
--
ALTER TABLE `message_prive`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_utilisateur_envoyeur` (`id_utilisateur_envoyeur`),
  ADD KEY `id_utilisateur_destinataire` (`id_utilisateur_destinataire`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `notification_change_evenement`
--
ALTER TABLE `notification_change_evenement`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `notification_change_relation`
--
ALTER TABLE `notification_change_relation`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_relation` (`id_relation`);

--
-- Index pour la table `notification_message_groupe`
--
ALTER TABLE `notification_message_groupe`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_message` (`id_message`);

--
-- Index pour la table `notification_message_prive`
--
ALTER TABLE `notification_message_prive`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_message` (`id_message`);

--
-- Index pour la table `notification_new_participant`
--
ALTER TABLE `notification_new_participant`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id_utilisateur`,`id_categorie`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `relation`
--
ALTER TABLE `relation`
  ADD PRIMARY KEY (`id_relation`),
  ADD KEY `id_utilisateur1` (`id_suiveur`),
  ADD KEY `id_utilisateur2` (`id_suivie`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `inscription_evenement`
--
ALTER TABLE `inscription_evenement`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `message_prive`
--
ALTER TABLE `message_prive`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT pour la table `relation`
--
ALTER TABLE `relation`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD CONSTRAINT `evenement_ibfk_1` FOREIGN KEY (`id_createur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `evenement_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`);

--
-- Contraintes pour la table `inscription_evenement`
--
ALTER TABLE `inscription_evenement`
  ADD CONSTRAINT `inscription_evenement_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `inscription_evenement_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`);

--
-- Contraintes pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  ADD CONSTRAINT `message_groupe_ibfk_1` FOREIGN KEY (`id_utilisateur_envoyeur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `message_groupe_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`);

--
-- Contraintes pour la table `message_prive`
--
ALTER TABLE `message_prive`
  ADD CONSTRAINT `message_prive_ibfk_1` FOREIGN KEY (`id_utilisateur_envoyeur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `message_prive_ibfk_2` FOREIGN KEY (`id_utilisateur_destinataire`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `notification_change_evenement`
--
ALTER TABLE `notification_change_evenement`
  ADD CONSTRAINT `notification_change_evenement_ibfk_1` FOREIGN KEY (`id_notif`) REFERENCES `notifications` (`id_notif`),
  ADD CONSTRAINT `notification_change_evenement_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`);

--
-- Contraintes pour la table `notification_change_relation`
--
ALTER TABLE `notification_change_relation`
  ADD CONSTRAINT `notification_change_relation_ibfk_1` FOREIGN KEY (`id_notif`) REFERENCES `notifications` (`id_notif`),
  ADD CONSTRAINT `notification_change_relation_ibfk_2` FOREIGN KEY (`id_relation`) REFERENCES `relation` (`id_relation`);

--
-- Contraintes pour la table `notification_message_groupe`
--
ALTER TABLE `notification_message_groupe`
  ADD CONSTRAINT `notification_message_groupe_ibfk_1` FOREIGN KEY (`id_notif`) REFERENCES `notifications` (`id_notif`),
  ADD CONSTRAINT `notification_message_groupe_ibfk_2` FOREIGN KEY (`id_message`) REFERENCES `message_groupe` (`id_message`);

--
-- Contraintes pour la table `notification_message_prive`
--
ALTER TABLE `notification_message_prive`
  ADD CONSTRAINT `notification_message_prive_ibfk_1` FOREIGN KEY (`id_notif`) REFERENCES `notifications` (`id_notif`),
  ADD CONSTRAINT `notification_message_prive_ibfk_2` FOREIGN KEY (`id_message`) REFERENCES `message_prive` (`id_message`);

--
-- Contraintes pour la table `notification_new_participant`
--
ALTER TABLE `notification_new_participant`
  ADD CONSTRAINT `notification_new_participant_ibfk_1` FOREIGN KEY (`id_notif`) REFERENCES `notifications` (`id_notif`),
  ADD CONSTRAINT `notification_new_participant_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`);

--
-- Contraintes pour la table `preferences`
--
ALTER TABLE `preferences`
  ADD CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `preferences_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`);

--
-- Contraintes pour la table `relation`
--
ALTER TABLE `relation`
  ADD CONSTRAINT `relation_ibfk_1` FOREIGN KEY (`id_suiveur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `relation_ibfk_2` FOREIGN KEY (`id_suivie`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
