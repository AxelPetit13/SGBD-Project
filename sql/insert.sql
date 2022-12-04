-- =============================================================
-- PERSON
-- =============================================================
INSERT INTO PERSON (name, last_name, mail)
VALUES ('*', '*', '*'),
       ('Amaury', 'Clochard', 'amaury.clocahrd@gmail.com'),
       ('Théo', 'Facen', 'theo.facen@gmail.com'),
       ('Edmee', 'Pichette', 'edmee.pichette@gmail.com'),
       ('Axel', 'Petit', 'axel.petit@gmail.com'),
       ('Jessamine', 'Lagrange', 'jessamine.lagrange@gmail.com'),
       ('Baptiste', 'Huot', 'baptiste.huot@gmail.com'),
       ('Louise', 'Bondy', 'louise.bondy@gmail.com'),
       ('Alma', 'Taylor', 'alma.taylor@gmail.com'),
       ('Floyd', 'MacCurdy', 'Floyd.Maccurdy@gmail.com'),
       ('Kristen', 'Fink', 'kristen.fink@gmail.com'),
       ('Richard', 'Quintana', 'richard.quintana@gmail.com'),
       ('Shyla', 'Todd', 'shyla.todd@gmail.com'),
       ('Edwin', 'Parker', 'edwin.parker@gmail.com'),
       ('Gaetan', 'Goulet', 'gaetan.goulet@gmail.com');

DELIMITER $$
CREATE FUNCTION addPerson (a_first_name VARCHAR(100), a_last_name VARCHAR(100), a_mail VARCHAR(100))
    RETURNS INT
BEGIN
    INSERT IGNORE INTO PERSON (name, last_name, mail)
    VALUES (a_first_name, a_last_name, a_mail);
    RETURN 0;
END; $$

delimiter ;

-- =============================================================
-- PLAYER
-- =============================================================
INSERT INTO PLAYER (id, pseudo)
VALUES (1, 'Anonyme'),
        (2, 'amo666'),
       (3, 'facenboy'),
       (4, 'pichette'),
       (6, 'jeje00'),
       (7, 'babou'),
       (8, 'louB'),
       (10, 'tayyyy'),
       (11, 'Flo'),
       (13, 'Shyyyl'),
       (14, 'Eder'),
       (15, 'Gaetan13');

DELIMITER $$
CREATE FUNCTION addPlayer (a_id INT, a_pseudo VARCHAR(40))
    RETURNS INT

BEGIN
    INSERT IGNORE INTO PLAYER (id, pseudo)
    VALUES (a_id, a_pseudo);
    RETURN 0;
END; $$

delimiter ;
-- =============================================================
-- GAME
-- =============================================================
INSERT INTO GAME (name, nb_player_min, nb_player_max, duration, editor, expansion)
VALUES ('CLUEDO', 3, 6, 15, 'HASBRO', null),
       ('UNO', 4, 8, 15, 'MATTEL', null),
       ('ECHEC', 2, null, 30, 'inconnu', null),
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
    IF  id_illustrator != 0
    THEN
        INSERT INTO ILLUSTRATOR (id_person, id_game)  VALUES (id_illustrator, (SELECT id FROM GAME where name=a_name));
    ELSE
        INSERT INTO PERSON (last_name, name, mail)  VALUES (illustrator_lastname, illustrator_name, null);
        INSERT INTO ILLUSTRATOR (id_person, id_game)
            VALUES ((SELECT id FROM PERSON where last_name = illustrator_lastname AND name = illustrator_name), (SELECT id FROM GAME where name=a_name));
    END IF;

    -- add author
    SELECT id into id_author
    FROM PERSON where last_name = author_lastname AND name = author_name;
    IF  id_author != 0
    THEN
        INSERT INTO AUTHOR (id_person, id_game)  VALUES (id_author, (SELECT id FROM GAME where name=a_name));
    ELSE
        INSERT INTO PERSON (last_name, name, mail)  VALUES (author_lastname, author_name, null);
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
CREATE FUNCTION addOpinion (a_id_configuration INT, a_id_player INT, a_message VARCHAR(100), a_mark INT, a_date DATE)
    RETURNS INT

BEGIN
    INSERT IGNORE INTO OPINION (id_configuration, id_player, message, mark, date)
    VALUES (a_id_configuration, a_id_player, a_message, a_mark, a_date);
    RETURN 0;
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
