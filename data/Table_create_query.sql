-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `adoptionform`
--

DROP TABLE IF EXISTS `adoptionform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoptionform` (
  `formNo` int NOT NULL AUTO_INCREMENT,
  `meetNo` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`formNo`),
  KEY `FK_Meeting_TO_AdoptionForm_meetNo` (`meetNo`),
  CONSTRAINT `FK_Meeting_TO_AdoptionForm_meetNo` FOREIGN KEY (`meetNo`) REFERENCES `meeting` (`meetNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `desertionNo` bigint NOT NULL,
  `shelterNo` int NOT NULL,
  `findDate` date NOT NULL,
  `findPlace` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `kind` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `color` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `sexcd` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Q' COMMENT 'F : 암컷 M : 수컷 Q : 미상',
  `age` int NOT NULL DEFAULT '1',
  `weight` float DEFAULT '1',
  `specialMark` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `neutral` char(1) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Y: 예 N : 아니오 U : 미상 ',
  `noticeNo` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `noticeSdate` date NOT NULL,
  `noticeEdate` date NOT NULL,
  `image1` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `image2` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `processState` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  PRIMARY KEY (`desertionNo`),
  KEY `FK_Member_TO_Animal_shelterNo` (`shelterNo`),
  CONSTRAINT `FK_Member_TO_Animal_shelterNo` FOREIGN KEY (`shelterNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='보호소 회원이 보호 및 공고 중인 유기동물 데이터 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `bookmarkNo` int NOT NULL AUTO_INCREMENT,
  `desertionNo` bigint NOT NULL,
  `generalNo` int NOT NULL,
  PRIMARY KEY (`bookmarkNo`),
  KEY `FK_Animal_TO_Bookmark_desertionNo` (`desertionNo`),
  KEY `FK_Animal_TO_Bookmark_generalNo` (`generalNo`),
  CONSTRAINT `FK_Animal_TO_Bookmark_desertionNo` FOREIGN KEY (`desertionNo`) REFERENCES `animal` (`desertionNo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Animal_TO_Bookmark_generalNo` FOREIGN KEY (`generalNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='입양동물 목록 즐겨찾기';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chatmessage`
--

DROP TABLE IF EXISTS `chatmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatmessage` (
  `chatNo` int NOT NULL AUTO_INCREMENT,
  `roomNo` int NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `type` int DEFAULT NULL,
  `sendNo` int DEFAULT NULL,
  `writtenTime` datetime DEFAULT NULL,
  `isRead` tinyint DEFAULT NULL,
  PRIMARY KEY (`chatNo`),
  KEY `FK_ChatRoom_TO_ChatMessage_roomNo` (`roomNo`),
  KEY `FK_ChatRoom_TO_Member_sendNo` (`sendNo`),
  CONSTRAINT `FK_ChatRoom_TO_ChatMessage_roomNo` FOREIGN KEY (`roomNo`) REFERENCES `chatroom` (`roomNo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ChatRoom_TO_Member_sendNo` FOREIGN KEY (`sendNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='채팅메세지 관련 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `roomNo` int NOT NULL AUTO_INCREMENT,
  `generalNo` int NOT NULL,
  `shelterNo` int NOT NULL,
  PRIMARY KEY (`roomNo`),
  KEY `FK_Member_TO_ChatRoom_generalNo` (`generalNo`),
  KEY `FK_Member_TO_ChatRoom_shelterNo` (`shelterNo`),
  CONSTRAINT `FK_Member_TO_ChatRoom_generalNo` FOREIGN KEY (`generalNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Member_TO_ChatRoom_shelterNo` FOREIGN KEY (`shelterNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='채팅방 목록 조회 및 채팅방 대상자는 확인 가능한 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donationNo` int NOT NULL AUTO_INCREMENT,
  `boardNo` int NOT NULL,
  `generalNo` int NOT NULL,
  `donateAmount` int DEFAULT NULL,
  `donateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`donationNo`),
  KEY `FK_DonationBoard_TO_Donation_boardNo` (`boardNo`),
  KEY `FK_Member_TO_Donation_generalNo` (`generalNo`),
  CONSTRAINT `FK_DonationBoard_TO_Donation_boardNo` FOREIGN KEY (`boardNo`) REFERENCES `donationboard` (`boardNo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Member_TO_Donation_generalNo` FOREIGN KEY (`generalNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='일반 회원의 후원 내역에 대한 조회';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donationboard`
--

DROP TABLE IF EXISTS `donationboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donationboard` (
  `boardNo` int NOT NULL AUTO_INCREMENT,
  `shelterNo` int NOT NULL,
  `image1` varchar(255) COLLATE utf8mb4_bin NOT NULL COMMENT '썸네일용 이미지로 필수',
  `title` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `goalAmount` int DEFAULT NULL,
  `attainAmount` int DEFAULT NULL,
  `startAt` date DEFAULT NULL,
  `endAt` date DEFAULT NULL,
  `deleteAt` date DEFAULT NULL,
  `poster` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`boardNo`),
  KEY `FK_Animal_TO_DonationBoard_ShelterNo` (`shelterNo`),
  CONSTRAINT `FK_Animal_TO_DonationBoard_ShelterNo` FOREIGN KEY (`shelterNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='후원 공고 목록 또는 후원 공고 세부 정보 조회 시 사용하는 테이블 ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `generalmember`
--

DROP TABLE IF EXISTS `generalmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generalmember` (
  `generalNo` int NOT NULL,
  `snsCheck` tinyint DEFAULT NULL,
  `snsToken` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`generalNo`),
  CONSTRAINT `FK_Member_TO_GeneralMember` FOREIGN KEY (`generalNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='일반 회원 세부 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `meetNo` int NOT NULL AUTO_INCREMENT,
  `generalNo` int NOT NULL,
  `desertionNo` bigint NOT NULL,
  `reservedDate` datetime DEFAULT NULL,
  `status` int DEFAULT '0' COMMENT '0 : 대기 1 : 승인 2 : 거절 ',
  `url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`meetNo`),
  KEY `FK_Member_TO_Meeting_generalNo` (`generalNo`),
  KEY `FK_Animal_TO_Meeting_desertionNo` (`desertionNo`),
  CONSTRAINT `FK_Animal_TO_Meeting_desertionNo` FOREIGN KEY (`desertionNo`) REFERENCES `animal` (`desertionNo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Member_TO_Meeting_generalNo` FOREIGN KEY (`generalNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberNo` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `memberKind` int DEFAULT '0' COMMENT '0 : 일반회원 1 : 보호소 회원 2 : 관리자 모드',
  `phone` varchar(15) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `DTYPE` varchar(31) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 's: 보호소 g: 일반 회원',
  PRIMARY KEY (`memberNo`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `noticeNo` int NOT NULL AUTO_INCREMENT,
  `memberNo` int NOT NULL,
  `noticeKind` int DEFAULT NULL COMMENT '0 : 채팅 1 : 미팅 2: 실종',
  `noticeTime` datetime DEFAULT NULL,
  `noticeContent` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `noticeCheck` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`noticeNo`),
  KEY `FK_Member_TO_Notice` (`memberNo`),
  CONSTRAINT `FK_Member_TO_Notice` FOREIGN KEY (`memberNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='알람테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profileNo` int NOT NULL AUTO_INCREMENT,
  `generalNo` int NOT NULL,
  `profileName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `profileKind` tinyint NOT NULL,
  `detailKind` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `sexCode` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT 'Q' COMMENT 'F : 암컷 M : 수컷 Q : 미상',
  `profileAge` int DEFAULT '1',
  `specialMark` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `dateAt` date DEFAULT NULL,
  `weight` float NOT NULL,
  `profileLocation` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`profileNo`),
  KEY `FK_Member_TO_Profile_generalNo` (`generalNo`),
  CONSTRAINT `FK_Member_TO_Profile_generalNo` FOREIGN KEY (`generalNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sheltermember`
--

DROP TABLE IF EXISTS `sheltermember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sheltermember` (
  `shelterNo` int NOT NULL,
  `addr` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `evidence` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`shelterNo`),
  CONSTRAINT `FK_Member_TO_ShelterMember` FOREIGN KEY (`shelterNo`) REFERENCES `member` (`memberNo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='보호소 회원 세부 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `visualizermap`
--

DROP TABLE IF EXISTS `visualizermap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visualizermap` (
  `mapcd` int NOT NULL,
  `mapname` varchar(50) NOT NULL,
  `entrynumber` int DEFAULT '0',
  PRIMARY KEY (`mapcd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='시각화 관련 데이터';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-11 15:38:37
