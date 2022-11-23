drop database if exists BOARDGAME;
create database BOARDGAME;
use BOARDGAME;
-- ============================================================
--   Tables
-- ============================================================
--                    PEOPLE
create table PEOPLE (
    PEOPLE_ID INT not null,
    PEOPLE_NAME VARCHAR(20) not null,
    PEOPLE_FIRSTNAME VARCHAR(20) not null,
    MAIL VARCHAR(100) not null,
    constraint pk_people primary key (PEOPLE_ID)
);
--                       GAME
create table GAME (
    GAME_ID INT not null,
    GAME_NAME VARCHAR(100) not null,
    APPARITION_DATE DATE not null,
    GAME_TYPE VARCHAR(20) not null,
    DURATION INT not null,
    PEOPLE_NUMBER INT not null,
    EDITOR VARCHAR(20) not null,
    THEME_ID INT not null,
    CATEGORY_ID INT not null,
    GAME_EXTENSION_OF INT,
    constraint pk_game primary key (GAME_ID)
);
--                       CREATOR
create table CREATOR (
    PEOPLE_ID INT not null,
    GAME_ID INT not null,
    IS_AUTHOR BOOLEAN not null,
    IS_ILLUSTRATOR BOOLEAN not null,
    constraint pk_creator primary key (PEOPLE_ID, GAME_ID)
);
--                      PLAYER
create table PLAYER (
    PLAYER_ID INT not null,
    PLAYER_PSEUDO VARCHAR(20) not null,
    PEOPLE_ID INT not null,
    REGISTION_DATE DATE not null,
    constraint pk_player primary key (PLAYER_ID)
);
--                      PLAYER_GAME
create table PLAYER_GAME (
    PLAYER_ID INT not null,
    GAME_ID INT not null,
    constraint pk_player_game primary key (PLAYER_ID,GAME_ID)
);
--                  OPINION
create table OPINION (
    OPINION_ID INT not null,
    OPINION_GRADE INT not null,
    COMMENT VARCHAR(1000) not null,
    DATE DATE not null,
    PLAYER_ID INT not null,
    GAME_ID INT not null,
    CONFIG_ID INT not null,
    constraint pk_opinion primary key (OPINION_ID)
);
--                  PERTINENT   
create table PERTINENT (
    PLAYER_ID INT not null,
    OPINION_ID INT not null,
    PERTINENT_GRADE INT not null,
    constraint pk_PERTINENT primary key (PLAYER_ID, OPINION_ID)
);
--                      CONFIG
create table CONFIG (
    CONFIG_ID INT not null,
    PLAYER_NUMBER INT not null,
    EXTEND INT ,
    GAME_ID INT not null,
    constraint pk_config primary key (CONFIG_ID)
);
--                      THEME
create table THEME (
    THEME_ID INT not null,
    THEME_NAME VARCHAR(20) not null,
    constraint pk_THEME primary key (THEME_ID)
);
--                       THEME_PREF
create table THEME_PREF (
    PLAYER_ID INT not null,
    THEME_ID INT not null,
    constraint pk_theme_pref primary key (PLAYER_ID, THEME_ID)
);
--                  CATEGORY
create table CATEGORY (
    CATEGORY_ID INT not null,
    CATEGORY_NAME VARCHAR(20) not null,
    constraint pk_CATEGORY primary key (CATEGORY_ID)
);
--                       CAT_PREF
create table CAT_PREF (
    PLAYER_ID INT not null,
    CATEGORY_ID INT not null,
    constraint pk_cat_pref primary key (PLAYER_ID, CATEGORY_ID)
);
-- ============================================================
--   INDEX
-- ============================================================
--                  PLAYER
create index PLAYER_FK1 on PEOPLE (PEOPLE_ID asc);
create index PLAYER_FK2 on THEME (THEME_ID ASC);
create index PLAYER_FK3 on CATEGORY (CATEGORY_ID ASC);
--                      OPINION
create index OPINION_FK1 on PLAYER (PLAYER_ID ASC);
create index OPINION_FK2 on CONFIG(CONFIG_ID ASC);
create index OPINION_FK3 on GAME (GAME_ID ASC);
--                      GAME
create index GAME_FK1 on THEME (THEME_ID ASC);
create index GAME_FK2 on CATEGORY (CATEGORY_ID ASC);
create index GAME_FK3 on GAME (GAME_EXTENSION_OF ASC);
--                      CREATOR
create index CREATOR_FK1 on PEOPLE (PEOPLE_ID ASC);
create index CREATOR_FK2 on GAME (GAME_ID ASC);
--                      CONFIG
create index CONFIG_FK1 on GAME (GAME_ID ASC);
create index CONFIG_FK2 on GAME (GAME_EXTENSION_OF ASC);

--                      THEME_PREF
create index THEME_PREF_FK1 on PLAYER (PLAYER_ID ASC);
create index THEME_PREF_FK2 on THEME (THEME_ID ASC);
--                      CAT_PREF
create index CAT_PREF_FK_PLAYER on PLAYER (PLAYER_ID ASC);
create index CAT_PREF_FK_CATEGORY on CATEGORY (CATEGORY_ID ASC);
-- ============================================================
--   CONSTRAINTS
-- ============================================================
--                      PLAYER
alter table PLAYER
add constraint fk1_player foreign key (PEOPLE_ID) references PEOPLE (PEOPLE_ID);
--                      OPINION
alter table OPINION
add constraint fk1_opinion foreign key (PLAYER_ID) references PLAYER (PLAYER_ID);
alter table OPINION
add constraint fk2_opinion foreign key (CONFIG_ID) references CONFIG (CONFIG_ID);
alter table OPINION
add constraint fk3_opinion foreign key (GAME_ID) references GAME (GAME_ID);
--                      GAME
alter table GAME
add constraint fk1_game foreign key (THEME_ID) references THEME (THEME_ID);
alter table GAME
add constraint fk2_game foreign key (CATEGORY_ID) references CATEGORY (CATEGORY_ID);
alter table GAME
add constraint fk3_game foreign key (GAME_EXTENSION_OF) references GAME (GAME_ID);
--                      PLAYER_GAME
alter table PLAYER_GAME
add constraint fk1_player_game foreign key (PLAYER_ID) references PLAYER (PLAYER_ID);
alter table PLAYER_GAME
add constraint fk2_player_game  foreign key (GAME_ID) references GAME (GAME_ID);
--                      CREATOR
alter table CREATOR
add constraint fk1_creator foreign key (PEOPLE_ID) references PEOPLE (PEOPLE_ID);
alter table CREATOR
add constraint fk2_creator foreign key (GAME_ID) references GAME (GAME_ID);
--                          CONFIG
alter table CONFIG
add constraint fk1_config foreign key (GAME_ID) references GAME (GAME_ID);


--                      THEME_PREF
alter table THEME_PREF
add constraint fk_theme_player foreign key (PLAYER_ID) references PLAYER (PLAYER_ID);
alter table THEME_PREF
add constraint fk_theme_theme foreign key (THEME_ID) references THEME (THEME_ID);
--                      CAT_PREF
alter table CAT_PREF
add constraint fk_cat_player foreign key (PLAYER_ID) references PLAYER (PLAYER_ID);
alter table CAT_PREF
add constraint fk_cat_cat foreign key (CATEGORY_ID) references CATEGORY (CATEGORY_ID);
-- todo IL MANQUE LA LIAISON QUI DEFINIT UNE EXTENSION y'a la foreign key pourtant