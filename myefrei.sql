-- Création de la BDD
CREATE DATABASE IF NOT EXISTS myefrei;

-- Sélection de la BDD
USE myefrei;

-- Création de la table des matières
CREATE TABLE IF NOT EXISTS `matiere` (
  `idMatiere` int(11) NOT NULL AUTO_INCREMENT,
  `nomMatiere` varchar(50) NOT NULL,
  `coefficientMatiere` int(11) NOT NULL,
  PRIMARY KEY (`idMatiere`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des groupes
CREATE TABLE IF NOT EXISTS `groupe` (
    `idGroupe` int(11) NOT NULL AUTO_INCREMENT,
    `nomGroupe` varchar(50) NOT NULL,
    PRIMARY KEY (`idGroupe`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des étudiants
CREATE TABLE IF NOT EXISTS `etudiant` (
    `idEtudiant` int(11) NOT NULL AUTO_INCREMENT,
    `nomEtudiant` varchar(50) NOT NULL,
    `prenomEtudiant` varchar(50) NOT NULL,
    `emailEtudiant` varchar(50) NOT NULL,
    `mdpEtudiant` varchar(50) NOT NULL,
    `idGroupe` int(11) NOT NULL,
    PRIMARY KEY (`idEtudiant`),
    KEY `idGroupe` (`idGroupe`),
    CONSTRAINT `etudiant_ibfk_1` FOREIGN KEY (`idGroupe`) REFERENCES `groupe` (`idGroupe`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des notes
CREATE TABLE IF NOT EXISTS `note` (
  `idNote` int(11) NOT NULL AUTO_INCREMENT,
  `idMatiere` int(11) NOT NULL,
  `idEtudiant` int(11) NOT NULL,
  `noteNote` float NOT NULL,
  PRIMARY KEY (`idNote`),
  KEY `idMatiere` (`idMatiere`),
  KEY `idEtudiant` (`idEtudiant`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`idMatiere`) REFERENCES `matiere` (`idMatiere`),
  CONSTRAINT `note_ibfk_2` FOREIGN KEY (`idEtudiant`) REFERENCES `etudiant` (`idEtudiant`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des professeurs
CREATE TABLE IF NOT EXISTS `professeur` (
    `idProfesseur` int(11) NOT NULL AUTO_INCREMENT,
    `nomProfesseur` varchar(50) NOT NULL,
    `prenomProfesseur` varchar(50) NOT NULL,
    `emailProfesseur` varchar(50) NOT NULL,
    `mdpProfesseur` varchar(50) NOT NULL,
    PRIMARY KEY (`idProfesseur`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des salles
CREATE TABLE IF NOT EXISTS `salle` (
    `idSalle` int(11) NOT NULL AUTO_INCREMENT,
    `nomSalle` varchar(50) NOT NULL,
    `capaciteSalle` int(11) NOT NULL,
    PRIMARY KEY (`idSalle`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des cours
CREATE TABLE IF NOT EXISTS `cours` (
    `idCours` int(11) NOT NULL AUTO_INCREMENT,
    `idProfesseur` int(11) NOT NULL,
    `idMatiere` int(11) NOT NULL,
    `idSalle` int(11) NOT NULL,
    `dateCours` date NOT NULL,
    `heureDebutCours` time NOT NULL,
    `heureFinCours` time NOT NULL,
    PRIMARY KEY (`idCours`),
    KEY `idProfesseur` (`idProfesseur`),
    KEY `idMatiere` (`idMatiere`),
    KEY `idSalle` (`idSalle`),
    CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`idProfesseur`) REFERENCES `professeur` (`idProfesseur`),
    CONSTRAINT `cours_ibfk_2` FOREIGN KEY (`idMatiere`) REFERENCES `matiere` (`idMatiere`),
    CONSTRAINT `cours_ibfk_3` FOREIGN KEY (`idSalle`) REFERENCES `salle` (`idSalle`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des absences
CREATE TABLE IF NOT EXISTS `absence` (
    `idAbsence` int(11) NOT NULL AUTO_INCREMENT,
    `idEtudiant` int(11) NOT NULL,
    `idCours` int(11) NOT NULL,
    `dateAbsence` date NOT NULL,
    PRIMARY KEY (`idAbsence`),
    KEY `idEtudiant` (`idEtudiant`),
    KEY `idCours` (`idCours`),
    CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`idEtudiant`) REFERENCES `etudiant` (`idEtudiant`),
    CONSTRAINT `absence_ibfk_2` FOREIGN KEY (`idCours`) REFERENCES `cours` (`idCours`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS `utilisateur` (
    `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
    `nomUtilisateur` varchar(50) NOT NULL,
    `prenomUtilisateur` varchar(50) NOT NULL,
    `emailUtilisateur` varchar(50) NOT NULL,
    `mdpUtilisateur` varchar(50) NOT NULL,
    `idGroupe` int(11) NOT NULL,
    PRIMARY KEY (`idUtilisateur`),
    KEY `idGroupe` (`idGroupe`),
    CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`idGroupe`) REFERENCES `groupe` (`idGroupe`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;