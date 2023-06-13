-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 13 Juin 2023 à 12:20
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `eventum`
--
CREATE DATABASE IF NOT EXISTS `eventum` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `eventum`;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `categorie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `categorie`) VALUES
(14, 'FÃªtes'),
(15, 'SoirÃ©e'),
(16, 'Concert'),
(17, 'CinÃ©ma'),
(18, 'ThÃ©Ã¢tre'),
(19, 'MusÃ©e'),
(20, 'Sport'),
(21, 'Jeux de sociÃ©tÃ©s'),
(22, 'Gaming'),
(23, 'Professionnel'),
(24, 'Ballade'),
(25, 'Autres');

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

CREATE TABLE `evenement` (
  `id_evenement` int(11) NOT NULL,
  `id_createur` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `heure` time DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `evenement`
--

INSERT INTO `evenement` (`id_evenement`, `id_createur`, `titre`, `id_categorie`, `description`, `image`, `date`, `heure`, `lieu`, `is_public`) VALUES
(23, 1, 'Sortie CinÃ©ma', 17, 'Allons voir un nouveau film ensemble ! ', 'images/evenements/IMG-644c2ecbc04ff9.57666740.jpg', '2023-04-14', '20:00:00', 'Belfort', 0),
(24, 1, 'Mega Party', 14, 'On va faire une grosse fÃªte ramenez autant de monde possible', 'images/evenements/IMG-644b95b4b9e8d3.49155054.jpg', '2023-04-07', '20:00:00', 'Belfort', 1),
(25, 3, 'Sortie vÃ©lo', 20, 'Venez pÃ©daler !!', 'images/evenements/IMG-644b9929aa32d5.35988112.jpg', '2023-04-14', '12:00:00', 'Belfort', 1),
(27, 4, 'Anniversaire', 14, 'On fete mes 21ans', NULL, '2024-02-26', '18:00:00', 'Saint Louis', 0),
(28, 4, 'Anniversaire2', 14, 'test anniv', NULL, '2023-04-26', '18:00:00', 'Testville', 0),
(35, 8, 'SoirÃ©e Bowling', 15, 'A vos strikes', 'images/evenements/IMG-644c2f2e7fe7d7.34379310.jpg', '2023-04-25', '19:30:00', '4as', 1),
(39, 3, 'SoirÃ©e animÃ©s', 17, 'test avec image', 'images/evenements/IMG-643e9e90d6cdc9.57236055.jpg', '2023-04-19', '12:05:00', 'Chez moi', 1),
(46, 11, 'SoirÃ©e jeux vidÃ©os', 22, 'Venez jouez avec moi Ã  League of Legends', '', '2023-05-25', '21:00:00', 'UTBM', 1),
(47, 12, 'Concert', 16, '', 'images/evenements/IMG-644c2e68563480.13514690.jpg', '2023-06-15', '19:00:00', 'Noumatrouff', 1);

-- --------------------------------------------------------

--
-- Structure de la table `inscription_evenement`
--

CREATE TABLE `inscription_evenement` (
  `id_relation` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `inscription_evenement`
--

INSERT INTO `inscription_evenement` (`id_relation`, `id_utilisateur`, `id_evenement`) VALUES
(28, 3, 23),
(30, 1, 25),
(31, 1, 28),
(34, 2, 24),
(35, 1, 35);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `message_groupe`
--

INSERT INTO `message_groupe` (`id_message`, `id_utilisateur_envoyeur`, `id_evenement`, `date_envoi`, `contenu`, `image`) VALUES
(1, 1, 23, '2023-04-09 09:23:16', 'Salut Victor', NULL),
(2, 1, 23, '2023-04-09 09:32:35', '', 'IMG-64326a13e11f72.22220322.jpg'),
(3, 1, 23, '2023-04-18 12:28:29', 'Heyyy', NULL),
(4, 1, 23, '2023-04-18 13:22:53', 'Ca va ?\r\n', NULL),
(5, 3, 23, '2023-04-18 13:24:05', 'Super et toi ?\r\n', NULL),
(6, 1, 23, '2023-04-18 14:13:42', 'Ouais trÃ¨s bien', NULL),
(7, 1, 23, '2023-04-18 14:52:30', '', 'IMG-643e928ede56c1.53752740.jpg'),
(8, 1, 23, '2023-04-26 23:23:17', 'helllo\r\nca va ?\r\ncool', NULL),
(9, 1, 23, '2023-04-26 23:24:40', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia, non minima cum autem fuga voluptatem error, quisquam illum accusamus ea? Iure, quo nemo explicabo eligendi numquam a beatae temporibus?\r\n            Sapiente, inventore? Magni similique fuga eos necessitatibus eligendi. Illum praesentium dolores in eos, distinctio ex commodi ducimus dolorem eum placeat tenetur provident? Nihil quos minus, veniam reprehenderit dignissimos consequatur quibusdam.\r\n            Consequatur ducimus praesentium ipsam fuga placeat voluptas error iusto fugit laboriosam nemo. Magnam accusamus placeat quas nisi facere eum consequuntur aperiam asperiores incidunt et, a natus possimus quibusdam aspernatur fuga.\r\n            Minima nam, pariatur illum atque nisi tempore ab recusandae nemo, eaque libero culpa? Expedita harum iusto et quaerat officiis modi nulla. Corporis nostrum quis ducimus vitae placeat, sint ab voluptate.\r\n            Rerum aspernatur eos repudiandae doloribus quia? Ex dolor laboriosam provident culpa nihil dignissimos deserunt nemo est nobis, distinctio at. Repellat ipsam corrupti dicta explicabo eligendi consequuntur eum veritatis quos quod!', NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `message_prive`
--

INSERT INTO `message_prive` (`id_message`, `id_utilisateur_envoyeur`, `id_utilisateur_destinataire`, `date_envoi`, `contenu`, `image`, `vue`, `id_evenement`) VALUES
(1, 1, 3, '2023-04-04 17:05:00', 'Salut !', NULL, NULL, NULL),
(2, 2, 1, '2023-04-04 18:11:06', 'salut', NULL, NULL, NULL),
(3, 4, 1, '2023-04-06 10:24:37', 'Salut', NULL, NULL, NULL),
(4, 1, 3, '2023-04-06 16:29:20', 'Comment Ã§a va ?\r\n', NULL, NULL, NULL),
(5, 1, 7, '2023-04-06 16:49:18', 'hey', NULL, NULL, NULL),
(6, 1, 7, '2023-04-06 16:49:33', 'salut', NULL, NULL, NULL),
(7, 1, 7, '2023-04-06 16:50:38', 'salut', NULL, NULL, NULL),
(8, 1, 7, '2023-04-06 16:53:53', 'hey', NULL, NULL, NULL),
(9, 3, 7, '2023-04-06 17:02:13', 'salut', NULL, NULL, NULL),
(10, 1, 2, '2023-04-08 22:57:31', 'Yooo', NULL, NULL, NULL),
(11, 1, 2, '2023-04-08 23:02:39', 'test', NULL, NULL, NULL),
(12, 1, 2, '2023-04-08 23:03:16', 'test2', NULL, NULL, NULL),
(15, 1, 2, '2023-04-08 23:25:59', '', 'IMG-6431dbe7c44045.30300560.jpg', NULL, NULL),
(17, 1, 3, '2023-04-08 23:30:19', '', 'IMG-6431dceb975de7.12011784.jpg', NULL, NULL),
(18, 1, 4, '2023-04-09 13:22:33', 'hey', NULL, NULL, NULL),
(19, 1, 4, '2023-04-09 13:25:22', 'Tas pas reÃ§u mon invitation ?\r\n', NULL, NULL, NULL),
(20, 1, 2, '2023-04-09 14:13:16', 'message', NULL, NULL, NULL),
(21, 1, 4, '2023-04-09 14:21:21', 'ola', NULL, NULL, NULL),
(22, 3, 1, '2023-04-18 13:28:32', 'Trop cool !', NULL, NULL, NULL),
(23, 1, 6, '2023-04-18 14:42:42', 'yoo', NULL, NULL, NULL),
(24, 1, 4, '2023-04-27 18:25:54', 'hey\r\n', NULL, NULL, NULL),
(25, 3, 1, '2023-04-28 23:42:48', 'Sympa y\'a super mario en plus !\r\n', NULL, NULL, NULL),
(26, 3, 1, '2023-04-28 23:43:22', '', 'IMG-644c3dfa5a7938.89404068.jpg', NULL, NULL),
(27, 1, 3, '2023-04-29 20:12:23', 'okay\r\n', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id_notif` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `date_notif` date NOT NULL,
  `vue` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification_change_evenement`
--

CREATE TABLE `notification_change_evenement` (
  `id_notif` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification_change_relation`
--

CREATE TABLE `notification_change_relation` (
  `id_notif` int(11) NOT NULL,
  `id_relation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification_evenement_close`
--

CREATE TABLE `notification_evenement_close` (
  `id_notif` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification_message_groupe`
--

CREATE TABLE `notification_message_groupe` (
  `id_notif` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification_message_prive`
--

CREATE TABLE `notification_message_prive` (
  `id_notif` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification_new_participant`
--

CREATE TABLE `notification_new_participant` (
  `id_notif` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `preferences`
--

CREATE TABLE `preferences` (
  `id_utilisateur` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `preference_value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `relation`
--

CREATE TABLE `relation` (
  `id_relation` int(11) NOT NULL,
  `id_suiveur` int(11) DEFAULT NULL,
  `id_suivie` int(11) DEFAULT NULL,
  `statut` enum('en attente','accepte','bloque') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `relation`
--

INSERT INTO `relation` (`id_relation`, `id_suiveur`, `id_suivie`, `statut`) VALUES
(3, 4, 1, 'accepte'),
(4, 5, 1, 'accepte'),
(5, 6, 1, 'accepte'),
(6, 6, 5, 'accepte'),
(8, 3, 7, 'accepte'),
(10, 8, 1, 'accepte'),
(11, 8, 4, 'en attente'),
(12, 8, 6, 'en attente'),
(14, 1, 3, 'accepte'),
(16, 9, 1, 'accepte'),
(17, 9, 7, 'en attente'),
(20, 2, 3, 'en attente'),
(21, 2, 1, 'en attente'),
(22, 7, 1, 'en attente');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `roles`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `prenom`, `pseudo`, `email`, `password`, `photo_profil`, `is_darkmode`, `role`, `token`) VALUES
(1, 'Diguat', 'Marius', 'sk8zen', 'm@d', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-64398b40977e23.71004061.jpg', 1, NULL, NULL),
(2, 'Chaussoy', 'ElisÃ©o', 'tatsuya', 'e@c', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c35c0418828.97606205.png', 0, NULL, NULL),
(3, 'Goudal', 'Victor', 'victrolles', 'v@g', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c381e177c59.98535094.jpg', 1, NULL, NULL),
(4, 'Esstafa', 'Yasmine', 'yass', 'y@e', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c3902a6f735.59820818.jpg', 0, NULL, NULL),
(5, 'Marcelin', 'Nicolas', 'nicoco', 'n@m', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(6, 'Royer', 'Albert', 'raryn', 'a@r', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(7, 'Maurer', 'Gilles', 'sellig', 'g@m', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c39793e7f62.50049025.jpg', 0, NULL, NULL),
(8, 'Sudaker', 'Veronica', 'greenorica', 'v@s', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(9, 'Augustin', 'Athane', 'augustin', 'a@a', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(10, 'testeur', 'test', 'test', 't@t', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(11, 'Melon', 'Eleonore', 'unity', 'u@c', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c3d0ee50f67.49967731.jpg', 1, NULL, NULL),
(12, 'Organisateur', 'Super', 'orga2000', 's@o', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 1, NULL, NULL),
(14, 'Diguat', 'Marius', 'mario', 'mario@mail', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 1, NULL, NULL);

--
-- Index pour les tables exportées
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
-- Index pour la table `notification_evenement_close`
--
ALTER TABLE `notification_evenement_close`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `id_evenement` (`id_evenement`);

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
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT pour la table `inscription_evenement`
--
ALTER TABLE `inscription_evenement`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `message_prive`
--
ALTER TABLE `message_prive`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `relation`
--
ALTER TABLE `relation`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- Contraintes pour les tables exportées
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
-- Contraintes pour la table `notification_evenement_close`
--
ALTER TABLE `notification_evenement_close`
  ADD CONSTRAINT `notification_evenement_close_ibfk_1` FOREIGN KEY (`id_notif`) REFERENCES `notifications` (`id_notif`),
  ADD CONSTRAINT `notification_evenement_close_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;