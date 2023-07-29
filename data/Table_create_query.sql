USE test;
DROP TABLE  if EXISTS bookmark cascade;
DROP TABLE  if EXISTS `Profile` cascade;
DROP TABLE  if EXISTS notice cascade;
DROP TABLE  if EXISTS sheltermember cascade;
DROP TABLE  if exists generalmember cascade;
DROP TABLE  if EXISTS donation cascade;
DROP TABLE  if EXISTS donationboard cascade;
DROP TABLE  if EXISTS chatmessage cascade;
DROP TABLE  if EXISTS chatroom cascade;
DROP TABLE  if EXISTS adoptionform cascade;
DROP TABLE  if EXISTS meeting cascade;
DROP TABLE  if exists Animal cascade;
DROP TABLE  if EXISTS `MEMBER` cascade;

CREATE TABLE `Member` (
	`memberNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`email`	VARCHAR(50)	NOT null,
	`password`	varchar(255) NOT null,
	`memberKind`	int	DEFAULT 0  COMMENT '0 : 일반회원 1 : 보호소 회원 2 : 관리자 모드',
	`phone`	varchar(15)	not NULL,
	`name`	VARCHAR(50)	not NULL,
    `DTYPE` varchar(31) 
)
COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블'
COLLATE='utf8mb4_bin'
;


CREATE TABLE `Animal` (
	`desertionNo`	Int	NOT NULL PRIMARY key,
	`shelterNo`	Int	NOT NULL,
	`findDate`	Date	not NULL,
	`findPlace`	varchar(255) not NULL, 
	`kind`	varchar(64)	not NULL,
	`color`	varchar(32)	not NULL,
	`sexcd`  CHAR(1) not NULL DEFAULT 'Q' COMMENT 'F : 암컷 M : 수컷 Q : 미상',
	`age`	INT NOT NULL DEFAULT 1,
	`weight`	INT DEFAULT 1,
	`specialMark`	varchar(255)	NULL,
	`neutral`	CHAR(1)	NULL COMMENT 'Y: 예 N : 아니오 U : 미상 ',
	`noticeNo`	varchar(255)	NULL,
	`noticeSdate`	DATE not	NULL,
	`noticeEdate`	DATE NOT NULL,
	`image1`	varchar(255)	NULL,
	`image2`	varchar(255)	NULL,
	`lat`	float	not NULL,
	`lon`	float	not NULL
)
COMMENT='보호소 회원이 보호 및 공고 중인 유기동물 데이터 테이블'
COLLATE='utf8mb4_bin'
;

CREATE TABLE `ShelterMember` (
	`shelterNo`	Int	NOT NULL PRIMARY KEY,
	`addr`	VARCHAR(255)	NULL,
	`evidence`	VARCHAR(255)	NULL
)
COMMENT='보호소 회원 세부 정보'
COLLATE='UTF8MB4_BIN'
;

CREATE TABLE `GeneralMember` (
	`generalNo`	Int	NOT NULL PRIMARY key,
	`snsCheck`	TINYINT	NULL,
	`snsToken`	varChar(255)	NULL
)
COMMENT='일반 회원 세부 정보'
COLLATE='utf8mb4_bin'
;

CREATE TABLE `ChatRoom` (
	`roomNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY key,
	`generalNo`	Int	NOT NULL,
	`shelterNo`	Int not NULL
)
COMMENT='채팅방 목록 조회 및 채팅방 대상자는 확인 가능한 테이블'
COLLATE='utf8mb4_bin'
;

CREATE TABLE `ChatMessage` (
	`chatNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY key,
	`roomNo`	Int	NOT NULL,
	`content`	varchar(255)	NULL,
	`type`	Int	NULL,
	`sendNo`	Int	NULL,
	`writtenTime`	datetime	NULL,
	`isRead`	tinyint	NULL
)
COMMENT='채팅메세지 관련 테이블'
COLLATE='utf8mb4_bin'
;
CREATE TABLE `Notice` (
	`noticeNo`	Int	NOT NULL auto_increment PRIMARY key ,
	`generalNo`	Int	NOT NULL,
	`noticeKind`	Int	NULL COMMENT '0 : 채팅 1 : 미팅 2: 실종',
	`noticeTime`	DateTime	NULL,
	`noticeContent`	varchar(255)	NULL,
	`noticeCheck` TINYINT NOT NULL DEFAULT 0
)
COMMENT='알람테이블'
COLLATE='utf8mb4_bin'
;
CREATE TABLE `Bookmark` (
	`bookmarkNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY key,
	`desertionNo`	Int	NOT NULL,
	`generalNo`	Int	NOT NULL
)
COMMENT='입양동물 목록 즐겨찾기'
COLLATE='utf8mb4_bin'
;
CREATE TABLE `DonationBoard` (
	`boardNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY key,
	`shelterNo`	Int	NOT NULL,
	`image1` VARCHAR(255) NOT NULL COMMENT "썸네일용 이미지로 필수",
	`title`	varchar(100)	NULL,
	`goalAmount`	Int	NULL,
	`attainAmount`	Int	NULL,
	`startAt`	datetime	NULL,
	`endAt`	datetime	NULL,
	`deleteAt`	datetime	NULL,
	`poster`	varchar(255)	NULL
)
COMMENT='후원 공고 목록 또는 후원 공고 세부 정보 조회 시 사용하는 테이블 '
COLLATE='utf8mb4_bin'
;
CREATE TABLE `Donation` (
	`donationNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY key,
	`boardNo`	Int	NOT NULL,
	`generalNo`	Int	NOT NULL,
	`donateAmount`	Int	NULL,
	`donateDate`	datetime	NULL
)
COMMENT='일반 회원의 후원 내역에 대한 조회'
COLLATE='utf8mb4_bin'
;
CREATE TABLE `Profile` (
	`profileNo`	Int	NOT NULL auto_increment PRIMARY key,
	`generalNo`	Int	NOT NULL,
	`profileName`	varchar(255) NOT	NULL,
	`profileKind`	TINYINT NOT	NULL ,
	`detailKind`	varchar(255) NOT	NULL,
	`sexCode`	CHAR(1) NOT null DEFAULT 'Q' COMMENT 'F : 암컷 M : 수컷 Q : 미상',
	`profileAge`	INT DEFAULT 1,
	`specialMark`	varchar(255)	NULL,
	`dateAt`	date	NULL,
	`profileLocation`	varchar(255) NULL,
	`lat`	float not	NULL,
	`lon`	float not	NULL,
	`image`	varchar(255)	NULL
)
COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블'
COLLATE='utf8mb4_bin'
;
CREATE TABLE `Meeting` (
	`meetNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`generalNo`	Int	NOT NULL,
	`desertionNo`	Int	NOT NULL,
	`reservedDate`	datetime	NULL,
	`status`	Int	NULL DEFAULT 0 COMMENT '0 : 대기 1 : 승인 2 : 거절 ',
	`url`	varchar(255)	NULL,
	`reason`	varchar(255)	NULL
)
COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블'
COLLATE='utf8mb4_bin'
;
CREATE TABLE `AdoptionForm` (
	`formNo`	Int	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`generalNo`	Int	NOT NULL,
	`desertionNo`	Int	NOT NULL,
	`image`	varchar(255)	NULL
)
COMMENT='보호소 회원, 비회원의 공통된 회원 정보 저장을 위한 테이블'
COLLATE='utf8mb4_bin'
;




ALTER TABLE `Animal` ADD CONSTRAINT `FK_Member_TO_Animal_shelterNo` FOREIGN KEY (
	`shelterNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `ShelterMember` ADD CONSTRAINT `FK_Member_TO_ShelterMember` FOREIGN KEY (
	`shelterNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `GeneralMember` ADD CONSTRAINT `FK_Member_TO_GeneralMember` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `ChatRoom` ADD CONSTRAINT `FK_Member_TO_ChatRoom_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `ChatRoom` ADD CONSTRAINT `FK_Member_TO_ChatRoom_shelterNo` FOREIGN KEY (
	`shelterNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `ChatMessage` ADD CONSTRAINT `FK_ChatRoom_TO_ChatMessage_roomNo` FOREIGN KEY (
	`roomNo`
)
REFERENCES `ChatRoom` (
	`roomNo`
)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `ChatMessage` ADD CONSTRAINT `FK_ChatRoom_TO_Member_sendNo` FOREIGN KEY (
	`sendNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE CASCADE;


ALTER TABLE `Notice` ADD CONSTRAINT `FK_Member_TO_Notice` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `Bookmark` ADD CONSTRAINT `FK_Animal_TO_Bookmark_desertionNo` FOREIGN KEY (
	`desertionNo`
)
REFERENCES `Animal` (
	`desertionNo`
)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `Bookmark` ADD CONSTRAINT `FK_Animal_TO_Bookmark_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `DonationBoard` ADD CONSTRAINT `FK_Animal_TO_DonationBoard_ShelterNo` FOREIGN KEY (
	`shelterNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `Donation` ADD CONSTRAINT `FK_DonationBoard_TO_Donation_boardNo` FOREIGN KEY (
	`boardNo`
)
REFERENCES `DonationBoard` (
	`boardNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `Donation` ADD CONSTRAINT `FK_Member_TO_Donation_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `Profile` ADD CONSTRAINT `FK_Member_TO_Profile_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `Meeting` ADD CONSTRAINT `FK_Member_TO_Meeting_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `Meeting` ADD CONSTRAINT `FK_Animal_TO_Meeting_desertionNo` FOREIGN KEY (
	`desertionNo`
)
REFERENCES `Animal` (
	`desertionNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `AdoptionForm` ADD CONSTRAINT `FK_Member_TO_AdoptionForm_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;

ALTER TABLE `AdoptionForm` ADD CONSTRAINT `FK_Animal_TO_AdoptionForm_generalNo` FOREIGN KEY (
	`generalNo`
)
REFERENCES `Member` (
	`memberNo`
)
ON DELETE CASCADE
ON UPDATE cascade;
