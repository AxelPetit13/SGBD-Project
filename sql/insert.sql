-- =============================================================
-- PERSON
-- =============================================================
INSERT INTO PERSON (name, last_name)
VALUES ('*', '*'),
       ('Amaury', 'Clochard'),
       ('Théo', 'Facen'),
       ('Edmee', 'Pichette'),
       ('Axel', 'Petit'),
       ('Jessamine', 'Lagrange'),
       ('Baptiste', 'Huot'),
       ('Louise', 'Bondy'),
       ('Alma', 'Taylor'),
       ('Floyd', 'MacCurdy'),
       ('Kristen', 'Fink'),
       ('Richard', 'Quintana'),
       ('Shyla', 'Todd'),
       ('Edwin', 'Parker'),
       ('Gaetan', 'Goulet');

DELIMITER $$
CREATE FUNCTION addPerson (a_first_name VARCHAR(100), a_last_name VARCHAR(100))
    RETURNS INT
BEGIN
    INSERT IGNORE INTO PERSON (name, last_name)
    VALUES (a_first_name, a_last_name);
    RETURN 0;
END; $$

delimiter ;

-- =============================================================
-- PLAYER
-- =============================================================
INSERT INTO PLAYER (id, pseudo, mail)
VALUES (1, 'Anonyme', null),
        (2, 'amo666', 'amaury.clocahrd@gmail.com'),
       (3, 'facenboy', 'theo.facen@gmail.com'),
       (4, 'pichette', 'edmee.pichette@gmail.com'),
       (6, 'jeje00', 'jessamine.lagrange@gmail.com'),
       (7, 'babou', 'baptiste.huot@gmail.com'),
       (8, 'louB', 'louise.bondy@gmail.com'),
       (10, 'tayyyy', 'alma.taylor@gmail.com'),
       (11, 'Flo', 'Floyd.Maccurdy@gmail.com'),
       (13, 'Shyyyl', 'shyla.todd@gmail.com'),
       (14, 'Eder', 'edwin.parker@gmail.com'),
       (15, 'Gaetan13', 'gaetan.goulet@gmail.com');

DELIMITER $$
CREATE FUNCTION addPlayer (a_name VARCHAR(100), a_lastname VARCHAR(100), a_pseudo VARCHAR(40), a_mail VARCHAR(100))
    RETURNS INT

BEGIN
    DECLARE mail_exist INT;
    DECLARE pseudo_exist INT;
    DECLARE id_person INT;
    SELECT count(*) INTO mail_exist FROM PLAYER where mail=a_mail;
    IF mail_exist = 0
    THEN
        SELECT count(*) INTO pseudo_exist FROM PLAYER where pseudo=a_pseudo;
        IF pseudo_exist = 0
        THEN
            SELECT id into id_person
                FROM PERSON where last_name = a_lastname AND name = a_name;
            IF  id_person IS NOT NULL
            THEN
                INSERT INTO PLAYER (id, pseudo, mail)
                    VALUES (id_person, a_pseudo, a_mail);

            ELSE
                INSERT INTO PERSON (last_name, name)
                    VALUES (a_lastname, a_name);
                INSERT INTO PLAYER (id, pseudo, mail)
                    VALUES ((SELECT id FROM PERSON where last_name = a_lastname AND name = a_name), a_pseudo, a_mail);
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
-- =============================================================
-- GAME
-- =============================================================
INSERT INTO GAME (name, nb_player_min, nb_player_max, duration, editor, expansion)
VALUES ('CLUEDO', 3, 6, 15, 'HASBRO', null),
       ('UNO', 4, 8, 15, 'MATTEL', null),
       ('ECHEC', 2, 2, 30, 'inconnu', null),
       ('LEAGUE OF LEGENDS', 2, 10, 35, 'RIOT GAMES', null),
       ('ROCKET LEAGUE', 1, 4, 15, 'PSYONIX', null),
       ('7WONDERS', 3, 7, 40, 'Repos Production', null),
       ('7WONDERS-ARMADA', 3, 7, 40, 'Repos Production', '7WONDERS'),
       ('MILLE BORNES', 2, 6, 45, 'WINNING MOVES', null),
       ('ORICHALQUE', 2, 4, 45, 'Catch Up Games', null),
       ('GLORY', 1, 4, 90, 'Super Meeple', null);

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
CREATE FUNCTION addGame (a_name VARCHAR(40), a_duration INT,
 illustrator_lastname VARCHAR(100),illustrator_name VARCHAR(100),  author_lastname VARCHAR(100), author_name VARCHAR(100), a_editor VARCHAR(40), max INT, min INT)
    RETURNS INT

BEGIN
    DECLARE id_illustrator INT;
    DECLARE id_author INT;
    INSERT IGNORE INTO GAME (name, nb_player_min, nb_player_max, editor, duration, expansion)
        VALUES (a_name, min, max, a_editor, a_duration, null);

    -- add illustrator
    SELECT id into id_illustrator
        FROM PERSON where last_name = illustrator_lastname AND name = illustrator_name;
    IF  id_illustrator IS NOT NULL
    THEN
        INSERT INTO ILLUSTRATOR (id_person, id_game)  VALUES (id_illustrator, (SELECT id FROM GAME where name=a_name));
    ELSE
        INSERT INTO PERSON (last_name, name)  VALUES (illustrator_lastname, illustrator_name);
        INSERT INTO ILLUSTRATOR (id_person, id_game)
            VALUES ((SELECT id FROM PERSON where last_name = illustrator_lastname AND name = illustrator_name), (SELECT id FROM GAME where name=a_name));
    END IF;

    -- add author
    SELECT id into id_author
    FROM PERSON where last_name = author_lastname AND name = author_name;
    IF  id_author IS NOT NULL
    THEN
        INSERT INTO AUTHOR (id_person, id_game)  VALUES (id_author, (SELECT id FROM GAME where name=a_name));
    ELSE
        INSERT INTO PERSON (last_name, name)  VALUES (author_lastname, author_name);
        INSERT INTO AUTHOR (id_person, id_game)
        VALUES ((SELECT id FROM PERSON where last_name = author_lastname AND name = author_name), (SELECT id FROM GAME where name=a_name));
    END IF;
    RETURN 0;

END; $$

delimiter ;

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

-- =============================================================
-- CONFIGURATION
-- =============================================================
INSERT INTO CONFIGURATION (id_game, nb_players)
VALUES (1, 5),
       (1, 4),
       (2, 4),
       (3, 2),
       (3, 2),
       (4, 10),
       (5, 2),
       (6, 5),
       (7, 5),
       (7, 6),
       (7, 7),
       (8, 4),
       (8, 6),
       (8, 6),
       (9, 3),
       (10, 4),
       (10, 4);

DELIMITER $$
CREATE FUNCTION addConfiguration (a_game_name VARCHAR(40), a_nb_players INT)
    RETURNS INT

BEGIN
DECLARE max INT;
DECLARE min INT;
DECLARE id_game INT;
SELECT nb_player_max INTO max FROM GAME where name=a_game_name;
SELECT nb_player_min INTO min FROM GAME where name=a_game_name;
SELECT id INTO id_game FROM GAME WHERE name=a_game_name;
IF a_nb_players >= min  AND a_nb_players<= max AND id_game IS NOT NULL
    THEN
    INSERT IGNORE INTO CONFIGURATION (id_game, nb_players)
        VALUES (id_game, a_nb_players);
        RETURN 0;
    END IF;
RETURN -1;
END; $$
-- =============================================================
-- OPINION
-- =============================================================
INSERT INTO OPINION (id_configuration, id_player, message, mark, date)
VALUES (1, 2, 'Super jeu',  17, '2018-09-24'),
       (1, 3, 'Ce jeu est génial', 18, '2000-11-03'),
       (2, 4, 'Incroyable', 19, '2000-11-03'),
       (2, 6, 'Pas mal', 15, '2005-11-03'),
       (2, 8, 'Bof', 15, '2005-11-03'),
       (3, 10, 'Un peu repétitif', 12, '2005-11-03'),
       (4, 2, 'Pas super', 10, '2005-11-03'),
       (5, 4, 'Jeu moyen', 10, '2005-11-03'),
       (5, 4, 'J\'adore' , 17, '2005-11-03'),
       (6, 7, 'Super', 15, '2005-11-03'),
       (6, 2, 'Un peu long', 10, '2005-11-03'),
       (6, 14, 'Trop dur', 7, '2005-11-03'),
       (6, 15, 'Mécanique de jeu riches', 15, '2005-11-03'), -- 13
       (7, 13, 'Très stratégique', 15, '2005-11-03'),
       (7, 11, 'Trop compliqué', 8, '2005-11-03'),
       (8, 8, 'Jeu difficile', 15, '2005-11-03'),
       (9, 7, 'Jeu de patience', 15, '2005-11-03'),
       (10, 6, 'Il faut garde son calme', 11, '2000-11-03'),
       (11, 3, 'Fait perdre patience', 6, '2000-11-03'),
       (11, 2, 'Jeu amusant', 13, '2000-11-03'),
       (12, 2, 'Bof bof', 9, '2000-11-03'),
       (13, 4, 'Super sympa', 16, '2000-11-03'),
       (13, 11, 'Idéal entre amis', 13, '2000-11-03'),
       (13, 14, 'Super soirée grâce a ce jeu', 14, '2000-11-03'),
       (14, 13, 'On adore !', 16, '2000-11-03'),
       (15, 15, 'Ce jeu est nul', 3, '2000-11-03'),
       (16, 3, 'Meilleur jeu auquel j ai joué', 18, '2008-05-03'),
       (17, 6, 'Un peu long', 10, '2006-03-17');

DELIMITER $$
CREATE FUNCTION addOpinion (a_nb_players INT, game_name VARCHAR(40), a_pseudo VARCHAR(40), a_message VARCHAR(100), a_mark INT, a_date DATE)
    RETURNS INT

BEGIN
    DECLARE id_config INT;
    DECLARE id_player INT;
    DECLARE created INT;
    SELECT id INTO id_player FROM PLAYER WHERE pseudo=a_pseudo;
    IF id_player IS NOT NULL AND a_mark<=20 AND a_mark>=0
    THEN
        SELECT id INTO id_config FROM CONFIGURATION
                where id_game=(SELECT id FROM GAME where name=game_name) AND nb_players=a_nb_players;
        IF id_config IS NULL
        THEN
            SELECT addConfiguration (game_name, a_nb_players) INTO created;
            IF created = -1
                THEN
                    RETURN -2;
            END IF;
            SELECT id INTO id_config FROM CONFIGURATION
                where id_game=(SELECT id FROM GAME where name=game_name) AND nb_players=a_nb_players;
        END IF;
        INSERT IGNORE INTO OPINION (id_configuration, id_player, message, mark, date)
        VALUES (id_config, id_player, a_message, a_mark, a_date);
        RETURN 0;
    END IF;
    RETURN -1;
END; $$

delimiter ;


-- =============================================================
-- RELEVANT
-- =============================================================
INSERT INTO RELEVANT (id_player, id_opinion, is_positive)
VALUES (8, 1, true),
       (3, 13, true),
       (3, 28, false),
       (3, 24, true),
       (6, 1, false),
       (11, 1, true),
       (13, 1, true),
/*       (3, 2, true), -- Cela doit être impossible
       (6, 28, true), -- Cela doit être impossible
       (3, 27, true), -- Cela doit être impossible*/
       (11, 2, false),
       (11, 3, false),
       (11, 4, false),
       (13, 3, true);
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
INSERT INTO FAVORITECATEGORIES (id_player, id_category)
VALUES (2, 1),
       (2, 4),
       (3, 3);


-- =============================================================
-- FAVORITETHEMES
-- =============================================================
INSERT INTO FAVORITETHEMES (id_player, id_theme)
VALUES (2, 1),
       (2, 4),
       (6, 1),
       (8, 2);
