-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: cuervo_biblioteca
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autorias`
--

DROP TABLE IF EXISTS `autorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autorias` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `nacionalidad` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_muerte` date DEFAULT NULL,
  `idUsuario` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_autoria_usuario` (`idUsuario`),
  CONSTRAINT `FK_autoria_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autorias`
--

LOCK TABLES `autorias` WRITE;
/*!40000 ALTER TABLE `autorias` DISABLE KEYS */;
INSERT INTO `autorias` VALUES ('d313f41b-b6c4-11f1-88b7-a44cc84eb16e','Georg Wilhelm Friedrich','Hegel',NULL,'1770-08-27','1831-12-14','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('d979d039-b6c4-11f1-88b7-a44cc84eb16e','Edmund','Husserl',NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('dd46f4c1-b6c4-11f1-88b7-a44cc84eb16e','Ray','Brassier',NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `autorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listas`
--

DROP TABLE IF EXISTS `listas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listas` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `nombre` varchar(150) NOT NULL,
  `descripcion` text,
  `idUsuario` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listas`
--

LOCK TABLES `listas` WRITE;
/*!40000 ALTER TABLE `listas` DISABLE KEYS */;
INSERT INTO `listas` VALUES ('29fb6ade-b6ce-11f1-88b7-a44cc84eb16e','realismo','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('7205dfe0-b6c5-11f1-88b7-a44cc84eb16e','fenomenología','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `listas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `idTipoRegistro` char(36) NOT NULL,
  `idOrigen` char(36) DEFAULT NULL,
  `titulo` varchar(500) NOT NULL,
  `subtitulo` varchar(500) DEFAULT NULL,
  `fechaPublicacionOriginal` date DEFAULT NULL,
  `fechaEdicion` date DEFAULT NULL,
  `editorialRevista` varchar(255) DEFAULT NULL,
  `paginas` varchar(50) DEFAULT NULL,
  `lugar` varchar(255) DEFAULT NULL,
  `volumen` varchar(50) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `edicion` varchar(100) DEFAULT NULL,
  `idioma` varchar(100) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `observacion` text,
  `idUsuario` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idTipoRegistro` (`idTipoRegistro`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `registros_ibfk_1` FOREIGN KEY (`idTipoRegistro`) REFERENCES `tipos_registros` (`id`),
  CONSTRAINT `registros_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
INSERT INTO `registros` VALUES ('378120d0-c474-4869-8c1d-bbd09f155fb0','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Fenomenoloía del Espíritu',NULL,'1807-01-01',NULL,'Gredos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('3cccfce1-6805-4ffa-b40c-63bdc97781b1','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Ideas relativas a una fenomenología pura y una filosofía fenomenológica','Libro Primero: Introducción general a la fenomenología pura','1913-01-01',NULL,'FCE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros_autorias`
--

DROP TABLE IF EXISTS `registros_autorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros_autorias` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `idRegistro` char(36) NOT NULL,
  `idAutoria` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idAutoria` (`idAutoria`),
  KEY `registros_autorias_ibfk_1` (`idRegistro`),
  CONSTRAINT `registros_autorias_ibfk_1` FOREIGN KEY (`idRegistro`) REFERENCES `registros` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registros_autorias_ibfk_2` FOREIGN KEY (`idAutoria`) REFERENCES `autorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros_autorias`
--

LOCK TABLES `registros_autorias` WRITE;
/*!40000 ALTER TABLE `registros_autorias` DISABLE KEYS */;
INSERT INTO `registros_autorias` VALUES ('1ba3c4ca-b6c5-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','d979d039-b6c4-11f1-88b7-a44cc84eb16e'),('f408c805-b6c4-11f1-88b7-a44cc84eb16e','378120d0-c474-4869-8c1d-bbd09f155fb0','d313f41b-b6c4-11f1-88b7-a44cc84eb16e');
/*!40000 ALTER TABLE `registros_autorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros_listas`
--

DROP TABLE IF EXISTS `registros_listas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros_listas` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `idRegistro` char(36) NOT NULL,
  `idLista` char(36) NOT NULL,
  `orderInt` int NOT NULL,
  `fechaAgregado` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `registros_listas_ibfk_1` (`idRegistro`),
  KEY `registros_listas_ibfk_2` (`idLista`),
  CONSTRAINT `registros_listas_ibfk_1` FOREIGN KEY (`idRegistro`) REFERENCES `registros` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registros_listas_ibfk_2` FOREIGN KEY (`idLista`) REFERENCES `listas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros_listas`
--

LOCK TABLES `registros_listas` WRITE;
/*!40000 ALTER TABLE `registros_listas` DISABLE KEYS */;
INSERT INTO `registros_listas` VALUES ('3240a23d-b6ce-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','29fb6ade-b6ce-11f1-88b7-a44cc84eb16e',0,'2026-09-22 18:40:14'),('7da76d27-b6c5-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','7205dfe0-b6c5-11f1-88b7-a44cc84eb16e',1,'2026-09-22 17:37:55'),('7da7972c-b6c5-11f1-88b7-a44cc84eb16e','378120d0-c474-4869-8c1d-bbd09f155fb0','7205dfe0-b6c5-11f1-88b7-a44cc84eb16e',2,'2026-09-22 17:37:55'),('7da7b7e2-b6c5-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','7205dfe0-b6c5-11f1-88b7-a44cc84eb16e',0,'2026-09-22 17:37:55');
/*!40000 ALTER TABLE `registros_listas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros_temas`
--

DROP TABLE IF EXISTS `registros_temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros_temas` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `idRegistro` char(36) NOT NULL,
  `idTema` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTema` (`idTema`),
  KEY `registros_temas_ibfk_1` (`idRegistro`),
  CONSTRAINT `registros_temas_ibfk_1` FOREIGN KEY (`idRegistro`) REFERENCES `registros` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registros_temas_ibfk_2` FOREIGN KEY (`idTema`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros_temas`
--

LOCK TABLES `registros_temas` WRITE;
/*!40000 ALTER TABLE `registros_temas` DISABLE KEYS */;
INSERT INTO `registros_temas` VALUES ('1ba48888-b6c5-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','78c6f648-b616-11f1-88b7-a44cc84eb16e'),('f409ff87-b6c4-11f1-88b7-a44cc84eb16e','378120d0-c474-4869-8c1d-bbd09f155fb0','80ecf050-b616-11f1-88b7-a44cc84eb16e');
/*!40000 ALTER TABLE `registros_temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temas`
--

DROP TABLE IF EXISTS `temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temas` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `idUsuario` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuarios_id` (`idUsuario`),
  CONSTRAINT `idUsuarios_id` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temas`
--

LOCK TABLES `temas` WRITE;
/*!40000 ALTER TABLE `temas` DISABLE KEYS */;
INSERT INTO `temas` VALUES ('78c6f648-b616-11f1-88b7-a44cc84eb16e','Fenomenología','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('80ecf050-b616-11f1-88b7-a44cc84eb16e','Filosofía moderna','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('86309a1b-b616-11f1-88b7-a44cc84eb16e','Realismo especulativo','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_registros`
--

DROP TABLE IF EXISTS `tipos_registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_registros` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `idUsuario` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuario_id` (`idUsuario`),
  CONSTRAINT `idUsuario_id` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_registros`
--

LOCK TABLES `tipos_registros` WRITE;
/*!40000 ALTER TABLE `tipos_registros` DISABLE KEYS */;
INSERT INTO `tipos_registros` VALUES ('3418897c-a25c-11f1-95ee-a44cc84eb16e','Libros',NULL,NULL),('3418a9c7-a25c-11f1-95ee-a44cc84eb16e','Papers',NULL,NULL),('f5427793-b6cb-11f1-88b7-a44cc84eb16e','blog','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `tipos_registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `userName` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('a775b9f9-9d85-11f1-bffe-a44cc84eb16e','admin','81dc9bdb52d04dc20036dbd8313ed055'),('a775d58c-9d85-11f1-bffe-a44cc84eb16e','flavia','81dc9bdb52d04dc20036dbd8313ed055');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-22 18:46:30
