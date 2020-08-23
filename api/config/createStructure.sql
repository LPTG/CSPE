-- Conect as adm_cspe before running script
USE mark;

DROP TABLE IF EXISTS timelog;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS examContent;
DROP TABLE IF EXISTS exams;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS instructions;


CREATE TABLE categories (
	name			varchar(50),
	PRIMARY KEY (name)
);

CREATE TABLE questions (
	questionID		integer NOT NULL AUTO_INCREMENT,
	parentQuestion  integer,
	stem			varchar(2048) NOT NULL,
	figure			blob,
	choiceA			varchar(160) NOT NULL,
	choiceB			varchar(160) NOT NULL,
	choiceC			varchar(160),
	choiceD			varchar(160),
	choiceE			varchar(160),
	answer			varchar(1) NOT NULL,
	category		varchar(50),
	versioned		tinyint(1) DEFAULT 0,
	PRIMARY KEY (questionID),
    FOREIGN KEY (category) REFERENCES categories(name) ON UPDATE CASCADE
);

CREATE TABLE users (
	id				varchar(8) NOT NULL,
	firstName		varchar(50),
	lastName		varchar(50),
	uploadDate		date,
	examID			integer,
	examDate		date,
	examTimeLimit   integer DEFAULT 60,
	examStartTime   datetime,
	examEndTime		datetime,
	examScore		float,
	isAdmin			tinyint(1) DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE exams (
	examID				integer NOT NULL AUTO_INCREMENT,
	examName			varchar(50) NOT NULL,
	examGroup       	varchar(50) NOT NULL,
	dateCreated			date,
	author				varchar(8) NOT NULL,
	current				tinyint(1) DEFAULT 0,
	passFailPct			float DEFAULT .70,
	PRIMARY KEY (examID),
	FOREIGN KEY (author) REFERENCES users(id)
);

CREATE TABLE examContent (
	examID		integer NOT NULL,
	questionID	integer NOT NULL,
	PRIMARY KEY (examID, questionID),
	FOREIGN KEY (examID) REFERENCES exams(examID),
	FOREIGN KEY (questionID) REFERENCES questions(questionID)
);

CREATE TABLE results (
	id			varchar(8) NOT NULL,
	examID		integer NOT NULL,
	questionID  integer NOT NULL,
	answered	varchar(1),
	correctAnswer	varchar(1),
	seconds     integer default 0,
	PRIMARY KEY (id, examID, questionID),
	FOREIGN KEY (id) REFERENCES users(id),
	FOREIGN KEY (examID) REFERENCES exams(examID),
	FOREIGN KEY (questionID) REFERENCES questions(questionID)
);

CREATE TABLE timelog (
	timeID		integer NOT NULL AUTO_INCREMENT,
	id			varchar(8) NOT NULL,
	examID		integer NOT NULL,
	questionID	integer NOT NULL,
	actionWord	varchar(20) NOT NULL,
	actionTime	datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (timeID),
	FOREIGN KEY (id) REFERENCES users(id),
	FOREIGN KEY (examID) REFERENCES exams(examID),
	FOREIGN KEY (questionID) REFERENCES questions(questionID)
);

CREATE TABLE instructions (
	instructions  varchar(12288)
);

DELIMITER $$

CREATE TRIGGER getanswer BEFORE INSERT ON results
FOR EACH ROW 
BEGIN
  SET @var = NULL;
  SELECT answer INTO @var FROM questions WHERE questionID = NEW.questionID;
  SET NEW.correctAnswer = @var;  
END $$

CREATE TRIGGER userUploadDate BEFORE INSERT ON users
FOR EACH ROW 
BEGIN
  IF (NEW.uploadDate IS NULL) THEN
  	SET NEW.uploadDate = CURDATE();
  END IF;  
END $$

CREATE TRIGGER examsCreateDate BEFORE INSERT ON exams
FOR EACH ROW 
BEGIN
  IF (NEW.dateCreated IS NULL) THEN
  	SET NEW.dateCreated = CURDATE();
  END IF;  
END $$

DELIMITER ;

