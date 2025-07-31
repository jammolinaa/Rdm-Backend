-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rdm
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alerts`
--

DROP TABLE IF EXISTS `alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerts` (
  `alerts_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `value` float NOT NULL,
  `unit_time` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `days` varchar(255) NOT NULL,
  `hour_start` varchar(255) NOT NULL,
  `hour_finish` varchar(255) NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 1,
  `device_id` int(11) DEFAULT NULL,
  `condition_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`alerts_id`),
  KEY `FK_bde35b32d03b804b0944331ac85` (`device_id`),
  KEY `FK_e6e4c601b3f4426a0115ed361fb` (`condition_id`),
  CONSTRAINT `FK_bde35b32d03b804b0944331ac85` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e6e4c601b3f4426a0115ed361fb` FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`condition_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerts`
--

/*!40000 ALTER TABLE `alerts` DISABLE KEYS */;
INSERT INTO `alerts` VALUES (1,'Alert 1','Se activa cuando la temperatura del dispositivo supera el umbral establecido.',75.5,'minutos','30',3,'Lunes,Miércoles,Viernes','08:00','18:00',1,2,4),(2,'Alerta da Alta','Se activa cuando la temperatura del dispositivo supera el umbral establecido.',75.5,'minutos','30',3,'Lunes,Miércoles,Viernes','08:00','18:00',1,NULL,NULL),(8,'Alert','Se activa cuando la temperatura del dispositivo supera el umbral establecido.',75.5,'minutos','30',3,'Lunes,Miércoles,Viernes','08:00','18:00',1,NULL,NULL),(9,'Alert','Se activa cuando la temperatura del dispositivo supera el umbral establecido.',75.5,'minutos','30',3,'Lunes,Miércoles,Viernes','08:00','18:00',1,NULL,NULL),(15,'Alert 1','Se activa cuando la temperatura del dispositivo supera el umbral establecido.',75.5,'minutos','30',3,'Lunes,Miércoles,Viernes','08:00','18:00',1,2,4);
/*!40000 ALTER TABLE `alerts` ENABLE KEYS */;

--
-- Table structure for table `class_device`
--

DROP TABLE IF EXISTS `class_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_device` (
  `class_device_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`class_device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_device`
--

/*!40000 ALTER TABLE `class_device` DISABLE KEYS */;
INSERT INTO `class_device` VALUES (1,'hoola');
/*!40000 ALTER TABLE `class_device` ENABLE KEYS */;

--
-- Table structure for table `conditions`
--

DROP TABLE IF EXISTS `conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conditions` (
  `condition_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`condition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conditions`
--

/*!40000 ALTER TABLE `conditions` DISABLE KEYS */;
INSERT INTO `conditions` VALUES (3,'Jam','Nets js is very Easyy bro'),(4,'Jam M','Nets js sds');
/*!40000 ALTER TABLE `conditions` ENABLE KEYS */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `device_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sources_id` int(11) NOT NULL,
  `system_device_id` int(11) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `communication_route` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`communication_route`)),
  `event` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`event`)),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`device_id`),
  KEY `FK_a698bba119474520cc97aca9080` (`sources_id`),
  KEY `FK_5776c32dbd2061074349dbcbe3c` (`system_device_id`),
  CONSTRAINT `FK_5776c32dbd2061074349dbcbe3c` FOREIGN KEY (`system_device_id`) REFERENCES `system_device` (`system_device_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a698bba119474520cc97aca9080` FOREIGN KEY (`sources_id`) REFERENCES `source` (`sources_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'Aire',1,1,1,'2025-06-13 13:11:16.582223','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',1),(2,'Aire',1,1,1,'2025-06-13 13:17:32.766577','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',1),(3,'Aire',1,1,1,'2025-06-13 13:17:36.691977','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',1),(6,'Oficina 2',3,1,1,'2025-06-14 14:55:53.204982','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',2),(7,'Oficina 2',3,1,1,'2025-06-14 18:14:21.548207','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',2),(8,'Oficina 2',3,1,1,'2025-06-14 18:17:47.561103','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',2),(9,'Oficina 2',2,2,1,'2025-06-14 18:18:04.406641','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',2),(10,'Oficina 2',2,2,1,'2025-06-14 18:21:26.924145','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',2),(11,'Oficina 2',2,2,1,'2025-06-14 18:26:15.683081','{\"accion\":\"1/0/1\",\"state\":\"1/0/1\",\"topic on\":\" broadlink/RM4MINI_54_34_b0/AACC/KNX/ON\"}','{\"om\":0,\"off\":1,\"coms\":\"replay\"}',2);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `schedules_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `days` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`days`)),
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`value`)),
  `state` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `update_time` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `device_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`schedules_id`),
  KEY `FK_249663b434d4a5303673c34edaa` (`device_id`),
  CONSTRAINT `FK_249663b434d4a5303673c34edaa` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,'Horario de semanal','Este horario define las tareas de mantenimiento programadas para los días lunes y jueves.','{\"dayofmonth\":{\"date\":12,\"month\":5,\"year\":2025,\"dayofweek\":\"jueves\",\"time\":\"00:00\"}}','{\"x\":\"x\",\"y\":\"y\"}',1,'2025-06-13 08:10:23.529846','2025-06-14 09:28:45.000000',2),(2,'Horario de mantenimiento semanal','Este horario define las tareas de mantenimiento programadas para los días lunes y jueves.','{\"dayofmonth\":{\"date\":12,\"month\":5,\"year\":2025,\"dayofweek\":\"jueves\",\"time\":\"00:00\"}}','{\"x\":\"x\",\"y\":\"y\"}',1,'2025-06-13 08:11:43.169347','2025-06-13 08:11:43.169347',NULL),(3,'Horario de mantenimiento semanal','Este horario define las tareas de mantenimiento programadas para los días lunes y jueves.','{\"dayofmonth\":{\"date\":12,\"month\":5,\"year\":2025,\"dayofweek\":\"jueves\",\"time\":\"00:00\"}}','{\"x\":\"x\",\"y\":\"y\"}',1,'2025-06-13 08:18:46.721901','2025-06-13 08:18:46.721901',NULL),(4,'Horario de mantenimiento semanal','Este horario define las tareas de mantenimiento programadas para los días lunes y jueves.','{\"dayofmonth\":{\"date\":12,\"month\":5,\"year\":2025,\"dayofweek\":\"jueves\",\"time\":\"00:00\"}}','{\"x\":\"x\",\"y\":\"y\"}',1,'2025-06-13 08:19:19.607397','2025-06-13 08:51:25.000000',1),(5,'Horario semanal','Este horario define las tareas de mantenimiento programadas para los días lunes y jueves.','{\"dayofmonth\":{\"date\":12,\"month\":5,\"year\":2025,\"dayofweek\":\"jueves\",\"time\":\"00:00\"}}','{\"x\":\"x\",\"y\":\"y\"}',1,'2025-06-13 08:36:55.811986','2025-06-14 09:46:04.000000',3);
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;

--
-- Table structure for table `source`
--

DROP TABLE IF EXISTS `source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `source` (
  `sources_id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sources_id`),
  KEY `FK_3289e36bf5d4626e950e2185a25` (`type_id`),
  CONSTRAINT `FK_3289e36bf5d4626e950e2185a25` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `source`
--

/*!40000 ALTER TABLE `source` DISABLE KEYS */;
INSERT INTO `source` VALUES (0,2),(2,2),(3,2),(1,3);
/*!40000 ALTER TABLE `source` ENABLE KEYS */;

--
-- Table structure for table `system`
--

DROP TABLE IF EXISTS `system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system` (
  `system_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system`
--

/*!40000 ALTER TABLE `system` DISABLE KEYS */;
INSERT INTO `system` VALUES (1,'hola 1'),(3,'hola 2'),(5,'hola 5');
/*!40000 ALTER TABLE `system` ENABLE KEYS */;

--
-- Table structure for table `system_device`
--

DROP TABLE IF EXISTS `system_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_device` (
  `system_device_id` int(11) NOT NULL AUTO_INCREMENT,
  `propierty` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`propierty`)),
  `class_device_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `system_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`system_device_id`),
  KEY `FK_990e15a625367cce530d7062a3a` (`class_device_id`),
  KEY `FK_44cff5fa3d91e809731bb5b076c` (`type_id`),
  KEY `FK_9b738fb1a96313ab98d27411590` (`system_id`),
  CONSTRAINT `FK_44cff5fa3d91e809731bb5b076c` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_990e15a625367cce530d7062a3a` FOREIGN KEY (`class_device_id`) REFERENCES `class_device` (`class_device_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_9b738fb1a96313ab98d27411590` FOREIGN KEY (`system_id`) REFERENCES `system` (`system_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_device`
--

/*!40000 ALTER TABLE `system_device` DISABLE KEYS */;
INSERT INTO `system_device` VALUES (1,'{\"accionamiento\":\"multiplicador\",\"estado accionamiento\":\"dpt\"}',1,1,1),(2,'{\"accionamiento\":\"multiplicador\",\"estado accionamiento\":\"dpt\"}',1,3,5),(10,'{\"accionamiento\":\"multiplicador\",\"estado accionamiento\":\"dpt\"}',1,2,5),(12,'{\"accionamiento\":\"multiplicador\",\"estado accionamiento\":\"dpt\"}',1,3,5),(16,'{\"accionamiento\":\"multiplicador\",\"estado accionamiento\":\"dpt\"}',1,3,3);
/*!40000 ALTER TABLE `system_device` ENABLE KEYS */;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'KNX'),(2,'MQTT'),(3,'MODBUS 9'),(7,'MODBUS 12');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;

--
-- Dumping routines for database 'rdm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25 16:18:03
