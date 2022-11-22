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

insert into CATEGORY values(1, 'children') ;
insert into CATEGORY values(2, 'e-sport') ;
insert into CATEGORY values(3, 'chill') ;
insert into CATEGORY values(4, 'adult') ;
insert into CATEGORY values(5, 'team') ;

commit;

-- THEME

insert into THEME values(1,  'hunt') ;
insert into THEME values(2,  'war') ;
insert into THEME values(3, 'strategy') ;
insert into THEME values(4, 'reflex') ;
insert into THEME values(5,  'football') ;

commit;

-- PEOPLE


insert into PEOPLE values (  1 , 'Smith'      , 'John'       , 'john.smith@gmail.com'  ) ;
insert into PEOPLE values (  2 , 'Dufour'     , 'Jean'       , 'JEAN.DUFOUR@gmail.com'  ) ;
insert into PEOPLE values (  3 , 'Evans'      , 'Dylan'      , 'dylan.evans@gmail.com'  ) ;
insert into PEOPLE values (  4 , 'Fontaine'   , 'Jeanne'     , 'jeanne.fontaine@gmail.com'  ) ;
insert into PEOPLE values (  5 , 'Ruisseau'   , 'Céline'     , 'celine.ruisseau@gmail.com'  ) ;
insert into PEOPLE values (  6 , 'Robert'     , 'Léa'        , 'lea.robert@gmail.com'  ) ;

commit;

-- GAME 

insert into GAME values ( 1, 'LEAGUE_OF_LEGEND', '2009-01-12', 'MOBA', 40, 10, 1, 2, 1, 1 , 1, null   ) ;
insert into GAME values ( 2 , 'TFT', '2018-01-20', 'AUTO_CHESS', 30, 8, 2, 3, 1, 1, 1, null  ) ;
insert into GAME values ( 3 , 'BRAWLSTAR', '2018-01-20',  'MOBA', 3, 6, 3, 4, 2 , 1, 1, null  )   ;
insert into GAME values ( 4 , 'FIFA_22', '2018-01-20', 'FOOT', 5, 2, 4, 5, 3, 1, 1, null )   ;
insert into GAME values ( 5 , 'WOW', '2018-01-20', 'MMORPG', 15, 1, 5, 4, 4, 1, 1, null   )  ;

commit;

-- PLAYER


insert into PLAYER values (1, 'MARIO', 1, 1, 1  ) ;
insert into PLAYER values (2, 'PEACH', 2, 1, 1  ) ;
insert into PLAYER values (3, 'YOSHI', 3, 1, 1  ) ;
insert into PLAYER values (4, 'DK', 4, 1, 1  ) ;
insert into PLAYER values (5, 'TOAD', 5, 1, 1  ) ;

commit;

-- CONFIG

insert into CONFIG values(  1, 8,'tft set 6', 1) ;

commit;

-- OPINION

insert into OPINION values(  1, 5, 'where is peach ?', '2018-01-20', 2, 2, 1) ;
insert into OPINION values(  2, 15, 'not that bad', '2018-01-20', 1, 2, 1) ;
insert into OPINION values(  3, 20, 'perfect', '2018-01-20', 3, 2, 1) ;

commit;

-- PERTINENT

insert into PERTINENT values(  'MARIO', 3, 20) ;

commit;



select count(*),'= 6 ?','PEOPLE' from PEOPLE
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

