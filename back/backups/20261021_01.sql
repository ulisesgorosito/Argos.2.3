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
-- Table structure for table `actividades`
--

DROP TABLE IF EXISTS `actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividades` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `idLista` char(36) DEFAULT NULL,
  `idUsuario` char(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividades`
--

LOCK TABLES `actividades` WRITE;
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` VALUES ('dbf63eb0-7efb-4457-8c51-cccdf75174c6','Escritura','','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('ec568a89-c23b-469f-a072-e67ef9eebf5a','lectura notas','Latour: Pandora, Politiques, ANT, Face a Gaia\nViveiros: metafísicas caníbales, mundo por venir\nHaraway: trouble, conoc situado\nTsing\nChakrabarty\nMeillassoux\nBrassier','1854d195-c956-11f1-911a-a44cc84eb16e','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('ee868c88-3d8c-46e2-bdf5-d529d6acb704','lectura idealismos ','','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('ef8b1034-ec73-44ab-befe-b83b8253b05a','lectura tesis','','193812e9-b8d3-11f1-88b7-a44cc84eb16e','a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `autorias` VALUES ('1b68f1ba-c811-11f1-911a-a44cc84eb16e','Quentin','Meillassoux',NULL,'1967-10-26',NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('4ad2017e-c957-11f1-911a-a44cc84eb16e','Bruno','Latour',NULL,'1947-06-22','2022-10-09','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('4e210a2f-c88a-11f1-911a-a44cc84eb16e','Gilles','Deleuze',NULL,'1925-01-18','1995-11-04','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('579e3c5b-c957-11f1-911a-a44cc84eb16e','Donna','Haraway',NULL,'1944-09-06',NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('67e94635-bb2f-11f1-88b7-a44cc84eb16e',' ','Ovidio',NULL,NULL,'0043-03-17','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('69b0a0f4-b8d3-11f1-88b7-a44cc84eb16e','Antonio','Diéguez Lucena',NULL,'1961-01-01',NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('714c6c70-c957-11f1-911a-a44cc84eb16e','Deborah','Danowski',NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('8539838a-c957-11f1-911a-a44cc84eb16e','Eduardo','Viveiros de Castro',NULL,'1951-04-19',NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('99313011-bb2e-11f1-88b7-a44cc84eb16e',' ',' Homero',NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('9e5a83d5-c957-11f1-911a-a44cc84eb16e','Dipesh','Chakrabarty',NULL,'1948-12-15',NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('b04a36a6-bbfc-11f1-9212-a44cc84eb16e','James','Baldwin',NULL,'1924-08-02','1987-12-01','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('c382a937-bbfb-11f1-9212-a44cc84eb16e','Alain','Badiou',NULL,'1937-01-17',NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('c7b92e9c-bb2e-11f1-88b7-a44cc84eb16e','Dante','Alighieri',NULL,'1265-05-29','1321-09-14','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('d313f41b-b6c4-11f1-88b7-a44cc84eb16e','Georg Wilhelm Friedrich','Hegel',NULL,'1770-08-27','1831-12-14','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('d979d039-b6c4-11f1-88b7-a44cc84eb16e','Edmund','Husserl',NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('dd46f4c1-b6c4-11f1-88b7-a44cc84eb16e','Ray','Brassier',NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
/*!40000 ALTER TABLE `autorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiales_lectura`
--

DROP TABLE IF EXISTS `historiales_lectura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiales_lectura` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `idRegistro` char(36) NOT NULL,
  `paginaActual` int DEFAULT NULL,
  `idUsuario` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRegistro` (`idRegistro`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `historiales_lectura_ibfk_1` FOREIGN KEY (`idRegistro`) REFERENCES `registros` (`id`),
  CONSTRAINT `historiales_lectura_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiales_lectura`
--

LOCK TABLES `historiales_lectura` WRITE;
/*!40000 ALTER TABLE `historiales_lectura` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiales_lectura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios_actividades`
--

DROP TABLE IF EXISTS `horarios_actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios_actividades` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `idActividad` char(36) NOT NULL,
  `intSemana` int NOT NULL,
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `horarios_actividades_ibfk_1` (`idActividad`),
  CONSTRAINT `horarios_actividades_ibfk_1` FOREIGN KEY (`idActividad`) REFERENCES `actividades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios_actividades`
--

LOCK TABLES `horarios_actividades` WRITE;
/*!40000 ALTER TABLE `horarios_actividades` DISABLE KEYS */;
INSERT INTO `horarios_actividades` VALUES ('0ff0d0bf-29b3-4c88-893f-0b60a70c84ee','ef8b1034-ec73-44ab-befe-b83b8253b05a',5,'07:00:00','09:00:00'),('2191959b-ca81-46e4-b19b-6e29907a2169','ef8b1034-ec73-44ab-befe-b83b8253b05a',4,'07:00:00','09:00:00'),('4012ba01-bf5a-458e-982b-edc4f91b6bef','ee868c88-3d8c-46e2-bdf5-d529d6acb704',1,'09:00:00','10:00:00'),('4066cabb-1dbd-48e3-9240-3ba058743941','ee868c88-3d8c-46e2-bdf5-d529d6acb704',3,'09:00:00','10:00:00'),('423803ff-618e-4aee-a99c-c55e0950d11e','ee868c88-3d8c-46e2-bdf5-d529d6acb704',2,'09:00:00','10:00:00'),('56f3f9c6-470c-4aab-b5ce-b25e7efea33c','ee868c88-3d8c-46e2-bdf5-d529d6acb704',5,'09:00:00','10:00:00'),('678bde35-908c-4f6f-b781-3d0c762ed7fd','ee868c88-3d8c-46e2-bdf5-d529d6acb704',4,'09:00:00','10:00:00'),('6c29e487-3bed-4d0a-a136-806357e335ce','dbf63eb0-7efb-4457-8c51-cccdf75174c6',3,'17:00:00','20:00:00'),('8a20036b-7e4c-455e-8c4d-d096be511a09','ef8b1034-ec73-44ab-befe-b83b8253b05a',2,'07:00:00','09:00:00'),('b9658200-a1c7-45b4-b38b-6de5e29be2cb','ee868c88-3d8c-46e2-bdf5-d529d6acb704',4,'19:00:00','21:00:00'),('cfa51044-c762-46a4-a41e-7c1c133f7db8','ef8b1034-ec73-44ab-befe-b83b8253b05a',1,'07:00:00','09:00:00'),('d4c18c54-6c14-4b16-8490-ce824e02e210','dbf63eb0-7efb-4457-8c51-cccdf75174c6',4,'17:00:00','19:00:00'),('dce00cbb-56ef-4d96-aa4c-9c33f84453bb','ee868c88-3d8c-46e2-bdf5-d529d6acb704',2,'18:00:00','21:00:00'),('ee85dddc-b1f4-4ed1-934b-1f84d96ae6be','ef8b1034-ec73-44ab-befe-b83b8253b05a',3,'07:00:00','09:00:00');
/*!40000 ALTER TABLE `horarios_actividades` ENABLE KEYS */;
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
  `favorita` tinyint(1) NOT NULL DEFAULT '0',
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
INSERT INTO `listas` VALUES ('1854d195-c956-11f1-911a-a44cc84eb16e','notas congreso tierra','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e',0),('193812e9-b8d3-11f1-88b7-a44cc84eb16e','tesis','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e',1),('1f3d281b-b8d3-11f1-88b7-a44cc84eb16e','metafísica s. XX','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e',0),('27fd8ded-bb31-11f1-88b7-a44cc84eb16e','literatura clásica','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e',0),('c9fbfe18-bbfc-11f1-9212-a44cc84eb16e','literatura queer','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e',0),('f61a276b-c88b-11f1-911a-a44cc84eb16e','idealismos','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e',0);
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
INSERT INTO `registros` VALUES ('00628fb2-8bb1-43e2-a64b-0b74923a39e3','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Nietzsche et la Philosophie',NULL,'1962-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('10675b8f-fa63-4215-b40d-8467b5ab85c9','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Divina comedia',NULL,'1321-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('13a15963-55aa-4fc2-940d-0ba91a7093c9','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Manifeste pour la philosophie',NULL,'1989-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('17156748-8b5a-49fb-b538-2acf82ae136a','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Nihil Unbound','Enlightenment and Extinction','2007-01-01','2007-01-01','Palgrave Macmillan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('378120d0-c474-4869-8c1d-bbd09f155fb0','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Fenomenología del Espíritu',NULL,'1807-01-01',NULL,'Gredos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('3cccfce1-6805-4ffa-b40c-63bdc97781b1','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Ideas relativas a una fenomenología pura y una filosofía fenomenológica','Libro Primero: Introducción general a la fenomenología pura','1913-01-01',NULL,'FCE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('3f9c3687-6b34-4bcf-a4ec-41968632bca1','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Odisea',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('56fa8d12-b28d-4fd2-9f35-d23b6e2900fe','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Metamorfosis',NULL,'0008-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('7532994b-3fbc-42ab-ac11-35c64148a476','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Après la finitude','Essai sur la nécessité de la contingence','2006-01-01','2006-01-01','Éditions du Seuil','178',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('c97d5970-bc6f-4923-bd8e-eba1dc844458','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Ilíada',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('d3ae8bd4-7acb-4198-a834-65244d884764','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'L\'Être et l\'Événement',NULL,'1988-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('f95c58f3-f0f3-451c-b268-0fc661232ba9','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Realismo científico','Una introducción al debate actual en la filosofía de Ia ciencia','1998-01-01','1998-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('f9dc4b58-d1a1-4c2a-b648-71b37f81bcfb','3418897c-a25c-11f1-95ee-a44cc84eb16e',NULL,'Giovanni\'s Room',NULL,'1949-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
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
INSERT INTO `registros_autorias` VALUES ('016d5654-bbfc-11f1-9212-a44cc84eb16e','d3ae8bd4-7acb-4198-a834-65244d884764','c382a937-bbfb-11f1-9212-a44cc84eb16e'),('1ba3c4ca-b6c5-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','d979d039-b6c4-11f1-88b7-a44cc84eb16e'),('1c90fdbe-bb31-11f1-88b7-a44cc84eb16e','10675b8f-fa63-4215-b40d-8467b5ab85c9','c7b92e9c-bb2e-11f1-88b7-a44cc84eb16e'),('6b0b084e-c811-11f1-911a-a44cc84eb16e','7532994b-3fbc-42ab-ac11-35c64148a476','1b68f1ba-c811-11f1-911a-a44cc84eb16e'),('7e70d31d-c811-11f1-911a-a44cc84eb16e','378120d0-c474-4869-8c1d-bbd09f155fb0','d313f41b-b6c4-11f1-88b7-a44cc84eb16e'),('8bb3d540-bb30-11f1-88b7-a44cc84eb16e','56fa8d12-b28d-4fd2-9f35-d23b6e2900fe','67e94635-bb2f-11f1-88b7-a44cc84eb16e'),('96b52972-bb30-11f1-88b7-a44cc84eb16e','c97d5970-bc6f-4923-bd8e-eba1dc844458','99313011-bb2e-11f1-88b7-a44cc84eb16e'),('a57023ce-bb30-11f1-88b7-a44cc84eb16e','3f9c3687-6b34-4bcf-a4ec-41968632bca1','99313011-bb2e-11f1-88b7-a44cc84eb16e'),('be176f7b-b8d3-11f1-88b7-a44cc84eb16e','f95c58f3-f0f3-451c-b268-0fc661232ba9','69b0a0f4-b8d3-11f1-88b7-a44cc84eb16e'),('c1778cfb-c88a-11f1-911a-a44cc84eb16e','00628fb2-8bb1-43e2-a64b-0b74923a39e3','4e210a2f-c88a-11f1-911a-a44cc84eb16e'),('c23d184d-bbfc-11f1-9212-a44cc84eb16e','f9dc4b58-d1a1-4c2a-b648-71b37f81bcfb','b04a36a6-bbfc-11f1-9212-a44cc84eb16e'),('dcca4f5c-c813-11f1-911a-a44cc84eb16e','17156748-8b5a-49fb-b538-2acf82ae136a','dd46f4c1-b6c4-11f1-88b7-a44cc84eb16e'),('f1de57df-bbfb-11f1-9212-a44cc84eb16e','13a15963-55aa-4fc2-940d-0ba91a7093c9','c382a937-bbfb-11f1-9212-a44cc84eb16e');
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
INSERT INTO `registros_listas` VALUES ('0d573522-c88c-11f1-911a-a44cc84eb16e','00628fb2-8bb1-43e2-a64b-0b74923a39e3','1f3d281b-b8d3-11f1-88b7-a44cc84eb16e',0,'2026-10-15 08:32:06'),('1185afde-bbfc-11f1-9212-a44cc84eb16e','13a15963-55aa-4fc2-940d-0ba91a7093c9','193812e9-b8d3-11f1-88b7-a44cc84eb16e',1,'2026-09-29 08:51:12'),('1185ee20-bbfc-11f1-9212-a44cc84eb16e','d3ae8bd4-7acb-4198-a834-65244d884764','193812e9-b8d3-11f1-88b7-a44cc84eb16e',2,'2026-09-29 08:51:12'),('348634a4-bb31-11f1-88b7-a44cc84eb16e','c97d5970-bc6f-4923-bd8e-eba1dc844458','27fd8ded-bb31-11f1-88b7-a44cc84eb16e',2,'2026-09-28 08:39:03'),('3486571f-bb31-11f1-88b7-a44cc84eb16e','3f9c3687-6b34-4bcf-a4ec-41968632bca1','27fd8ded-bb31-11f1-88b7-a44cc84eb16e',0,'2026-09-28 08:39:03'),('34867ab5-bb31-11f1-88b7-a44cc84eb16e','56fa8d12-b28d-4fd2-9f35-d23b6e2900fe','27fd8ded-bb31-11f1-88b7-a44cc84eb16e',1,'2026-09-28 08:39:03'),('3486ae36-bb31-11f1-88b7-a44cc84eb16e','10675b8f-fa63-4215-b40d-8467b5ab85c9','27fd8ded-bb31-11f1-88b7-a44cc84eb16e',3,'2026-09-28 08:39:03'),('c8517a40-b8d3-11f1-88b7-a44cc84eb16e','f95c58f3-f0f3-451c-b268-0fc661232ba9','193812e9-b8d3-11f1-88b7-a44cc84eb16e',0,'2026-09-25 08:25:16'),('d09ae5a7-bbfc-11f1-9212-a44cc84eb16e','f9dc4b58-d1a1-4c2a-b648-71b37f81bcfb','c9fbfe18-bbfc-11f1-9212-a44cc84eb16e',0,'2026-09-29 08:56:33');
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
INSERT INTO `registros_temas` VALUES ('016e0e58-bbfc-11f1-9212-a44cc84eb16e','d3ae8bd4-7acb-4198-a834-65244d884764','86309a1b-b616-11f1-88b7-a44cc84eb16e'),('1ba48888-b6c5-11f1-88b7-a44cc84eb16e','3cccfce1-6805-4ffa-b40c-63bdc97781b1','78c6f648-b616-11f1-88b7-a44cc84eb16e'),('6b0bdb77-c811-11f1-911a-a44cc84eb16e','7532994b-3fbc-42ab-ac11-35c64148a476','86309a1b-b616-11f1-88b7-a44cc84eb16e'),('7e714d39-c811-11f1-911a-a44cc84eb16e','378120d0-c474-4869-8c1d-bbd09f155fb0','80ecf050-b616-11f1-88b7-a44cc84eb16e'),('8bb4a1ad-bb30-11f1-88b7-a44cc84eb16e','56fa8d12-b28d-4fd2-9f35-d23b6e2900fe','eeee52e4-bb2f-11f1-88b7-a44cc84eb16e'),('96b5fc59-bb30-11f1-88b7-a44cc84eb16e','c97d5970-bc6f-4923-bd8e-eba1dc844458','e12a5d5e-bb2f-11f1-88b7-a44cc84eb16e'),('96b69cce-bb30-11f1-88b7-a44cc84eb16e','c97d5970-bc6f-4923-bd8e-eba1dc844458','dc1f338d-bb2f-11f1-88b7-a44cc84eb16e'),('a570e083-bb30-11f1-88b7-a44cc84eb16e','3f9c3687-6b34-4bcf-a4ec-41968632bca1','e12a5d5e-bb2f-11f1-88b7-a44cc84eb16e'),('a571876f-bb30-11f1-88b7-a44cc84eb16e','3f9c3687-6b34-4bcf-a4ec-41968632bca1','dc1f338d-bb2f-11f1-88b7-a44cc84eb16e'),('be17ff44-b8d3-11f1-88b7-a44cc84eb16e','f95c58f3-f0f3-451c-b268-0fc661232ba9','b5c8dbe7-b8d3-11f1-88b7-a44cc84eb16e'),('c1782e7c-c88a-11f1-911a-a44cc84eb16e','00628fb2-8bb1-43e2-a64b-0b74923a39e3','a6ef6b80-c88a-11f1-911a-a44cc84eb16e'),('c23dc5a4-bbfc-11f1-9212-a44cc84eb16e','f9dc4b58-d1a1-4c2a-b648-71b37f81bcfb','8cce1d53-bbfc-11f1-9212-a44cc84eb16e'),('dccaf174-c813-11f1-911a-a44cc84eb16e','17156748-8b5a-49fb-b538-2acf82ae136a','86309a1b-b616-11f1-88b7-a44cc84eb16e'),('f1defd61-bbfb-11f1-9212-a44cc84eb16e','13a15963-55aa-4fc2-940d-0ba91a7093c9','86309a1b-b616-11f1-88b7-a44cc84eb16e');
/*!40000 ALTER TABLE `registros_temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selecciones_lectura`
--

DROP TABLE IF EXISTS `selecciones_lectura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selecciones_lectura` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `idHistorialLectura` char(36) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `primeraPagina` int DEFAULT NULL,
  `ultimaPagina` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idHistorialLectura` (`idHistorialLectura`),
  CONSTRAINT `selecciones_lectura_ibfk_1` FOREIGN KEY (`idHistorialLectura`) REFERENCES `historiales_lectura` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selecciones_lectura`
--

LOCK TABLES `selecciones_lectura` WRITE;
/*!40000 ALTER TABLE `selecciones_lectura` DISABLE KEYS */;
/*!40000 ALTER TABLE `selecciones_lectura` ENABLE KEYS */;
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
INSERT INTO `temas` VALUES ('78c6f648-b616-11f1-88b7-a44cc84eb16e','Fenomenología','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('80ecf050-b616-11f1-88b7-a44cc84eb16e','Filosofía moderna','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('86309a1b-b616-11f1-88b7-a44cc84eb16e','Realismo especulativo','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('8cce1d53-bbfc-11f1-9212-a44cc84eb16e','literatura queer','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('a6ef6b80-c88a-11f1-911a-a44cc84eb16e','Nietzsche','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('b5c8dbe7-b8d3-11f1-88b7-a44cc84eb16e','Realismo científico','Tradición analítica','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('dc1f338d-bb2f-11f1-88b7-a44cc84eb16e','Literatura griega','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('e12a5d5e-bb2f-11f1-88b7-a44cc84eb16e','épica griega','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e'),('eeee52e4-bb2f-11f1-88b7-a44cc84eb16e','Literatura romana','','a775b9f9-9d85-11f1-bffe-a44cc84eb16e');
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
INSERT INTO `tipos_registros` VALUES ('3418897c-a25c-11f1-95ee-a44cc84eb16e','Libros',NULL,NULL),('3418a9c7-a25c-11f1-95ee-a44cc84eb16e','Papers',NULL,NULL);
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

-- Dump completed on 2026-10-21 12:22:02
