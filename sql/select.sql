-- ============================================
-- PERSON
-- ============================================
-- Get all PERSON
SELECT * FROM PERSON;

-- Get one PERSON
SELECT * FROM PERSON
WHERE id = ${id};

-- Get all authors
SELECT * FROM PERSON JOIN GAMESBYAUTHOR G on PERSON.id = G.id_person;

-- Get all illustrators
SELECT * FROM PERSON JOIN GAMESBYILLUSTRATOR G on PERSON.id = G.id_person;

-- Get favorites themes for all players
SELECT P.id, P.pseudo, T.id, T.name FROM PLAYER P, FAVORITETHEMES F JOIN THEME T on F.id_theme = T.id
WHERE P.id = F.id_player
ORDER BY P.id;

-- Get favorites categories for all players
SELECT P.id, P.pseudo, C.id, C.name FROM PLAYER P, FAVORITECATEGORIES F JOIN CATEGORY C on F.id_category = C.id
WHERE P.id = F.id_player
ORDER BY P.id;

-- Get favorites themes by players
SELECT T.* FROM THEME T JOIN FAVORITETHEMES F on T.id = F.id_theme JOIN PLAYER P on F.id_player = P.id WHERE P.id = 2;

-- GET favorites categories by players
SELECT C.* FROM CATEGORY C JOIN FAVORITECATEGORIES F on C.id = F.id_category JOIN PLAYER P on F.id_player = P.id WHERE P.id = 2;

