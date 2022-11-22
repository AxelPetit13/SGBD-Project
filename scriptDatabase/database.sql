drop database if exists BOARDGAME;
create database BOARDGAME;
use BOARDGAME;
-- ============================================================
--   Tables
-- ============================================================
--                    PEOPLE
create table PEOPLE (
    ID INT not null,
    NAME VARCHAR(20) not null,
    FIRSTNAME VARCHAR(20) not null,
    MAIL VARCHAR(100) not null,
    constraint pk_people primary key (ID)
);
--                       GAME
create table GAME (
    ID INT not null,
    NAME VARCHAR(100) not null,
    DATE DATE not null,
    TYPE VARCHAR(20) not null,
    DURATION INT not null,
    NUMBER INT not null,
    AUTHOR INT not null,
    ILLUSTRATOR INT not null,
    EDITOR INT not null,
    THEME_ID INT not null,
    CATEGORY_ID INT not null,
    EXTENSION_OF INT,
    constraint pk_game primary key (ID)
);
--                      PLAYER
create table PLAYER (
    ID INT not null,
    PSEUDO VARCHAR(20) not null,
    THEME_ID INT not null,
    CATEGORY_ID INT not null,
    OPINION_ID INT not null,
    constraint pk_player primary key (ID)
);
--                  OPINION
create table OPINION (
    ID INT not null,
    GRADE INT not null,
    COMMENT VARCHAR(1000) not null,
    DATE DATE not null,
    PLAYER_ID INT not null,
    GAME_ID INT not null,
    CONFIG_ID INT not null,
    constraint pk_opinion primary key (ID)
);
--                  PERTINENT   
create table PERTINENT (
    PLAYER_PSEUDO VARCHAR(20) not null,
    OPINION_ID INT not null,
    PERTINENT_GRADE INT not null,
    constraint pk_PERTINENT primary key (PLAYER_PSEUDO, OPINION_ID)
);
--                      CONFIG
create table CONFIG (
    ID INT not null,
    PLAYER_NUMBER INT not null,
    EXTEND VARCHAR(20) not null,
    GAME_ID INT not null,
    constraint pk_config primary key (ID)
);
--                      THEME
create table THEME (
    ID INT not null,
    NAME VARCHAR(20) not null,
    constraint pk_THEME primary key (ID)
);
--                  CATEGORY
create table CATEGORY (
    ID INT not null,
    NAME VARCHAR(20) not null,
    constraint pk_CATEGORY primary key (ID)
);






-- ============================================================
--   INDEX
-- ============================================================
--                  PLAYER
create index PLAYER_FK1 on PEOPLE (ID ASC);
create index PLAYER_FK2 on THEME (ID ASC);
create index PLAYER_FK3 on CATEGORY (ID ASC);
/*-- create index PLAYER_FK5 on OPINION  ( OPINION_ID ASC); on peut pas mettre la cle etrangere dans  player car plusieurs avis
-- create index PLAYER_FK4 on GAME ( GAME_ID ASC); SENS DE DIRE QU UN JOUEUR JOUE A UN JEU ?*/
--                      OPINION
create index OPINION_FK1 on PLAYER (ID ASC);
create index OPINION_FK2 on CONFIG(ID ASC);
create index OPINION_FK3 on GAME (ID ASC);
--                      GAME
create index AUTHOR_FK on PEOPLE (ID ASC);
create index ILLUSTRATOR_FK on PEOPLE (ID ASC);
create index GAME_FK3 on THEME (ID ASC);
create index GAME_FK4 on CATEGORY (ID ASC);
create index EXTENSION_FK on GAME (EXTENSION_OF ASC);
--                      CONFIG
create index CONFIG_FK1 on GAME (ID ASC);
-- ============================================================
--   CONSTRAINTS
-- ============================================================
--                      PLAYER
alter table PLAYER
add constraint fk1_player foreign key (ID) references PEOPLE (ID);
alter table PLAYER
add constraint fk2_player foreign key (THEME_ID) references THEME (ID);
alter table PLAYER
add constraint fk3_player foreign key (CATEGORY_ID) references CATEGORY (ID);
--                      OPINION
alter table OPINION
add constraint fk1_opinion foreign key (PLAYER_ID) references PLAYER (ID);
alter table OPINION
add constraint fk2_opinion foreign key (CONFIG_ID) references CONFIG (ID);
alter table OPINION
add constraint fk3_opinion foreign key (GAME_ID) references GAME (ID);
--                      GAME
alter table GAME
add constraint fk_author foreign key (AUTHOR) references PEOPLE (ID);
alter table GAME
add constraint fk_illustrator foreign key (ILLUSTRATOR) references PEOPLE (ID);
alter table GAME
add constraint fk3_game foreign key (THEME_ID) references THEME (ID);
alter table GAME
add constraint fk4_game foreign key (CATEGORY_ID) references CATEGORY (ID);
alter table GAME
add constraint fk_extension foreign key (EXTENSION_OF) references GAME (ID);
--                          CONFIG
alter table CONFIG
add constraint fk1_config foreign key (GAME_ID) references GAME (ID);
-- IL MANQUE LA LIAISON QUI DEFINIT UNE EXTENSION