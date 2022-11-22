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


insert into PEOPLE values (  1 , 'Smith'      , 'John'       , 'john.smith@gmail.com'  ) ;
insert into PEOPLE values (  2 , 'Dufour'     , 'Jean'       , 'JEAN.DUFOUR@gmail.com'  ) ;
insert into PEOPLE values (  3 , 'Evans'      , 'Dylan'      , 'dylan.evans@gmail.com'  ) ;
insert into PEOPLE values (  4 , 'Fontaine'   , 'Jeanne'     , 'jeanne.fontaine@gmail.com'  ) ;
insert into PEOPLE values (  5 , 'Ruisseau'   , 'Céline'     , 'celine.ruisseau@gmail.com'  ) ;
insert into PEOPLE values (  5 , 'Robert'     , 'Léa'        , 'lea.robert@gmail.com'  ) ;

commit;

-- GAME 

insert into GAME values (  'LEAGUE_OF_LEGEND', '2009-01-12', 'MOBA', 40, 10,1,2, 'RIOT_GAMES','war' ,'e-sport',null   ) ;
insert into GAME values (  'TFT', '2018-01-20', 'AUTO_CHESS', 30, 8,2,3, 'RIOT_GAMES','war','e-sport',null  ) ;
insert into GAME values (  'BRAWLSTAR', '2018-01-20',  'MOBA', 3, 6,3,4, 'SUPPER_CELL','war' ,'e-sport',null  )   ;
insert into GAME values (  'FIFA_22', '2018-01-20', 'FOOT', 5, 2,4,5, 'EA_SPORT','war' ,'e-sport',null )   ;
insert into GAME values (  'WOW', '2018-01-20', 'MMORPG', 15, 1,5,4, 'BLIZZARD','war' ,'e-sport',null   )  ;

commit;

-- PLAYER


insert into PLAYER values (  'MARIO', 1, 'war', 'chill'  ) ;
insert into PLAYER values (  'PEACH', 2, 'war', 'chill'  ) ;
insert into PLAYER values (  'YOSHI', 3, 'war', 'chill'  ) ;
insert into PLAYER values (  'DK', 4, 'war', 'chill'  ) ;
insert into PLAYER values (  'TOAD', 5, 'war', 'chill'  ) ;

commit;

-- CONFIG

insert into CONFIG values(  1, 8,'tft set 6', 'TFT') ;

commit;

-- OPINION

insert into OPINION values(  1, 5, 'where is peach ?', '2018-01-20', 'MARIO', 'TFT', 1) ;
insert into OPINION values(  2, 15, 'not that bad', '2018-01-20', 'YOSHI', 'TFT', 1) ;
insert into OPINION values(  3, 20, 'perfect', '2018-01-20', 'PEACH', 'LEAGUE_OF_LEGEND', 1) ;

commit;

-- PERTINENT

insert into PERTINENT values(  'MARIO', 3, 20) ;

commit;



select count(*),'= 5 ?','PEOPLE' from PEOPLE 
union
select count(*),'= 5 ?','PLAYER' from PLAYER 
union
select count(*),'= 5 ?','GAME' from GAME
union
select count(*),'= 1 ?','PERTINENT' from PERTINENT
union
select count(*),'= 1 ?','CONFIG' from CONFIG
union
select count(*),'= 5 ?','THEME' from THEME
union
select count(*),'= 5 ?','CATEGORY' from CATEGORY

