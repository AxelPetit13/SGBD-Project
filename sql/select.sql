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
-- PLAYERS
-- ============================================
-- Get all players
SELECT * FROM PLAYER;

-- Get all players with informations on the person behind
SELECT * FROM PLAYER JOIN PERSON on PLAYER.id = PERSON.id;

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

-- ============================================
-- OPINION
-- ============================================
-- Get all themes
SELECT * from THEME;

-- ============================================
-- OPINION
-- ============================================
-- Get all opinions
SELECT * FROM OPINION;

-- GET all opinions with detail
SELECT O.id, G.name, O.message, P.pseudo, O.mark, O.date  FROM OPINION O JOIN PLAYER P on O.id_player = P.id JOIN CONFIGURATION C on O.id_configuration = C.id JOIN GAME G on C.id_game = G.id;
-- ====================================================================================================================
-- ============================================
-- STATS
-- ============================================
-- List of player, by number of games they marked
SELECT P.*, COUNT(*) FROM PLAYER P JOIN OPINION O on P.id = O.id_player
GROUP BY P.id;

-- confidence index
SELECT id_opinion,  (1 + SUM(is_positive))/(1 + COUNT(is_positive) - SUM( is_positive)) as confidence_index FROM RELEVANT
GROUP BY RELEVANT.id_opinion
ORDER BY confidence_index DESC;

-- List of n most recent comments
SELECT * FROM OPINION
ORDER BY OPINION.date DESC
LIMIT '$n';

-- List of n most recent comments with details
SELECT P.pseudo as author, O.message, O.mark, O.date, CONFIDENCE.confidence_index FROM OPINION O
JOIN PLAYER P on O.id_player = P.id
JOIN (SELECT id_opinion,  (1 + SUM(is_positive))/(1 + COUNT(is_positive) - SUM( is_positive)) as confidence_index FROM RELEVANT
     GROUP BY RELEVANT.id_opinion
     ORDER BY confidence_index DESC) as CONFIDENCE ON CONFIDENCE.id_opinion = O.id
ORDER BY O.date DESC
LIMIT '$n';

-- Most rated comment
SELECT O.*, COUNT(*) AS times_rated FROM RELEVANT
JOIN OPINION O on RELEVANT.id_opinion = O.id
GROUP BY O.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- Most rated comment with detail
SELECT P.id, P.pseudo, G.id, G.name, O.id, O.message, O.mark, O.date, COUNT(*) AS times_rated FROM RELEVANT
JOIN OPINION O ON RELEVANT.id_opinion = O.id
JOIN CONFIGURATION C ON O.id_configuration = C.id
JOIN GAME G ON C.id_game = G.id
JOIN PLAYER P ON P.id = O.id_player
GROUP BY O.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- get pourcentage représentation of each theme
SELECT T.name, count(T.name), count(T.name) / (SELECT COUNT(*) FROM THEME) as '%' FROM GAME
JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game
JOIN THEME T on GAMESBYTHEME.id_theme = T.id
GROUP BY T.name;

-- Most commented game
SELECT G.name as game, COUNT(G.id) as nb_comments FROM GAME G
JOIN CONFIGURATION C on G.id = C.id_game
JOIN OPINION O ON O.id_configuration = C.id
GROUP BY game
ORDER BY nb_comments DESC
LIMIT 1;

-- Game with the best grade
SELECT  G.name as game, SUM(O.mark)/COUNT(G.name) as average_mark  FROM OPINION O
JOIN CONFIGURATION C on O.id_configuration = C.id
JOIN GAME G on C.id_game = G.id
GROUP BY G.name
ORDER BY average_mark DESC
LIMIT 1;


-- Most prolific editor
SELECT editor, COUNT(editor) as nb_game FROM GAME
GROUP BY editor
ORDER BY nb_game DESC
LIMIT 1;

-- Most active players
SELECT P.pseudo as player, COUNT(P.id) as nb_comments FROM OPINION O
JOIN PLAYER P on O.id_player = P.id
GROUP BY P.pseudo
ORDER BY nb_comments DESC
LIMIT 5;