-- ============================================================
--    suppression des donnees
-- ============================================================

delete from CATEGORY ;
delete from THEME ;
delete from CONFIG ;
delete from JUGEMENT ;
delete from OPINION ;
delete from PLAYER ;
delete from GAME ;
delete from PEOPLE ;

commit ;


-- ============================================================
--    creation des donnees
-- ============================================================

-- PEOPLE


insert into PEOPLE values (  1 , 'SMITH'      , 'JOHN'       , 'JOHN.SMITH@GMAIL.COM'  ) ;
insert into PEOPLE values (  2 , 'DUFOUR'     , 'JEAN'       , 'JEAN.DUFOUR@GMAIL.COM'  ) ;
insert into PEOPLE values (  3 , 'EVANS'      , 'DYLAN'      , 'DYLAN.EVANS@GMAIL.COM'  ) ;
insert into PEOPLE values (  4 , 'FONTAINE'   , 'JEANNE'     , 'JEANNE.FONTAINE@GMAIL.COM'  ) ;
insert into PEOPLE values (  5 , 'RUISSEAU'   , 'CELINE'     , 'CELINE.RUISSEAU@GMAIL.COM'  ) ;

commit;

-- GAME 

insert into GAME values (  'LEAGUE_OF_LEGEND', '05-JAN-2009', 'MOBA', 40, 10, 'RIOT_GAMES',1 ,2 ,2 ,2  ) ;
insert into GAME values (  'TFT', '10-JAN-2018', 'AUTO_CHESS', 30, 8, 'RIOT_GAMES',1,2,2,2  ) ;
insert into GAME values (  'BRAWLSTAR', '15-JAN-2016',  'MOBA', 3, 6, 'SUPPER_CELL',3 ,4 ,3 ,3  )   ;
insert into GAME values (  'FIFA_22', '20-JAN-2022', 'FOOT', 5, 2, 'EA_SPORT',2 ,3 ,1 ,1  )   ;
insert into GAME values (  'WOW', '25-JAN-2010', 'MMORPG', 15, 1, 'BLIZZARD',4 ,5 ,1 ,1  )  ;

commit;

--PLAYER


insert into PLAYER values (  'MARIO', 1, 1, 2  ) ;
insert into PLAYER values (  'PEACH', 2, 2, 3  ) ;
insert into PLAYER values (  'YOSHI', 3, 1, 1  ) ;
insert into PLAYER values (  'DK', 4, 1, 3  ) ;
insert into PLAYER values (  'TOAD', 5, 1, 2  ) ;

commit;

--OPINION

insert into OPINION values(  1, 5, 'where is peach ?', '01-JAN-2021', 'MARIO', 'TFT', 1) ;
insert into OPINION values(  2, 15, 'not that bad', '01-JAN-2021', 'YOSHI', 'TFT', 1) ;
insert into OPINION values(  3, 20, 'perfect', '01-JAN-2021', 'PEACH', 'LEAGUE_OF_LEGEND', 2) ;

commit;

--JUDGEMENT

insert into JUDGEMENT values(  MARIO, 3, 20) ;


commit;

--CONFIG


insert into CONFIG values(  1, 8,'tft set 6', 'TFT') ;

commit;


-- THEME

insert into THEME values( 'hunt') ;
insert into THEME values( 'war') ;
insert into THEME values( 'strategy') ;
insert into THEME values( 'reflex') ;
insert into THEME values( 'football') ;

commit;

-- CATEGORY

insert into CATEGORY values( 'children') ;
insert into CATEGORY values( 'e-sport') ;
insert into CATEGORY values( 'chill') ;
insert into CATEGORY values( 'adult') ;
insert into CATEGORY values( 'team') ;

commit;

select count(*),'= 5 ?','PEOPLE' from PEOPLE 
union
select count(*),'= 5 ?','PLAYER' from PLAYER 
union
select count(*),'= 5 ?','GAME' from GAME;
union
select count(*),'= 5 ?','GAME' from GAME;
union
select count(*),'= 1 ?','JUDGEMENT' from JUDGEMENT;
union
select count(*),'= 1 ?','CONFIG' from CONFIG;
union
select count(*),'= 5 ?','THEME' from THEME;
union
select count(*),'= 5 ?','CATEGORY' from CATEGORY;

