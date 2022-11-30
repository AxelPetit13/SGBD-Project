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

-- ============================================
-- GAME
-- ============================================
-- Get all games
SELECT * FROM GAME;

-- Get all games by author
SELECT GAME.* FROM GAME JOIN GAMESBYAUTHOR GA on GAME.id = GA.id_game;

-- Get all games by illustrator
SELECT GAME.* FROM GAME JOIN GAMESBYILLUSTRATOR GI on GAME.id = GI.id_game;

-- Get all games by catégories
SELECT GAME.* FROM GAME JOIN GAMESBYCATEGORY ON GAME.id = GAMESBYCATEGORY.id_game JOIN CATEGORY C on GAMESBYCATEGORY.id_category = C.id
WHERE C.name IN ('$1', '$2', '$3', '$4');

-- Get all games by themes
SELECT GAME.* FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id
WHERE T.name IN ('$1', '$2', '$3', '$4');

-- Get all games by theme and catagories
SELECT GAME.* FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id JOIN GAMESBYCATEGORY ON GAME.id = GAMESBYCATEGORY.id_game JOIN CATEGORY C on GAMESBYCATEGORY.id_category = C.id
WHERE C.name IN ('$1', '$2', '$3', '$4')
  AND T.name IN ('$1', '$2', '$3', '$4');





-- ====================================================================================================================
-- ============================================
-- STATS
-- ============================================
-- List of player, by number of games they marked
SELECT P.*, COUNT(*) FROM PLAYER P JOIN OPINION O on P.id = O.id_player
GROUP BY P.id;

-- List of n most recent comments
SELECT * FROM OPINION
ORDER BY OPINION.date DESC
LIMIT '$n';

-- Most rated comment
SELECT RELEVANT.id_opinion, COUNT(*) AS most_rated_opinion_score FROM RELEVANT
GROUP BY RELEVANT.id_opinion
ORDER BY COUNT(*) DESC
LIMIT 1;

-- confidence index

SELECT id_opinion,  (1 + SUM(is_positive))/(1 + COUNT(is_positive) - SUM( is_positive)) as confidence_index FROM RELEVANT
GROUP BY RELEVANT.id_opinion
ORDER BY confidence_index DESC;
