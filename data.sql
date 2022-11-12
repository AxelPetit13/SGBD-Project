-- ============================================================
--    delete datas
-- ============================================================

delete from PLAYER ;
delete from PERSON ;
delete from GAME ;

commit ;

-- ============================================================
--    creation datas
-- ============================================================

-- PERSON

insert into PERSON values (  1 , 'THIERRY'     , 'CLAUDE'       , 'cthierry@gmail.com' , 1) ;
insert into PERSON values (  2 , 'SMITH'   , 'ALFRED'       , 'mrsmith@hotmail.com',  2) ;

commit ;

-- PLAYER

insert into PLAYER values (1,  'destroyer004') ;
insert into PLAYER values (  2 , 'Xx_ALFI_xX' ) ;

commit ;

-- GAME

commit ;

insert into GAME values (  1 , 'TIME BOMB'   , '11-11-11'        , 'strategie'    , 3400 , 'hasbro' ) ;
insert into GAME values (  2 , 'WEREWOLF'   , '01-11-02'        , 'jdr'    , 3400 , 'hasbro' ) ;

commit ;

-- ============================================================
--    verification des donnees
-- ============================================================

select count(*),'= 2 ?','PERSON' from PERSON 
union
select count(*),'= 2 ?','PLAYER' from PLAYER 
union
select count(*),'= 2 ?','GAME' from GAME;

