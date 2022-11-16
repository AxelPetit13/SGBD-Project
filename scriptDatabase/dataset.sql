-- ============================================================
--    suppression des donnees
-- ============================================================

delete from CATEGORY ;
delete from THEME ;
delete from CONFIG ;
delete from PERTINENT ;
delete from OPINION ;
delete from PLAYER ;
delete from GAME ;
delete from PEOPLE ;

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

commit;

-- GAME 

insert into GAME values (  'LEAGUE_OF_LEGEND', '2009-01-12', 'MOBA', 40, 10, 'RIOT_GAMES',1 ,'war' ,'e-sport',null   ) ;
insert into GAME values (  'TFT', '2018-01-20', 'AUTO_CHESS', 30, 8, 'RIOT_GAMES',1,'war','e-sport',null  ) ;
insert into GAME values (  'BRAWLSTAR', '2018-01-20',  'MOBA', 3, 6, 'SUPPER_CELL',3 ,'war' ,'e-sport',null  )   ;
insert into GAME values (  'FIFA_22', '2018-01-20', 'FOOT', 5, 2, 'EA_SPORT',2 ,'war' ,'e-sport',null )   ;
insert into GAME values (  'WOW', '2018-01-20', 'MMORPG', 15, 1, 'BLIZZARD',4 ,'war' ,'e-sport',null   )  ;

commit;

--PLAYER


insert into PLAYER values (  'MARIO', 1, 'war', 'chill'  ) ;
insert into PLAYER values (  'PEACH', 2, 'war', 'chill'  ) ;
insert into PLAYER values (  'YOSHI', 3, 'war', 'chill'  ) ;
insert into PLAYER values (  'DK', 4, 'war', 'chill'  ) ;
insert into PLAYER values (  'TOAD', 5, 'war', 'chill'  ) ;

commit;

--CONFIG

insert into CONFIG values(  1, 8,'tft set 6', 'TFT') ;

commit;

--OPINION

insert into OPINION values(  1, 5, 'where is peach ?', '2018-01-20', 'MARIO', 'TFT', 1) ;
insert into OPINION values(  2, 15, 'not that bad', '2018-01-20', 'YOSHI', 'TFT', 1) ;
insert into OPINION values(  3, 20, 'perfect', '2018-01-20', 'PEACH', 'LEAGUE_OF_LEGEND', 1) ;

commit;

--PERTINENT

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

