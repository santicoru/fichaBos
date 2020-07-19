-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: hab
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `worksheet`
--

DROP TABLE IF EXISTS `worksheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worksheet` (
  `workSheetId` int NOT NULL AUTO_INCREMENT,
  `workPlace` varchar(256) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `workDate` varchar(20) DEFAULT NULL,
  `timeIn` varchar(10) DEFAULT NULL,
  `timeOut` varchar(10) DEFAULT NULL,
  `WorksheetState` int DEFAULT NULL,
  `observations` text,
  PRIMARY KEY (`workSheetId`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `workDate` (`workDate`),
  CONSTRAINT `worksheet_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userbos` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worksheet`
--

LOCK TABLES `worksheet` WRITE;
/*!40000 ALTER TABLE `worksheet` DISABLE KEYS */;
INSERT INTO `worksheet` VALUES (1,'campamento',NULL,'01-01-2020','15:00','16:00',NULL,'todo bien'),(2,'HaB',NULL,'2020-12-01','09:10','10:10',NULL,'Buenos días Landeira!');
/*!40000 ALTER TABLE `worksheet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-19 14:14:36
