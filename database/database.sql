drop database if exists BOARDGAME;
create database BOARDGAME;
use BOARDGAME;
-- ============================================================
--   Tables
-- ============================================================
-- PERSON
create table PERSON (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) not null,
    LASTNAME VARCHAR(100) not null,
    MAIL VARCHAR(100)
);

-- PLAYER
create table PLAYER (
    ID INT PRIMARY KEY,
    PSEUDO VARCHAR(40) not null unique,
    CONSTRAINT fk_id
                    FOREIGN KEY (ID)
                    REFERENCES PERSON(ID)
);

-- GAME
create table GAME (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(40) not null unique,
    NB_PLAYER INT not null,
    DURATION INT not null

)