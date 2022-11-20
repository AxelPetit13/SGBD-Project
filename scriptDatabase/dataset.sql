-- ============================================================
--    suppression des donnees
-- ============================================================

SET FOREIGN_KEY_CHECKS=0; -- to disable them
delete from PLAYER ;
delete from PEOPLE ;
delete from OPINION ;
delete from CONFIG ;
delete from GAME ;
delete from PERTINENT ;
delete from THEME ;
delete from CATEGORY;
SET FOREIGN_KEY_CHECKS=1; -- to enable them

commit ;


-- ============================================================
--    creation des donnees
-- ============================================================

-- CATEGORY

insert into CATEGORY values( 'children') ;
insert into CATEGORY values( 'e-sport') ;
insert into CATEGORY values( 'chill') ;
insert into CATEGORY values( 'adult') ;
insert into CATEGORY values( 'team') ;

commit;

-- THEME

insert into THEME values( 'hunt') ;
insert into THEME values( 'war') ;
insert into THEME values( 'strategy') ;
insert into THEME values( 'reflex') ;
insert into THEME values( 'football') ;

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

insert into GAME values (  'LEAGUE_OF_LEGEND', '2009-01-12', 'MOBA', 40, 10,1,2, 'RIOT_GAMES','war' ,'e-sport',null   ) ;
insert into GAME values (  'TFT', '2018-01-20', 'AUTO_CHESS', 30, 8,2,3, 'RIOT_GAMES','war','e-sport',null  ) ;
insert into GAME values (  'BRAWLSTAR', '2018-01-20',  'MOBA', 3, 6,3,4, 'SUPPER_CELL','war' ,'e-sport',null  )   ;
insert into GAME values (  'FIFA_22', '2018-01-20', 'FOOT', 5, 2,4,5, 'EA_SPORT','war' ,'e-sport',null )   ;
insert into GAME values (  'WOW', '2018-01-20', 'MMORPG', 15, 1,5,4, 'BLIZZARD','war' ,'e-sport',null   )  ;

commit;

--PLAYER


insert into PLAYER values (  'MARIO', 1, 'war', 'chill'  ) ;
insert into PLAYER values (  'PEACH', 2, 'war', 'chill'  ) ;
insert into PLAYER values (  'YOSHI', 3, 'war', 'chill'  ) ;
insert into PLAYER values (  'DK', 4, 'war', 'chill'  ) ;
insert into PLAYER values (  'TOAD', 5, 'war', 'chill'  ) ;
insert into PLAYER values (  'FUNKY KONG', 6, 'war', 'chill'  ) ;
insert into PLAYER values (  'HARMONY', 7, 'war', 'chill'  ) ;

commit;

--CONFIG

insert into CONFIG values(  1, 8,'tft set 6', 'TFT') ;
insert into CONFIG values(  2, 4,'fut', 'FIFA_22') ;
insert into CONFIG values(  3, 4,'multi en local', 'FIFA_22') ;
insert into CONFIG values(  4, 1,'mode carriere', 'FIFA_22') ;
insert into CONFIG values(  5, 10,'mode survi', 'BRAWLSTAR') ;
insert into CONFIG values(  6, 6,'brawl ball', 'BRAWLSTAR') ;
insert into CONFIG values(  7, 10,'partie classé', 'LEAGUE_OF_LEGEND') ;
insert into CONFIG values(  8, 10,'aram', 'LEAGUE_OF_LEGEND') ;
insert into CONFIG values(  9, 100,'multi', 'WOW') ;


commit;

--OPINION
insert into OPINION values(  1, 5, 'where is peach', '2019-01-20', 'MARIO', 'TFT', 1) ;
insert into OPINION values(  16, 5, 'Elle est où Jeanne', '2020-01-20', 'MARIO', 'TFT', 1) ;

insert into OPINION values(  2, 5, 'not that bad', '2017-01-20', 'YOSHI', 'TFT', 1) ;
insert into OPINION values(  4, 2, 'not that bad', '2016-01-20', 'YOSHI', 'FIFA_22', 3) ;
insert into OPINION values(  6, 4, 'not that bad', '2015-01-20', 'YOSHI', 'TFT', 1) ;
insert into OPINION values(  10, 2, 'not that bad', '2008-01-20', 'YOSHI', 'BRAWLSTAR', 5) ;

insert into OPINION values(  3, 4, 'perfect !', '2018-10-20', 'PEACH', 'LEAGUE_OF_LEGEND', 7) ;
insert into OPINION values(  11, 4, 'perfect', '2018-09-20', 'PEACH', 'BRAWLSTAR', 6) ;

insert into OPINION values(  7, 4, 'perfect', '2018-01-21', 'DK', 'LEAGUE_OF_LEGEND', 8) ;
insert into OPINION values(  8, 5, 'not that bad', '2018-01-10', 'DK', 'FIFA_22', 4) ;
insert into OPINION values(  12, 5, 'not that bad', '2018-11-20', 'DK', 'FIFA_22', 2) ;
insert into OPINION values(  14, 3, 'not that bad', '2020-03-20', 'DK', 'BRAWLSTAR', 6) ;

insert into OPINION values(  5, 3, 'perfect', '2021-01-20', 'TOAD', 'WOW', 9) ;
insert into OPINION values(  9, 3, 'perfect', '2022-01-20', 'TOAD', 'FIFA_22', 3) ;
insert into OPINION values(  13, 3, 'perfect', '2021-04-20', 'TOAD', 'FIFA_22', 4) ;
insert into OPINION values(  15, 5, 'perfect', '2021-10-20', 'TOAD', 'BRAWLSTAR', 5) ;

commit;

--PERTINENT
insert into PERTINENT values(  'TOAD', 1, 2) ;
insert into PERTINENT values(  'DK', 1, 4) ;

insert into PERTINENT values(  'PEACH', 2, 1) ;
insert into PERTINENT values(  'MARIO', 2, 1) ;
insert into PERTINENT values(  'DK', 2, 4) ;
insert into PERTINENT values(  'TOAD', 2, 4) ;

insert into PERTINENT values(  'MARIO', 3, 5) ;
insert into PERTINENT values(  'PEACH', 3, 5) ;
insert into PERTINENT values(  'TOAD', 3, 5) ;
insert into PERTINENT values(  'FUNKY KONG', 3, 1) ;
insert into PERTINENT values(  'HARMONY', 3, 1) ;
insert into PERTINENT values(  'YOSHI', 3, 1) ;

insert into PERTINENT values(  'FUNKY KONG', 4, 5) ;
insert into PERTINENT values(  'HARMONY', 4, 1) ;
insert into PERTINENT values(  'YOSHI', 4, 1) ;

insert into PERTINENT values(  'FUNKY KONG', 5, 5) ;
insert into PERTINENT values(  'MARIO', 5, 5) ;
insert into PERTINENT values(  'HARMONY', 5, 5) ;
insert into PERTINENT values(  'YOSHI', 5, 1) ;
    commit;



select count(*),'= 5 ?','PEOPLE' from PEOPLE
union
select count(*),'= 5 ?','PLAYER' from PLAYER
union
select count(*),'= 5 ?','GAME' from GAME
union
select count(*),'= 16 ?','OPINION' from OPINION
union
select count(*),'= 4 ?','PERTINENT' from PERTINENT
union
select count(*),'= 9 ?','CONFIG' from CONFIG
union
select count(*),'= 5 ?','THEME' from THEME
union
select count(*),'= 5 ?','CATEGORY' from CATEGORY

