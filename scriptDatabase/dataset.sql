-- ============================================================
--    suppression des donnees
-- ============================================================

SET FOREIGN_KEY_CHECKS=0; -- to disable them
delete from PLAYER_GAME ;
delete from THEME_PREF ;
delete from CAT_PREF ;
delete from PLAYER ;
delete from PEOPLE ;
delete from OPINION ;
delete from CONFIG ;
delete from GAME ;
delete from CREATOR ;
delete from PERTINENT ;
delete from THEME ;
delete from CATEGORY;
SET FOREIGN_KEY_CHECKS=1; -- to enable them

commit ;


-- ============================================================
--    creation des donnees
-- ============================================================

-- CATEGORY

insert into CATEGORY values( 1,'children') ;
insert into CATEGORY values( 2,'e-sport') ;
insert into CATEGORY values( 3,'chill') ;
insert into CATEGORY values( 4,'adult') ;
insert into CATEGORY values( 5,'team') ;

commit;

-- THEME

insert into THEME values( 1,'hunt') ;
insert into THEME values( 2,'war') ;
insert into THEME values( 3,'strategy') ;
insert into THEME values( 4,'reflex') ;
insert into THEME values( 5,'football') ;

commit;

-- PEOPLE


insert into PEOPLE values (  1 , 'SMITH'      , 'JOHN'       , 'JOHN.SMITH@GMAIL.COM'  ) ;
insert into PEOPLE values (  2 , 'DUFOUR'     , 'JEAN'       , 'JEAN.DUFOUR@GMAIL.COM'  ) ;
insert into PEOPLE values (  3 , 'EVANS'      , 'DYLAN'      , 'DYLAN.EVANS@GMAIL.COM'  ) ;
insert into PEOPLE values (  4 , 'FONTAINE'   , 'JEANNE'     , 'JEANNE.FONTAINE@GMAIL.COM'  ) ;
insert into PEOPLE values (  5 , 'RUISSEAU'   , 'CELINE'     , 'CELINE.RUISSEAU@GMAIL.COM'  ) ;
insert into PEOPLE values (  6 , 'Fabrie'   , 'Pierre'       , 'pierre.fabrie@GMAIL.COM'  ) ;
insert into PEOPLE values (  7 , 'Chapelle'   , 'Emilie'     , 'emilie.chapelle@GMAIL.COM'  ) ;

commit;

-- GAME 

insert into GAME values (  1,'LEAGUE_OF_LEGEND', '2009-01-12', 'MOBA', 40, 10, 'RIOT_GAMES',2, 2, null   ) ;
insert into GAME values (  2,'TFT', '2018-01-20', 'AUTO_CHESS', 30, 8, 'RIOT_GAMES', 2, 2, null  ) ;
insert into GAME values (  3,'BRAWLSTAR', '2018-01-20',  'MOBA', 3, 6, 'SUPPER_CELL', 2, 2, null  )   ;
insert into GAME values (  4,'FIFA_22', '2018-01-20', 'FOOT', 5, 2, 'EA_SPORT', 2, 2, null )   ;
insert into GAME values (  5,'WOW', '2018-01-20', 'MMORPG', 15, 1, 'BLIZZARD', 2, 2, null   )  ;
insert into GAME values (  6,'Borderlands 3', '2018-01-20', 'MMORPG', 0, 1, 'BLIZZARD', 2, 2, null   )  ;
insert into GAME values (  7,'test extension', '2018-01-20', 'MMORPG', 0, 1, 'GearBox',2 , 3, 6   )  ;

commit;

-- CREATOR 

insert into CREATOR values (  1, 3, 1, 0);
insert into CREATOR values (  2, 3, 0, 1);
insert into CREATOR values (  3, 3, 0, 1);

insert into CREATOR values (  2, 2, 1, 0);
insert into CREATOR values (  1, 2, 0, 1);
insert into CREATOR values (  4, 2, 0, 1);

insert into CREATOR values (  1, 5, 1, 1);
insert into CREATOR values (  2, 5, 1, 1);
insert into CREATOR values (  3, 5, 0, 1);
insert into CREATOR values (  4, 5, 0, 1);

commit;

--PLAYER
insert into PLAYER values ( 1, 'MARIO'     , 6  ,'2022-11-20') ;
insert into PLAYER values ( 2, 'PEACH'     , 7  ,'2022-11-20') ;
insert into PLAYER values ( 3, 'YOSHI'     , 4  ,'2022-11-20') ;
insert into PLAYER values ( 4, 'DK'        , 3  ,'2022-11-20') ;
insert into PLAYER values ( 5, 'TOAD'      , 5  ,'2022-11-20' ) ;
insert into PLAYER values ( 6, 'FUNKY KONG', 1  ,'2022-11-20' ) ;
insert into PLAYER values ( 7, 'HARMONY'   , 2  ,'2022-11-20' ) ;

commit;

--PLAYER_GAME
insert into PLAYER_GAME values (  1, 2) ;
insert into PLAYER_GAME values (  2, 3) ;
insert into PLAYER_GAME values (  3, 1) ;
insert into PLAYER_GAME values (  3, 2) ;
insert into PLAYER_GAME values (  4, 1) ;
insert into PLAYER_GAME values (  2, 1) ;
insert into PLAYER_GAME values (  5, 2) ;
insert into PLAYER_GAME values (  6, 3) ;
insert into PLAYER_GAME values (  7, 1) ;
insert into PLAYER_GAME values (  7, 2) ;

commit;

--CONFIG

insert into CONFIG values(  1, 8, 2, 1) ;
insert into CONFIG values(  2, 4, 2, 3) ;
insert into CONFIG values(  3, 4, 3, 4) ;
insert into CONFIG values(  4, 1, null, 4) ;
insert into CONFIG values(  5, 10, 6, 7) ;
insert into CONFIG values(  6, 6, 6, 7) ;
insert into CONFIG values(  7, 10, 6, 7) ;
insert into CONFIG values(  8, 10, 6, 7) ;
insert into CONFIG values(  9, 100, 6, 7) ;


commit;

--OPINION
insert into OPINION values(  1, 5, 'where is peach', '2019-01-20', 1, 1, 1) ;
insert into OPINION values(  16, 5, 'Elle est où Jeanne', '2020-01-20', 2, 2, 1) ;

insert into OPINION values(  2, 5, 'not that bad', '2017-01-20', 2, 2, 1) ;
insert into OPINION values(  4, 2, 'not that bad', '2016-01-20', 3, 3, 3) ;
insert into OPINION values(  6, 4, 'not that bad', '2015-01-20', 4, 4, 1) ;
insert into OPINION values(  10, 2, 'not that bad', '2008-01-20', 5, 5, 5) ;

insert into OPINION values(  3, 4, 'perfect !', '2018-10-20', 6, 6, 7) ;
insert into OPINION values(  11, 4, 'perfect', '2018-09-20', 5, 7, 6) ;

insert into OPINION values(  7, 4, 'perfect', '2018-01-21', 3, 2, 8) ;
insert into OPINION values(  8, 5, 'not that bad', '2018-01-10', 1, 2, 4) ;
insert into OPINION values(  12, 5, 'not that bad', '2018-11-20', 1, 6, 2) ;
insert into OPINION values(  14, 3, 'not that bad', '2020-03-20', 3, 5, 6) ;

insert into OPINION values(  5, 3, 'perfect', '2021-01-20', 4, 6, 9) ;
insert into OPINION values(  9, 3, 'perfect', '2022-01-20', 3, 6, 3) ;
insert into OPINION values(  13, 3, 'perfect', '2021-04-20', 2, 6, 4) ;
insert into OPINION values(  15, 5, 'perfect', '2021-10-20', 3, 7, 5) ;

commit;

--PERTINENT
insert into PERTINENT values(  1, 1, 2) ;
insert into PERTINENT values(  3, 1, 3) ;

insert into PERTINENT values(  5, 2, 1) ;
insert into PERTINENT values(  2, 2, 1) ;
insert into PERTINENT values(  1, 2, 4) ;
insert into PERTINENT values(  1, 3, 4) ;

insert into PERTINENT values(  2, 3, 5) ;
insert into PERTINENT values(  4, 3, 5) ;
insert into PERTINENT values(  3, 3, 5) ;
insert into PERTINENT values(  4, 4, 1) ;
insert into PERTINENT values(  5, 3, 1) ;
insert into PERTINENT values(  5, 5, 1) ;

insert into PERTINENT values(  1, 4, 5) ;
insert into PERTINENT values(  2, 4, 1) ;
insert into PERTINENT values(  3, 4, 1) ;

insert into PERTINENT values(  1, 5, 5) ;
insert into PERTINENT values(  2, 5, 5) ;
insert into PERTINENT values(  4, 5, 5) ;
insert into PERTINENT values(  6, 5, 1) ;
commit;

--THEME_PREF
insert into THEME_PREF values(  1, 2 ) ;
insert into THEME_PREF values(  1, 3 ) ;
insert into THEME_PREF values (  2, 3) ;
insert into THEME_PREF values (  3, 4) ;
insert into THEME_PREF values (  1, 1) ;
insert into THEME_PREF values (  4, 5) ;
insert into THEME_PREF values (  5, 2) ;
insert into THEME_PREF values (  5, 3) ;
commit;

--CAT_PREF
insert into CAT_PREF values(  1, 2 ) ;
insert into CAT_PREF values(  1, 3 ) ;
insert into CAT_PREF values(  1, 4  ) ;
insert into CAT_PREF values (  2, 3 ) ;
insert into CAT_PREF values(  3, 2  ) ;
insert into CAT_PREF values(  4, 2 ) ;
insert into CAT_PREF values (  3, 4) ;
insert into CAT_PREF values (  4, 5) ;
insert into CAT_PREF values (  5, 1) ;
insert into CAT_PREF values (  5, 2) ;
insert into CAT_PREF values (  3, 3) ;
commit;


select 'Nb in database','Nb waited','Table filled' from CONFIG
union
select count(*),'= 7 ?','PEOPLE' from PEOPLE
union
select count(*),'= 7 ?','PLAYER' from PLAYER
union
select count(*),'= 7 ?','GAME' from GAME
union
select count(*),'= 10 ?','PLAYER_GAME' from PLAYER_GAME
union
select count(*),'= 10 ?','CREATOR' from CREATOR
union
select count(*),'= 16 ?','OPINION' from OPINION
union
select count(*),'= 19 ?','PERTINENT' from PERTINENT
union
select count(*),'= 9 ?','CONFIG' from CONFIG
union
select count(*),'= 5 ?','THEME' from THEME
union
select count(*),'= 8 ?','THEME_PREF' from THEME_PREF
union
select count(*),'= 5 ?','CATEGORY' from CATEGORY
union
select count(*),'= 11 ?','CAT_PREF' from CAT_PREF

