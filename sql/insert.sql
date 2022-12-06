-- =============================================================
-- PERSON
-- =============================================================
DELIMITER $$
CREATE FUNCTION addPerson (a_first_name VARCHAR(100), a_last_name VARCHAR(100))
    RETURNS INT
    DETERMINISTIC
BEGIN
    INSERT IGNORE INTO PERSON (name, last_name)
    VALUES (a_first_name, a_last_name);
    RETURN 0;
END; $$

delimiter ;

SELECT addPerson('*', '*');
SELECT addPerson('Amaury', 'Clochard');
SELECT addPerson       ('Edmee', 'Pichette');
SELECT addPerson('Axel', 'Petit');
SELECT addPerson('Jessamine', 'Lagrange');
SELECT addPerson('Louise', 'Bondy');
SELECT addPerson('Alma', 'Taylor');
SELECT addPerson('Kristen', 'Fink');
SELECT addPerson('Richard', 'Quintana');
SELECT addPerson('Shyla', 'Todd');
SELECT addPerson('Edwin', 'Parker');

-- =============================================================
-- PLAYER
-- =============================================================

DELIMITER $$
CREATE FUNCTION addPlayer (a_name VARCHAR(100), a_lastname VARCHAR(100), a_pseudo VARCHAR(40), a_mail VARCHAR(100))
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE mail_exist INT;
    DECLARE pseudo_exist INT;
    DECLARE id_person INT;
    SELECT count(*) INTO mail_exist FROM PERSON where mail=a_mail;
    IF mail_exist = 0
    THEN
        SELECT count(*) INTO pseudo_exist FROM PLAYER where pseudo=a_pseudo;
        IF pseudo_exist = 0
        THEN
            SELECT id into id_person
                FROM PERSON where last_name = a_lastname AND name = a_name;
            IF  id_person IS NOT NULL
            THEN
                INSERT INTO PLAYER (id, pseudo)
                    VALUES (id_person, a_pseudo);

            ELSE
                INSERT INTO PERSON (last_name, name, mail)
                    VALUES (a_lastname, a_name, mail);
                INSERT INTO PLAYER (id, pseudo)
                    VALUES ((SELECT id FROM PERSON where last_name = a_lastname AND name = a_name), a_pseudo);
            END IF;
        ELSE
            RETURN -1;
        END IF;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;
END; $$

delimiter ;

 SELECT addPlayer ('*','*' ,'Anonyme', null);
 SELECT addPlayer ('Amaury', 'Clochard', 'amo666', 'amaury.clocahrd@gmail.com');
SELECT addPlayer('Theo', 'Facen', 'facenboy', 'theo.facen@gmail.com');
 SELECT addPlayer ('Edmee', 'Pichette', 'pichette', 'edmee.pichette@gmail.com');
 SELECT addPlayer ('Jessamine', 'Lagrange', 'jeje00', 'jessamine.lagrange@gmail.com');
 SELECT addPlayer (  'Baptiste', 'Huot', 'babou', 'baptiste.huot@gmail.com');
 SELECT addPlayer ('Louise', 'Bondy', 'louB', 'louise.bondy@gmail.com');
 SELECT addPlayer ('Alma', 'Taylor', 'tayyyy', 'alma.taylor@gmail.com');
 SELECT addPlayer ('Floyd','Maccurdy', 'Flo', 'Floyd.Maccurdy@gmail.com');
 SELECT addPlayer ('Shyla', 'Todd', 'Shyyyl', 'shyla.todd@gmail.com');
 SELECT addPlayer ('Edwin', 'Parker', 'Eder', 'edwin.parker@gmail.com');
 SELECT addPlayer ('Gaetan', 'Goulet','Gaetan13', 'gaetan.goulet@gmail.com');
-- =============================================================
-- GAME
-- =============================================================
/*DELIMITER $$
CREATE FUNCTION addGame (a_name VARCHAR(40), a_duration INT, a_editor VARCHAR(40), max INT, min INT)
    RETURNS INT

BEGIN
INSERT IGNORE INTO GAME (name, nb_player_min, nb_player_max, editor, duration, expansion)
    VALUES (a_name, min, max, a_editor, a_duration, null);
    RETURN 0;
END; $$

delimiter ;*/

DELIMITER $$
CREATE FUNCTION addGame (a_name VARCHAR(40), a_duration INT, an_expansion VARCHAR(40), an_editor VARCHAR(40), max INT, min INT)
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE exist_game INT;
    IF an_expansion IS NULL
    THEN
        INSERT IGNORE INTO GAME (name, nb_player_min, nb_player_max, editor, duration, expansion)
        VALUES (a_name, min, max, an_editor, a_duration, null);
    ELSE
        SELECT count(*) INTO exist_game FROM GAME WHERE name=an_expansion;
        IF exist_game = 0
        THEN
            RETURN -1;
        END IF;
        INSERT IGNORE INTO GAME (name, nb_player_min, nb_player_max, editor, duration, expansion)
        VALUES (a_name, min, max, an_editor, a_duration, an_expansion);
    END IF;
    RETURN 0;

END; $$

DELIMITER ;

SELECT addGame ('CLUEDO', 15, null, 'HASBRO', 6, 3);
SELECT addGame ('UNO', 15, null, 'MATTEL',10 , 2);
SELECT addGame ('ECHEC', 30, null, 'inconnu', 2, 2);
SELECT addGame ('LEAGUE OF LEGENDS', 35, null,  'RIOT GAMES', 10, 2);
SELECT addGame ('ROCKET LEAGUE', 15, null, 'PSYONIX', 6, 3);
SELECT addGame ('7WONDERS', 40, null, 'Repos Production', 7, 3);
SELECT addGame ('7WONDERS-ARMADA', 40, '7WONDERS', 'Repos Production', 7, 3);
SELECT addGame ('MILLE BORNES', 45, null, 'WINNING MOVES', 6, 2);
SELECT addGame ('ORICHALQUE', 45, null, 'Catch Up Games', 4, 2);
SELECT addGame ('GLORY', 90, null, 'Super Meeple', 4, 1);


-- =============================================================
-- GAMEBYAUTHOR
-- =============================================================
INSERT INTO AUTHOR (id_person, id_game)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (2, 2),
       (2, 5),
       (2, 6),
       (2, 7),
       (2, 8),
       (1, 9),
       (4, 3),
       (4, 8);

-- add author
DELIMITER $$
CREATE FUNCTION addGameAuthor (a_name VARCHAR(40),
                                    author_lastname VARCHAR(100),author_name VARCHAR(100))
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE id_author INT;
    DECLARE id_game INT;

    SELECT id into id_game
    FROM GAME where name=a_name;
    SELECT id into id_author
    FROM PERSON where last_name = author_lastname AND name = author_name;
    IF id_game IS NOT NULL
    THEN
        IF  id_author IS NOT NULL
        THEN
            INSERT IGNORE INTO AUTHOR  (id_person, id_game) VALUES (id_author, id_game);
            RETURN 0;
        ELSE
            INSERT INTO PERSON (last_name, name)  VALUES (author_lastname, author_name);
            INSERT INTO AUTHOR (id_person, id_game)
            VALUES ((SELECT id FROM PERSON where last_name = author_lastname AND name = author_name), id_game);
            RETURN 0;
        END IF;

    END IF;
    RETURN -1;
END; $$

DELIMITER ;
-- =============================================================
-- GAMEBYILLUSTRATOR
-- =============================================================
INSERT INTO ILLUSTRATOR (id_person, id_game)
VALUES (3, 1),
       (3, 2),
       (6, 1),
       (6, 2),
       (6, 3),
       (7, 1),
       (7, 4),
       (7, 5),
       (10, 4),
       (10, 5),
       (10, 6),
       (10, 8),
       (13, 7),
       (13, 8),
       (13, 9),
       (13, 10);

-- add illustrator
DELIMITER $$
CREATE FUNCTION addGameIllustrator (a_name VARCHAR(40),
                    illustrator_lastname VARCHAR(100),illustrator_name VARCHAR(100))
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE id_illustrator INT;
    DECLARE id_game INT;

SELECT id into id_game
    FROM GAME where name=a_name;
SELECT id into id_illustrator
    FROM PERSON where last_name = illustrator_lastname AND name = illustrator_name;
IF id_game IS NOT NULL
THEN
    IF  id_illustrator IS NOT NULL
        THEN
        INSERT IGNORE INTO ILLUSTRATOR (id_person, id_game)  VALUES (id_illustrator, id_game);
    RETURN 0;
    ELSE
        INSERT INTO PERSON (last_name, name)  VALUES (illustrator_lastname, illustrator_name);
        INSERT IGNORE INTO ILLUSTRATOR (id_person, id_game)
        VALUES ((SELECT id FROM PERSON where last_name = illustrator_lastname AND name = illustrator_name), id_game);
    END IF;
    RETURN 0;
    END IF;
RETURN -1;
END; $$

DELIMITER ;

-- =============================================================
-- CONFIGURATION
-- =============================================================
DELIMITER $$
CREATE FUNCTION addConfiguration (a_game_name VARCHAR(40), a_nb_players INT)
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE max INT;
    DECLARE min INT;
    DECLARE id_game INT;
    SELECT nb_player_max INTO max FROM GAME where name=a_game_name;
    SELECT nb_player_min INTO min FROM GAME where name=a_game_name;
    SELECT id INTO id_game FROM GAME WHERE name=a_game_name;
    IF a_nb_players >= min  AND a_nb_players <= max AND id_game IS NOT NULL
    THEN
        INSERT IGNORE INTO CONFIGURATION (id_game, nb_players)
        VALUES (id_game, a_nb_players);
        RETURN 0;
    END IF;
    RETURN -1;
END; $$

DELIMITER ;

SELECT addConfiguration ('UNO', 2);
SELECT addConfiguration ('UNO', 3);
SELECT addConfiguration ('UNO', 4);
SELECT addConfiguration ('UNO', 5);
SELECT addConfiguration ('UNO', 6);
SELECT addConfiguration ('ECHEC', 2);
SELECT addConfiguration ('LEAGUE OF LEGENDS', 10);
SELECT addConfiguration ('LEAGUE OF LEGENDS', 2);
SELECT addConfiguration ('7WONDERS', 4);
SELECT addConfiguration ('7WONDERS', 5);
SELECT addConfiguration ('ROCKET LEAGUE', 2);
SELECT addConfiguration ('ROCKET LEAGUE', 3);
SELECT addConfiguration ('ROCKET LEAGUE', 4);
SELECT addConfiguration ('MILLE BORNES', 2);
SELECT addConfiguration ('MILLE BORNES', 3);
SELECT addConfiguration ('MILLE BORNES', 4);
SELECT addConfiguration ('ORICHALQUE', 2);
SELECT addConfiguration ('ORICHALQUE', 3);
SELECT addConfiguration ('ORICHALQUE', 4);
SELECT addConfiguration ('GLORY', 2);
SELECT addConfiguration ('GLORY', 3);

-- =============================================================
-- OPINION
-- =============================================================

DELIMITER $$
CREATE FUNCTION addOpinion (a_nb_players INT, game_name VARCHAR(40), a_pseudo VARCHAR(40), a_message VARCHAR(100), a_mark INT, a_date DATE)
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE id_config INT;
    DECLARE a_id_player INT;
    DECLARE a_id_game INT;
    DECLARE created INT;
    SELECT id INTO a_id_player FROM PLAYER WHERE pseudo=a_pseudo;
    SELECT id INTO a_id_game FROM GAME where name=game_name;
    IF a_id_player IS NOT NULL AND a_mark<=20 AND a_mark>=0
    THEN
        SELECT id INTO id_config FROM CONFIGURATION
        where id_game=a_id_game AND nb_players=a_nb_players;
        IF id_config IS NULL
        THEN
            SELECT addConfiguration (game_name, a_nb_players) INTO created;
            IF created = -1
            THEN
                RETURN -1;
            END IF;
            SELECT id INTO id_config FROM CONFIGURATION
            where id_game=(SELECT id FROM GAME where name=game_name) AND nb_players=a_nb_players;
        END IF;
        IF ( SELECT count(*) from OPINION O
                                      JOIN CONFIGURATION C on C.id = O.id_configuration where O.id_player=a_id_player AND C.id_game=a_id_game) = 0
        THEN
            INSERT IGNORE INTO OPINION (id_configuration, id_player, message, mark, date)
            VALUES (id_config, a_id_player, a_message, a_mark, a_date);
            RETURN 0;
        END IF;
    END IF;
    RETURN -1;
END; $$

DELIMITER ;


SELECT addOpinion(4, 'UNO', 'amo666',  'nice game', 17,'2018-09-24');
SELECT addOpinion(5, 'UNO', 'Flo','Ce jeu est génial', 18, '2000-11-03');
SELECT addOpinion(2, 'ECHEC', 'Anonyme','Incroyable', 19, '2000-11-03');
SELECT addOpinion(2, 'ECHEC', 'amo666', 'Pas mal', 15, '2005-11-03');
SELECT addOpinion(2, 'ECHEC', 'Flo', 'Bof', 15, '2005-11-03');
SELECT addOpinion(5, 'CLUEDO' , 'amo666', 'Un peu repétitif', 12, '2005-11-03');
SELECT addOpinion(6, 'CLUEDO', 'Eder', 'Pas super', 10, '2005-11-03');
SELECT addOpinion(4, '7WONDERS', 'Shyyyl','Jeu moyen', 10, '2005-11-03');
SELECT addOpinion(5, 'CLUEDO', 'Shyyyl', 'J\'adore' , 17, '2005-11-03');
SELECT addOpinion(6, 'CLUEDO', 'Gaetan13', 'Super', 15, '2005-11-03');
SELECT addOpinion(4, '7WONDERS', 'babou','Un peu long', 10, '2005-11-03');
SELECT addOpinion(5, 'MILLE BORNES' , 'Shyyyl', 'Trop dur', 7, '2005-11-03');
SELECT addOpinion(4, 'MILLE BORNES' , 'babou','Mécanique de jeu riches', 15, '2005-11-03');
SELECT addOpinion(6, 'MILLE BORNES' , 'amo666', 'Très stratégique', 15, '2005-11-03');
SELECT addOpinion(5, 'GLORY' , 'babou','Trop compliqué', 8, '2005-11-03');
SELECT addOpinion(5, 'CLUEDO', 'pichette','Jeu difficile', 15, '2005-11-03');
SELECT addOpinion(1, 'GLORY', 'pichette' , 'Jeu de patience', 15, '2005-11-03');
SELECT addOpinion(7, '7WONDERS-ARMADA', 'jeje00', 'Il faut garder son calme', 11, '2000-11-03');
SELECT addOpinion(5, 'LEAGUE OF LEGENDS', 'pichette', 'Fait perdre patience', 6, '2000-11-03');
SELECT addOpinion(4, 'LEAGUE OF LEGENDS', 'tayyyy', 'Jeu amusant', 13, '2000-11-03');
SELECT addOpinion(2, 'ROCKET LEAGUE', 'tayyyy', 'Bof bof', 9, '2000-11-03');
SELECT addOpinion(3, 'ROCKET LEAGUE', 'jeje00', 'Super sympa', 16, '2000-11-03');
SELECT addOpinion(3, 'ROCKET LEAGUE', 'Eder', 'Idéal entre amis', 13, '2000-11-03');
SELECT addOpinion(4, 'ORICHALQUE', 'jeje00', 'Super soirée grâce a ce jeu', 14, '2000-11-03');
SELECT addOpinion(4, 'ORICHALQUE', 'pichette', 'On adore !', 16, '2000-11-03');
SELECT addOpinion(2, 'ECHEC', 'pichette', 'Ce jeu est nul', 3, '2000-11-03');
SELECT addOpinion(2, 'ECHEC', 'jeje00','Meilleur jeu auquel j ai joué', 18, '2008-05-03');
SELECT addOpinion(4, '7WONDERS-ARMADA', 'tayyyy','Un peu long', 10, '2006-03-17');



-- =============================================================
-- RELEVANT
-- =============================================================

DELIMITER $$
CREATE FUNCTION addRelevant (a_pseudo VARCHAR(40), a_id_opinion INT,  positive BOOLEAN)
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE a_id_player INT;


    IF  positive= true OR positive= false AND (SELECT id FROM OPINION WHERE id = a_id_opinion) IS NOT NULL
    THEN
        SELECT id INTO a_id_player FROM PLAYER WHERE pseudo=a_pseudo;
        IF a_id_player IS NOT NULL
        THEN
            IF (SELECT count(*) FROM RELEVANT WHERE id_player=a_id_player AND id_opinion = a_id_opinion) = 0
            THEN
                INSERT INTO RELEVANT(id_player, id_opinion, is_positive) VALUES (a_id_player, a_id_opinion, positive);
                RETURN 0;
            END IF;
        END IF;
    END IF;
    RETURN -1;
END; $$

DELIMITER ;

SELECT  addRelevant ('amo666', 1, true);
SELECT  addRelevant ('amo666', 2, false);
SELECT  addRelevant ('amo666', 6, false);
SELECT  addRelevant ('amo666', 3, true);
SELECT  addRelevant ('amo666', 7, false);
SELECT  addRelevant ('amo666', 4, true);
SELECT  addRelevant ('amo666', 5, false);
SELECT  addRelevant ('Flo', 14, true);
SELECT  addRelevant ('Flo', 4, false);
SELECT  addRelevant ('Shyyyl', 6, false);
SELECT  addRelevant ('pichette', 3, true);
SELECT  addRelevant ('pichette', 7, false);
SELECT  addRelevant ('louB', 4, true);
SELECT  addRelevant ('pichette', 5, false);
SELECT  addRelevant ('jeje00', 1, true);
SELECT  addRelevant ('jeje00', 2, false);
SELECT  addRelevant ('Flo', 2, false);
SELECT  addRelevant ('Flo', 20, true);
SELECT  addRelevant ('amo666', 7, false);
SELECT  addRelevant ('pichette', 4, true);
SELECT  addRelevant ('louB', 5, false);
SELECT  addRelevant ('pichette', 1, true);
SELECT  addRelevant ('Gaetan13', 15, false);
SELECT  addRelevant ('louB', 6, false);
SELECT  addRelevant ('facenboy', 3, true);
SELECT  addRelevant ('Gaetan13', 10, false);
SELECT  addRelevant ('Shyyyl', 4, true);
SELECT  addRelevant ('facenboy', 5, false);
SELECT  addRelevant ('pichette', 12, false);
SELECT  addRelevant ('jeje00', 11, true);
SELECT  addRelevant ('facenboy', 14, false);
SELECT  addRelevant ('Gaetan13', 8, false);
SELECT  addRelevant ('Gaetan13', 20, true);
SELECT  addRelevant ('amo666', 7, false);
SELECT  addRelevant ('facenboy', 4, true);
SELECT  addRelevant ('Gaetan13', 5, false);
SELECT  addRelevant ('facenboy', 1, true);
SELECT  addRelevant ('Flo', 15, false);
SELECT  addRelevant ('louB', 6, false);
SELECT  addRelevant ('pichette', 3, true);
SELECT  addRelevant ('Flo', 10, false);
SELECT  addRelevant ('Shyyyl', 4, true);
SELECT  addRelevant ('Shyyyl', 5, false);





-- =============================================================
-- THEME
-- =============================================================
INSERT INTO THEME (name)
VALUES ('Pirate'),
       ('Egypte'),
       ('Espace'),
       ('Fantaisie'),
       ('Guerre'),
       ('Moderne'),
       ('Ancien'),
       ('Manoir'),
       ('Voiture');

-- add theme to a game

DELIMITER $$
CREATE FUNCTION addGameTheme (a_name VARCHAR(40),
                               theme_name VARCHAR(40))
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE a_id_theme INT;
    DECLARE a_id_game INT;

    SELECT id into a_id_game
        FROM GAME where name=a_name;
    SELECT id into a_id_theme
        FROM THEME where name=theme_name;
    IF a_id_game IS NOT NULL
    THEN
        IF  a_id_theme IS NOT NULL
        THEN
            INSERT IGNORE INTO GAMESBYTHEME (id_game, id_theme)  VALUES (a_id_game, a_id_theme);
            RETURN 0;
        ELSE
            INSERT INTO THEME (name)
            VALUES (theme_name);
            INSERT INTO GAMESBYTHEME (id_game, id_theme)
                VALUES (a_id_game,(SELECT id FROM THEME where name=theme_name));
            RETURN 0;
        END IF;

    END IF;
    RETURN -1;
END; $$

DELIMITER ;
-- =============================================================
-- GAMESBYTHEME
-- =============================================================

INSERT INTO GAMESBYTHEME (id_game, id_theme)
VALUES (1, 8),
       (4, 4),
       (5, 9),
       (6, 1),
       (6, 2),
       (6, 4),
       (7, 2),
       (7, 4),
       (8, 9),
       (9, 5),
       (10, 5);
-- =============================================================
-- CATEGORY
-- =============================================================
INSERT INTO CATEGORY (name)
VALUES ('Stratégie'),
       ('Réflexion'),
       ('Rapidité'),
       ('Coopération'),
       ('Patience');


-- add category to game
DELIMITER $$
CREATE FUNCTION addGameCategory (a_name VARCHAR(40),
                              cat_name VARCHAR(40))

    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE a_id_category INT;
    DECLARE a_id_game INT;

    SELECT id into a_id_game
    FROM GAME where name=a_name;
    SELECT id into a_id_category
    FROM CATEGORY where name=cat_name;
    IF a_id_game IS NOT NULL
    THEN
        IF  a_id_category IS NOT NULL
        THEN
            INSERT IGNORE INTO GAMESBYCATEGORY (id_game, id_category)  VALUES (a_id_game, a_id_category);
            RETURN 0;
        ELSE
            INSERT INTO CATEGORY (name)
                VALUES (cat_name);
            INSERT INTO GAMESBYCATEGORY (id_game, id_category)
            VALUES (a_id_game, (SELECT id FROM CATEGORY where name=cat_name));
            RETURN 0;
        END IF;

    END IF;
    RETURN -1;
END; $$

DELIMITER ;
-- =============================================================
-- GAMESBYCATEGORY
-- =============================================================
INSERT INTO GAMESBYCATEGORY (id_game, id_category)
VALUES (1, 1),
       (2, 3),
       (3, 1),
       (3, 2),
       (4, 2),
       (4, 4),
       (5, 4),
       (6, 2),
       (7, 2),
       (8, 1),
       (9, 1),
       (10, 1);

-- =============================================================
-- FAVORITECATEGORIES
-- =============================================================

-- add favorite category to player
DELIMITER $$
CREATE FUNCTION addFavoriteCategory (a_pseudo VARCHAR(40),
                                 cat_name VARCHAR(40))
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE a_id_category INT;
    DECLARE a_id_player INT;

    SELECT id into a_id_player
    FROM PLAYER where pseudo=a_pseudo;
    SELECT id into a_id_category
    FROM CATEGORY where name=cat_name;
    IF a_id_player IS NOT NULL
    THEN
        IF  a_id_category IS NOT NULL
        THEN
            INSERT IGNORE INTO FAVORITECATEGORIES (id_player, id_category)  VALUES (a_id_player, a_id_category);
            RETURN 0;
        END IF;

    END IF;
    RETURN -1;
END; $$

DELIMITER ;

SELECT addFavoriteCategory ('amo666', 'Coopération');
SELECT addFavoriteCategory ('Flo', 'Rapidité');
SELECT addFavoriteCategory ('Facenboy', 'Coopération');
SELECT addFavoriteCategory ('Facenboy', 'Rapidité');
SELECT addFavoriteCategory ('Gaetan13', 'Coopération');
SELECT addFavoriteCategory ('Gaetan13', 'Stratégie');
SELECT addFavoriteCategory ('babou', 'Stratégie');


-- =============================================================
-- FAVORITETHEMES
-- =============================================================
-- add favorite category to player
DELIMITER $$
CREATE FUNCTION addFavoriteTheme (a_pseudo VARCHAR(40),
                                     theme_name VARCHAR(40))
    RETURNS INT
    DETERMINISTIC

BEGIN
    DECLARE a_id_theme INT;
    DECLARE a_id_player INT;

    SELECT id into a_id_player
        FROM PLAYER where pseudo=a_pseudo;
    SELECT id into a_id_theme
        FROM THEME where name=theme_name;
    IF a_id_player IS NOT NULL
    THEN
        IF  a_id_theme IS NOT NULL
        THEN
            INSERT IGNORE INTO FAVORITETHEMES (id_player, id_theme)  VALUES (a_id_player, a_id_theme);
            RETURN 0;
        END IF;

    END IF;
    RETURN -1;
END; $$

DELIMITER ;

SELECT addFavoriteTheme ('amo666', 'Pirate');
SELECT addFavoriteTheme ('Flo', 'Espace');
SELECT addFavoriteTheme ('Facenboy','Espace');
SELECT addFavoriteTheme ('Facenboy', 'Guerre');
SELECT addFavoriteTheme ('Gaetan13','Guerre');
SELECT addFavoriteTheme ('Gaetan13', 'Voiture');
SELECT addFavoriteTheme ('babou', 'Voiture');