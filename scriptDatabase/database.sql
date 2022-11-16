drop database if exists BOARDGAME;

create database BOARDGAME;
use BOARDGAME;


-- ============================================================
--   Table : People                                            
-- ============================================================
create table PEOPLE
(
    PEOPLE_ID                    INT                  not null,
    PEOPLE_NAME                  VARCHAR(20)          not null,
    PEOPLE_FIRSTNAME             VARCHAR(20)          not null,
    MAIL                         VARCHAR(100)          not null,        
    constraint pk_people primary key (PEOPLE_ID)
);

-- ============================================================
--   Table : Games                                          
-- ============================================================
create table GAME
(
    GAME_NAME                   VARCHAR(20)         not null,
    APPARITION_DATE             DATE             not null,
    GAME_TYPE                   VARCHAR(20)         not null,
    DURATION                    INT              not null,
    PLAYER_NUMBER               INT         not null,
    EDITOR                      VARCHAR(20)         not null,
    PEOPLE_ID                   INT              not null,
    THEME_NAME                  VARCHAR(20)         not null,
    CATEGORY_NAME               VARCHAR(20)         not null,
    GAME_EXTENSION_OF                   VARCHAR(20)         ,
    constraint pk_game primary key (GAME_NAME)
);

-- ============================================================
--   Table : Player                                            
-- ============================================================
create table PLAYER
(
    PLAYER_PSEUDO                VARCHAR(20)          not null,
    PEOPLE_ID                    INT               not null,
    THEME_NAME                   VARCHAR(20)          not null,
    CATEGORY_NAME                VARCHAR(20)          not null,
    constraint pk_player primary key (PLAYER_PSEUDO)
);

-- ============================================================
--   Table : Opinion                                           
-- ============================================================
create table OPINION
(
    OPINION_ID                    INT         not null,
    OPINION_GRADE                 INT         not null,
    COMMENT                       VARCHAR(1000)          not null,
    DATE                          DATE              not null,
    PLAYER_PSEUDO                 VARCHAR(20)          not null,
    GAME_NAME                     VARCHAR(20)          not null,
    CONFIG_ID                     INT         not null,       
    constraint pk_opinion primary key (OPINION_ID)
);

-- ============================================================
--   Table : PERTINENT                                           
-- ============================================================
create table PERTINENT
(
    PLAYER_PSEUDO                VARCHAR(20)          not null,
    OPINION_ID                   INT               not null,
    PERTINENT_GRADE               INT         not  null,
    constraint pk_PERTINENT primary key (PLAYER_PSEUDO,OPINION_ID)
);

-- ============================================================
--   Table : Config                                            
-- ============================================================
create table CONFIG
(
    CONFIG_ID                     INT         not null,
    PLAYER_NUMBER                 INT         not null,
    EXTEND                        VARCHAR(20)          not null,
    GAME_NAME                     VARCHAR(20)          not null,       
    constraint pk_config primary key (CONFIG_ID)
);

-- ============================================================
--   Table : Theme                                           
-- ============================================================
create table THEME
(
    THEME_NAME                      VARCHAR(20)         not null,     
    constraint pk_THEME primary key (THEME_NAME)
);

-- ============================================================
--   Table : Category                                        
-- ============================================================
create table CATEGORY
(
    CATEGORY_NAME                   VARCHAR(20)          not null,     
    constraint pk_CATEGORY primary key (CATEGORY_NAME)
);

create index PLAYER_FK1 on PEOPLE (PEOPLE_ID asc);

create index PLAYER_FK2 on THEME ( THEME_NAME ASC);

create index PLAYER_FK3 on CATEGORY ( CATEGORY_NAME ASC);

--create index PLAYER_FK5 on OPINION  ( OPINION_ID ASC); on peut pas mettre la cle etrangere dans  player car plusieurs avis    

--create index PLAYER_FK4 on GAME ( GAME_ID ASC); SENS DE DIRE QU UN JOUEUR JOUE A UN JEU ?

create index OPINION_FK1 on PLAYER ( PLAYER_PSEUDO ASC);

create index OPINION_FK2 on CONFIG( CONFIG_ID ASC);

create index OPINION_FK3 on GAME ( GAME_NAME ASC);

create index GAME_FK1 on PEOPLE ( PEOPLE_ID ASC);

create index GAME_FK2 on PEOPLE ( PEOPLE_ID ASC);

create index GAME_FK3 on THEME ( THEME_NAME ASC);

create index GAME_FK4 on CATEGORY  ( CATEGORY_NAME ASC);

create index GAME_FK5 on GAME  ( GAME_EXTENSION_OF ASC);

create index CONFIG_FK1 on GAME ( GAME_NAME ASC);

alter table PLAYER
    add constraint fk1_player foreign key (PEOPLE_ID)
       references PEOPLE (PEOPLE_ID);

alter table PLAYER
    add constraint fk2_player foreign key (THEME_NAME)
       references THEME (THEME_NAME);

alter table PLAYER
    add constraint fk3_player foreign key (CATEGORY_NAME)
       references CATEGORY (CATEGORY_NAME);

alter table OPINION
    add constraint fk1_opinion foreign key (PLAYER_PSEUDO)
       references PLAYER (PLAYER_PSEUDO);

alter table OPINION
    add constraint fk2_opinion foreign key (CONFIG_ID)
       references CONFIG (CONFIG_ID);

alter table OPINION
    add constraint fk3_opinion foreign key (GAME_NAME)
       references GAME (GAME_NAME);

alter table GAME
    add constraint fk1_game foreign key (PEOPLE_ID)
       references PEOPLE (PEOPLE_ID);

alter table GAME
    add constraint fk2_game foreign key (PEOPLE_ID)
       references PEOPLE (PEOPLE_ID);

alter table GAME
    add constraint fk3_game foreign key (THEME_NAME)
       references THEME (THEME_NAME);

alter table GAME
    add constraint fk4_game foreign key (CATEGORY_NAME)
       references CATEGORY (CATEGORY_NAME);

alter table CONFIG
    add constraint fk1_config foreign key (GAME_NAME)
       references GAME (GAME_NAME);


-- IL MANQUE LA LIAISON QUI DEFINIT UNE EXTENSION