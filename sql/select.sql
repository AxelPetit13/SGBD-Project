-- ============================================
-- PERSON
-- ============================================
-- Get all PERSON
SELECT * FROM PEOPLE;

-- Get one PERSON
SELECT * FROM PEOPLE
WHERE id = ${id};

-- Get all authors
SELECT * FROM PEOPLE JOIN AUTHORS G on PEOPLE.id = G.id_person;

-- Get all illustrators
SELECT * FROM PEOPLE JOIN ILLUSTRATORS G on PEOPLE.id = G.id_person;

-- Get favorites themes for all players
SELECT P.id, P.pseudo, T.id, T.name FROM PLAYERS P, FAVORITETHEMES F JOIN THEMES T on F.id_theme = T.id
WHERE P.id = F.id_player
ORDER BY P.id;

-- Get favorites categories for all players
SELECT P.id, P.pseudo, C.id, C.name FROM PLAYERS P, FAVORITECATEGORIES F JOIN CATEGORIES C on F.id_category = C.id
WHERE P.id = F.id_player
ORDER BY P.id;

-- Get favorites themes by players
SELECT T.* FROM THEMES T JOIN FAVORITETHEMES F on T.id = F.id_theme JOIN PLAYERS P on F.id_player = P.id WHERE P.id = 2;

-- GET favorites categories by players
SELECT C.* FROM CATEGORIES C JOIN FAVORITECATEGORIES F on C.id = F.id_category JOIN PLAYERS P on F.id_player = P.id WHERE P.id = 2;



-- ============================================
-- PLAYERS
-- ============================================
-- Get all players
SELECT * FROM PLAYERS;

-- Get all players with informations on the person behind
SELECT * FROM PLAYERS JOIN PEOPLE on PLAYERS.id = PEOPLE.id;

-- Get games played by person
SELECT G.* FROM GAMES G
JOIN OPINIONS O ON O.id_configuration
JOIN CONFIGURATIONS C on O.id_configuration = C.id
JOIN PLAYERS P on O.id_player = P.id
WHERE C.id_game = G.id
AND P.id = '$id_player';

-- ============================================
-- GAME
-- ============================================
-- Get all games
SELECT * FROM GAMES;

-- Get all games by author
SELECT GAMES.* FROM GAMES JOIN AUTHORS A on GAMES.id = A.id_game;

-- Get all games by illustrator
SELECT GAMES.* FROM GAMES JOIN ILLUSTRATORS I on GAMES.id = I.id_game;

-- Get games by catégories
SELECT GAMES.* FROM GAMES JOIN GAMESBYCATEGORIES ON GAMES.id = GAMESBYCATEGORIES.id_game JOIN CATEGORIES C on GAMESBYCATEGORIES.id_category = C.id
WHERE C.name IN ('$1', '$2', '$3', '$4');

-- Get games by themes
SELECT GAMES.* FROM GAMES JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id
WHERE T.name IN ('$1', '$2', '$3', '$4');

-- Get games by theme and catagories
SELECT GAMES.* FROM GAMES
    JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game
    JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id
    JOIN GAMESBYCATEGORIES ON GAMES.id = GAMESBYCATEGORIES.id_game
    JOIN CATEGORIES C on GAMESBYCATEGORIES.id_category = C.id
WHERE C.name IN ('$1', '$2', '$3', '$4')
  AND T.name IN ('$1', '$2', '$3', '$4');

-- ============================================
-- OPINION
-- ============================================
-- Get all themes
SELECT * from THEMES;

-- ============================================
-- OPINION
-- ============================================
-- Get all opinions
SELECT * FROM OPINIONS;

-- GET all opinions with detail
SELECT O.id, G.name, O.message, P.pseudo, O.mark, O.date  FROM OPINIONS O
    JOIN PLAYERS P on O.id_player = P.id
    JOIN CONFIGURATIONS C on O.id_configuration = C.id
    JOIN GAMES G on C.id_game = G.id;

-- Get all opinion from a player
SELECT O.* FROM OPINIONS O
JOIN PLAYERS P on O.id_player = P.id
WHERE P.id = '$id_player';
-- ====================================================================================================================
-- ============================================
-- CONSULTATION
-- ============================================
-- The set of featured games available in a given theme, categorized by mechanics
SELECT G.*, C2.name FROM OPINIONS O
     JOIN CONFIGURATIONS C on O.id_configuration = C.id
     JOIN GAMES G on C.id_game = G.id
     JOIN GAMESBYTHEMES G2 on G.id = G2.id_game
     JOIN THEMES T on G2.id_theme = T.id
     JOIN GAMESBYCATEGORIES  G3 on G.id = G3.id_game
     JOIN CATEGORIES C2 on G3.id_category = C2.id
WHERE T.id = '$id_theme'
GROUP BY G.id, C2.name
ORDER BY C2.name;

-- For a given player, the list of comments referring to a game in one of its favorite categories
SELECT O.* FROM OPINIONS O
    JOIN CONFIGURATIONS C on O.id_configuration = C.id
    JOIN GAMES G on C.id_game = G.id
    JOIN FAVORITECATEGORIES F on O.id_player = F.id_player
    JOIN PLAYERS P on O.id_player = P.id
WHERE P.pseudo = '$pseudo' AND F.id_category = '$id_category';

-- For a comment, the list of players who liked it.
SELECT PLAYERS.* FROM PLAYERS
    JOIN RELEVANTS R on PLAYERS.id = R.id_player
    JOIN OPINIONS O on R.id_opinion = O.id
WHERE O.id='$id_opinion' AND is_positive = true;
-- ============================================
-- STATS
-- ============================================
-- List of player, by number of games they marked
SELECT P.*, COUNT(*) FROM PLAYERS P JOIN OPINIONS O on P.id = O.id_player
GROUP BY P.id;

-- confidence index
SELECT id_opinion,  (1 + SUM(is_positive))/(1 + COUNT(is_positive) - SUM( is_positive)) as confidence_index FROM RELEVANTS
GROUP BY RELEVANTS.id_opinion
ORDER BY confidence_index DESC;

-- List of n most recent comments
SELECT * FROM OPINIONS
ORDER BY OPINIONS.date DESC
LIMIT '$n';

-- List of n most recent comments with details
SELECT P.pseudo as author, O.message, O.mark, O.date, CONFIDENCE.confidence_index FROM OPINIONS O
JOIN PLAYERS P on O.id_player = P.id
JOIN (SELECT id_opinion,  (1 + SUM(is_positive))/(1 + COUNT(is_positive) - SUM( is_positive)) as confidence_index FROM RELEVANTS
     GROUP BY RELEVANTS.id_opinion
     ORDER BY confidence_index DESC) as CONFIDENCE ON CONFIDENCE.id_opinion = O.id
ORDER BY O.date DESC
LIMIT '$n';

-- Most rated comment
SELECT O.*, COUNT(*) AS times_rated FROM RELEVANTS
JOIN OPINIONS O on RELEVANTS.id_opinion = O.id
GROUP BY O.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- Most rated comment with detail
SELECT P.id, P.pseudo, G.id, G.name, O.id, O.message, O.mark, O.date, COUNT(*) AS times_rated FROM RELEVANTS
JOIN OPINIONS O ON RELEVANTS.id_opinion = O.id
JOIN CONFIGURATIONS C ON O.id_configuration = C.id
JOIN GAMES G ON C.id_game = G.id
JOIN PLAYERS P ON P.id = O.id_player
GROUP BY O.id
ORDER BY COUNT(*) DESC
LIMIT 1;

-- get pourcentage représentation of each theme
SELECT T.name, count(T.name), count(T.name) / (SELECT COUNT(*) FROM THEMES) as '%' FROM GAMES
JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game
JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id
GROUP BY T.name;

-- Most commented game
SELECT G.name as game, COUNT(G.id) as nb_comments FROM GAMES G
JOIN CONFIGURATIONS C on G.id = C.id_game
JOIN OPINIONS O ON O.id_configuration = C.id
GROUP BY game
ORDER BY nb_comments DESC
LIMIT 1;

-- Game with the best grade
SELECT  G.name as game, SUM(O.mark)/COUNT(G.name) as average_mark  FROM OPINIONS O
JOIN CONFIGURATIONS C on O.id_configuration = C.id
JOIN GAMES G on C.id_game = G.id
GROUP BY G.name
ORDER BY average_mark DESC
LIMIT 1;


-- Most prolific editor
SELECT editor, COUNT(editor) as nb_game FROM GAMES
GROUP BY editor
ORDER BY nb_game DESC
LIMIT 1;

-- Most active players
SELECT P.pseudo as player, COUNT(P.id) as nb_comments FROM OPINIONS O
JOIN PLAYERS P on O.id_player = P.id
GROUP BY P.pseudo
ORDER BY nb_comments DESC
LIMIT 5;