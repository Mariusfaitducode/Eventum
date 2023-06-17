-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 17 juin 2023 à 17:01
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

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
(26, 'Repas', 'images/categorie/repas.jpeg');

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
(23, 1, 'Sortie Cinéma', 17, 'Allons voir un nouveau film ensemble ! ', 'images/evenements/IMG-644c2ecbc04ff9.57666740.jpg', '2023-04-14', '20:00:00', 'Belfort', 0, NULL, NULL),
(24, 1, 'Mega Party', 14, 'On va faire une grosse fête ramenez autant de monde possible', 'images/evenements/IMG-644b95b4b9e8d3.49155054.jpg', '2023-04-07', '20:00:00', 'Belfort', 1, NULL, NULL),
(25, 3, 'Sortie vélo', 20, 'Venez pédaler !!', 'images/evenements/IMG-644b9929aa32d5.35988112.jpg', '2023-04-14', '12:00:00', 'Belfort', 1, NULL, NULL),
(27, 4, 'Anniversaire', 14, 'On fete mes 21ans', NULL, '2024-02-26', '18:00:00', 'Saint Louis', 0, NULL, NULL),
(28, 4, 'Anniversaire2', 14, 'test anniv', NULL, '2023-04-26', '18:00:00', 'Testville', 0, NULL, NULL),
(35, 8, 'Soirée Bowling', 15, 'A vos strikes', 'images/evenements/IMG-644c2f2e7fe7d7.34379310.jpg', '2023-04-25', '19:30:00', '4as', 1, NULL, NULL),
(39, 3, 'Soirée animés', 17, 'test avec image', 'images/evenements/IMG-643e9e90d6cdc9.57236055.jpg', '2023-04-19', '12:05:00', 'Chez moi', 1, NULL, NULL),
(46, 11, 'Soirée jeux vidéos', 22, 'Venez jouer avec moi à  League of Legends', '', '2023-05-25', '21:00:00', 'UTBM', 1, NULL, NULL),
(47, 12, 'Concert', 16, '', 'images/evenements/IMG-644c2e68563480.13514690.jpg', '2023-06-15', '19:00:00', 'Noumatrouff', 1, NULL, NULL),
(50, 7, 'Soutenance WE4B', 25, 'Soutenance du projet Eventum', NULL, '2023-06-23', '10:15:00', 'UTBM', 0, NULL, NULL);

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
(28, 3, 23),
(30, 1, 25),
(31, 1, 28),
(34, 2, 24),
(35, 1, 35),
(43, 7, 24),
(44, 7, 23),
(45, 7, 39);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message_prive`
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
(27, 1, 3, '2023-04-29 20:12:23', 'okay\r\n', NULL, NULL, NULL),
(28, 7, 3, '2023-06-16 22:12:57', 'salut', NULL, 0, NULL),
(29, 7, 3, '2023-06-16 22:12:57', 'salut', NULL, 0, NULL),
(30, 7, 3, '2023-06-16 22:13:06', 'salut', NULL, 0, 24),
(31, 7, 3, '2023-06-17 14:35:06', '', NULL, 0, 50),
(32, 7, 3, '2023-06-17 14:35:08', '', NULL, 0, 50),
(33, 7, 3, '2023-06-17 14:35:14', 'coucou', NULL, 0, 50),
(34, 7, 3, '2023-06-17 14:35:52', '', NULL, 0, 23),
(35, 7, 3, '2023-06-17 14:36:16', '', NULL, 0, 24),
(36, 7, 3, '2023-06-17 14:36:51', 'hello', NULL, 0, 24),
(37, 7, 3, '2023-06-17 14:37:14', 'COUCOU', NULL, 0, 50),
(38, 7, 3, '2023-06-17 14:37:32', 'normaux', NULL, 0, NULL),
(39, 7, 1, '2023-06-17 14:38:29', 'hello', NULL, 0, NULL),
(40, 7, 1, '2023-06-17 14:38:32', 'hello', NULL, 0, NULL),
(41, 7, 1, '2023-06-17 14:38:40', 'coucou', NULL, 0, NULL),
(42, 7, 1, '2023-06-17 14:38:47', 'coucou', NULL, 0, NULL),
(43, 7, 1, '2023-06-17 14:39:09', 'bonsoir', NULL, 0, NULL),
(44, 7, 1, '2023-06-17 14:39:12', 'bonsoir', NULL, 0, NULL),
(45, 7, 1, '2023-06-17 14:39:13', 'bonsoir', NULL, 0, NULL),
(46, 7, 1, '2023-06-17 14:39:14', 'bonsoir', NULL, 0, NULL),
(47, 7, 1, '2023-06-17 14:39:18', 'bouuu', NULL, 0, NULL),
(48, 7, 3, '2023-06-17 14:39:39', '1', NULL, 0, NULL),
(49, 7, 1, '2023-06-17 14:39:52', '1', NULL, 0, NULL),
(50, 7, 1, '2023-06-17 14:40:00', '2', NULL, 0, NULL),
(51, 7, 1, '2023-06-17 14:40:01', '2', NULL, 0, NULL),
(52, 7, 1, '2023-06-17 14:40:01', '2', NULL, 0, NULL),
(53, 7, 1, '2023-06-17 14:40:01', '2', NULL, 0, NULL),
(54, 7, 1, '2023-06-17 14:40:06', '3', NULL, 0, NULL),
(55, 7, 1, '2023-06-17 14:40:10', '4', NULL, 0, NULL),
(56, 7, 1, '2023-06-17 14:40:22', '5', NULL, 0, NULL),
(57, 7, 1, '2023-06-17 14:40:26', '6', NULL, 0, NULL),
(58, 7, 1, '2023-06-17 14:40:34', '7', NULL, 0, NULL),
(59, 7, 3, '2023-06-17 15:13:18', 'ééé test â @ ê è ç', NULL, 0, NULL);

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
(1, 1, '2023-06-15 00:00:00', 0, NULL),
(2, 1, '2023-06-15 00:00:00', 0, NULL),
(3, 1, '2023-06-15 00:00:00', 0, NULL),
(4, 1, '2023-06-15 00:00:00', 0, NULL),
(5, 1, '2023-06-15 00:00:00', 0, NULL),
(6, 1, '2023-06-15 18:48:58', 0, NULL),
(7, 1, '2023-06-15 19:04:40', 0, NULL),
(10, 1, '2023-06-16 15:27:07', 0, 'notif_event_participant'),
(11, 1, '2023-06-16 15:42:31', 0, 'notif_friend'),
(12, 1, '2023-06-16 15:43:06', 0, 'notif_friend'),
(13, 1, '2023-06-16 15:45:00', 0, 'notif_friend'),
(14, 1, '2023-06-16 15:45:17', 0, 'notif_friend'),
(15, 1, '2023-06-16 15:45:30', 0, 'notif_friend'),
(16, 1, '2023-06-16 16:22:34', 0, 'notif_event_participant'),
(17, 3, '2023-06-16 22:12:18', 0, 'notif_event_participant'),
(18, 3, '2023-06-16 22:12:57', 0, 'notif_mp'),
(19, 3, '2023-06-16 22:12:58', 0, 'notif_mp'),
(20, 3, '2023-06-16 22:13:06', 0, 'notif_mp'),
(21, 3, '2023-06-17 14:34:32', 0, 'notif_friend'),
(22, 3, '2023-06-17 14:34:35', 0, 'notif_friend'),
(23, 3, '2023-06-17 14:35:06', 0, 'notif_mp'),
(24, 3, '2023-06-17 14:35:08', 0, 'notif_mp'),
(25, 3, '2023-06-17 14:35:14', 0, 'notif_mp'),
(26, 3, '2023-06-17 14:35:52', 0, 'notif_mp'),
(27, 3, '2023-06-17 14:36:17', 0, 'notif_mp'),
(28, 3, '2023-06-17 14:36:51', 0, 'notif_mp'),
(29, 3, '2023-06-17 14:37:14', 0, 'notif_mp'),
(30, 3, '2023-06-17 14:37:32', 0, 'notif_mp'),
(31, 1, '2023-06-17 14:38:29', 0, 'notif_mp'),
(32, 1, '2023-06-17 14:38:32', 0, 'notif_mp'),
(33, 1, '2023-06-17 14:38:40', 0, 'notif_mp'),
(34, 1, '2023-06-17 14:38:47', 0, 'notif_mp'),
(35, 1, '2023-06-17 14:39:09', 0, 'notif_mp'),
(36, 1, '2023-06-17 14:39:12', 0, 'notif_mp'),
(37, 1, '2023-06-17 14:39:13', 0, 'notif_mp'),
(38, 1, '2023-06-17 14:39:14', 0, 'notif_mp'),
(39, 1, '2023-06-17 14:39:19', 0, 'notif_mp'),
(40, 3, '2023-06-17 14:39:39', 0, 'notif_mp'),
(41, 1, '2023-06-17 14:39:53', 0, 'notif_mp'),
(42, 1, '2023-06-17 14:40:00', 0, 'notif_mp'),
(43, 1, '2023-06-17 14:40:01', 0, 'notif_mp'),
(44, 1, '2023-06-17 14:40:01', 0, 'notif_mp'),
(45, 1, '2023-06-17 14:40:01', 0, 'notif_mp'),
(46, 1, '2023-06-17 14:40:06', 0, 'notif_mp'),
(47, 1, '2023-06-17 14:40:10', 0, 'notif_mp'),
(48, 1, '2023-06-17 14:40:22', 0, 'notif_mp'),
(49, 1, '2023-06-17 14:40:26', 0, 'notif_mp'),
(50, 1, '2023-06-17 14:40:34', 0, 'notif_mp'),
(51, 3, '2023-06-17 15:13:19', 0, 'notif_mp'),
(52, 1, '2023-06-17 16:06:19', 0, 'notif_friend');

-- --------------------------------------------------------

--
-- Structure de la table `notification_change_evenement`
--

CREATE TABLE `notification_change_evenement` (
  `id_notif` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(11, 25),
(12, 25),
(13, 25),
(14, 25),
(15, 25),
(52, 25);

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
(18, 28),
(19, 28),
(20, 30),
(23, 31),
(24, 32),
(25, 33),
(26, 34),
(27, 35),
(28, 36),
(29, 37),
(30, 38),
(31, 39),
(32, 40),
(33, 41),
(34, 42),
(35, 43),
(36, 44),
(37, 45),
(38, 46),
(39, 47),
(40, 48),
(41, 49),
(42, 50),
(43, 51),
(44, 51),
(45, 51),
(46, 54),
(47, 55),
(48, 56),
(49, 57),
(50, 58),
(51, 59);

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
(16, 23),
(1, 24),
(6, 24),
(7, 24),
(10, 24),
(17, 39);

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
(1, 14, 1),
(1, 15, 5),
(1, 16, 2),
(7, 14, 2),
(7, 17, 2);

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
(3, 4, 1, 'accepte'),
(4, 5, 1, 'accepte'),
(5, 6, 1, 'accepte'),
(6, 6, 5, 'accepte'),
(8, 3, 7, 'accepte'),
(10, 8, 1, 'accepte'),
(11, 8, 4, 'accepte'),
(12, 8, 6, 'accepte'),
(14, 1, 9, 'accepte'),
(16, 9, 1, 'accepte'),
(17, 9, 7, 'accepte'),
(25, 7, 1, 'accepte');

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
(1, 'Diguat', 'Marius', 'sk8zen', 'm@d', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-64398b40977e23.71004061.jpg', 1, NULL, '9kQNAgUx9FCrVoAgvXi5gZw1bISxZfROVmUxPICNU'),
(2, 'Chaussoy', 'Eliséo', 'tatsuya', 'e@c', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c35c0418828.97606205.png', 0, NULL, NULL),
(3, 'Goudal', 'Victor', 'victrolles', 'v@g', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c381e177c59.98535094.jpg', 1, NULL, NULL),
(4, 'Esstafa', 'Yasmine', 'yass', 'y@e', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c3902a6f735.59820818.jpg', 0, NULL, NULL),
(5, 'Marcelin', 'Nicolas', 'nicoco', 'n@m', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(6, 'Royer', 'Albert', 'raryn', 'a@r', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(7, 'Maurer', 'Gilles', 'sellig', 'g@m', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c39793e7f62.50049025.jpg', 0, NULL, 'QzMTsARWNslkexW7qiIVDsv5yQJYLikBhmDnSgxw'),
(8, 'Sudaker', 'Veronica', 'greenorica', 'v@s', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(9, 'Augustin', 'Athane', 'augustin', 'a@a', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(10, 'testeur', 'test', 'test', 't@t', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 0, NULL, NULL),
(11, 'Melon', 'Eleonore', 'unity', 'u@c', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/IMG-644c3d0ee50f67.49967731.jpg', 1, NULL, NULL),
(12, 'Organisateur', 'Super', 'orga2000', 's@o', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 1, NULL, NULL),
(14, 'Diguat', 'Marius', 'mario', 'mario@mail', '$2y$10$wVww8OSi/mnRMQ.4jZ/BO.tZDmfCmVaJY.FO9Ef2CgfiOMXi1n82m', 'images/avatars/default-avatar.png', 1, NULL, NULL);

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
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `inscription_evenement`
--
ALTER TABLE `inscription_evenement`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `message_prive`
--
ALTER TABLE `message_prive`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `relation`
--
ALTER TABLE `relation`
  MODIFY `id_relation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
