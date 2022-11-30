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
       ('Alma', 'Taylor', 'alma.taylor@gmail.com'),
       ('Floyd', 'MacCurdy', 'Floyd.Maccurdy@gmail.com'),
       ('Kristen', 'Fink', 'kristen.fink@gmail.com'),
       ('Richard', 'Quintana', 'richard.quintana@gmail.com'),
       ('Shyla', 'Todd', 'shyla.todd@gmail.com'),
       ('Edwin', 'Parker', 'edwin.parker@gmail.com'),
       ('Gaetan', 'Goulet', 'gaetan.goulet@gmail.com');

-- =============================================================
-- PLAYER
-- =============================================================
INSERT INTO PLAYER (id, pseudo)
VALUES (2, 'amo666'),
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
-- =============================================================
-- GAMEBYAUTHOR
-- =============================================================
INSERT INTO GAMESBYAUTHOR (id_person, id_game)
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
INSERT INTO GAMESBYILLUSTRATOR (id_person, id_game)
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
       /*(3, 2, true),*/ -- Cela doit être impossible
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
