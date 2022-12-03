-- =============================================================
-- PERSON
-- =============================================================
INSERT INTO PERSON (name, last_name, mail)
VALUES ('Jean', 'Dupont', 'jean.dupont@gmail.com'),
       ('Amaury', 'Clochard', 'amaury.clocahrd@gmail.com'),
       ('Théo', 'Facen', 'theo.facen@gmail.com'),
       ('Edmee', 'Pichette', 'edmee.pichette@gmail.com'),
       ('Axel', 'Petit', 'axel.petit@gmail.com'),
       ('Jessamine', 'Lagrange', 'jessamine.lagrange@gmail.com'),
       ('Baptiste', 'Huot', 'baptiste.huot@gmail.com'),
       ('Louise', 'Bondy', 'louise.bondy@gmail.com'),
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
VALUES (2, 'amo666'),
       (3, 'facenboy'),
       (6, 'jeje00'),
       (8, 'louB');

-- =============================================================
-- GAME
-- =============================================================
INSERT INTO GAME (name, nb_player_min, nb_player_max, duration, expansion)
VALUES ('CLUEDO', 3, 6, 15, null),
       ('UNO', 4, 8, 15, null),
       ('ECHEC', 2, null, 30, null),
       ('LEAGUE OF LEGENDS', 2, 10, 35, null),
       ('ROCKET LEAGUE', 1, 4, 15, null),
       ('7WONDERS', 3, 7, 40, null),
       ('7WONDERS-ARMADA', 3, 7, 40, '7WONDERS');


DELIMITER $$
CREATE FUNCTION addGame (a_name VARCHAR(40), a_duration INT, max INT, min INT)
    RETURNS INT

BEGIN
INSERT IGNORE INTO GAME (name, nb_player_min, nb_player_max, duration, expansion)
    VALUES (a_name, min, max, a_duration, null);
    RETURN 0;
END; $$

delimiter ;

-- =============================================================
-- GAMEBYAUTHOR
-- =============================================================
INSERT INTO GAMESBYAUTHOR (id_person, id_game)
VALUES (1, 1),
       (4, 3);
-- =============================================================
-- GAMEBYILLUSTRATOR
-- =============================================================
INSERT INTO GAMESBYILLUSTRATOR (id_person, id_game)
VALUES (1, 1),
       (2, 2),
       (5, 3),
       (4, 3);

-- =============================================================
-- CONFIGURATION
-- =============================================================
INSERT INTO CONFIGURATION (id_game, nb_players)
VALUES (1, 5),
       (1, 4),
       (2, 6);
-- =============================================================
-- OPINION
-- =============================================================
INSERT INTO OPINION (id_configuration, id_player, message, mark, date)
VALUES (1, 2, 'Super jeu',  12, '2018-09-24'),
       (2, 2, 'Ce jeu est nul', 3, '2000-11-03'),
       (1, 3, 'Meilleur jeu auquel j ai joué', 18, '2008-05-03'),
       (1, 6, 'Un peu long', 10, '2006-03-17');
-- =============================================================
-- RELEVANT
-- =============================================================
INSERT INTO RELEVANT (id_player, id_opinion)
VALUES (2, 1),
       (3, 2),
       (3, 3);
-- =============================================================
-- THEME
-- =============================================================
INSERT INTO THEME (name)
VALUES ('Pirate'),
       ('Egypte'),
       ('Espace'),
       ('Fantaisie'),
       ('Guerre'),
       ('Manoir');
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
VALUES (1, 2),
       (2, 3),
       (3, 1),
       (3, 2),
       (4, 1);
-- =============================================================
-- GAMESBYTHEME
-- =============================================================
INSERT INTO GAMESBYTHEME (id_game, id_theme)
VALUES (1, 6),
       (3, 4);
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
