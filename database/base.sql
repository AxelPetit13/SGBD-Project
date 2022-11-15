-- ============================================================
--   Nom de la base   :  BOARDGAME                                          
-- ============================================================

drop table PLAYER ;
drop table PERSON ;
drop table GAME ;

-- ... --

-- ============================================================
--   Table : PERSON                                           
-- ============================================================
create table PERSON
(
    ID_PERSON                 INT(3)              not null,
    F_NAME                     CHAR(20)               not null,
    S_NAME                CHAR(20)                       not null,
    EMAIL                   CHAR(20)                       not null,
    ID_PLAYER                 INT(3)              not null,
    constraint pk_person primary key (ID_PERSON)
);

-- ============================================================
--   Table : PLAYER                                      
-- ============================================================
create table PLAYER
(
    ID_PLAYER             INT(3)              not null,
    PSEUDO                 CHAR(20)               not null,
    constraint pk_player primary key (ID_PLAYER)
);

-- ============================================================
--   Table : GAME                                              
-- ============================================================
create table GAME
(
    ID_GAME                 INT(3)              not null,
    GAME_NAME                      CHAR(30)               not null,
    DATE_OF_RELEASE                 DATE                           ,
    TYPE_OF_GAME                           CHAR(30)              ,
    DURATION                          INT(6)               ,
    NB_OF_PLAYER                    CHAR(10),
    EDITOR             CHAR(30)              ,
    constraint pk_game primary key (ID_GAME)
);

alter table PERSON
--    add constraint fk1_person foreign key (ID_PLAYER)
--       references PLAYER (ID_PLAYER);

