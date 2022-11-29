drop database if exists BOARDGAME;
create database BOARDGAME;
use BOARDGAME;

-- =============================================================
--   PERSON
-- =============================================================
create table PERSON (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    mail VARCHAR(100)
);

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

-- =============================================================
-- PLAYER
-- =============================================================
create table PLAYER (
    id INT PRIMARY KEY,
    pseudo VARCHAR(40) NOT NULL UNIQUE ,
    CONSTRAINT fk_id_player_person
        FOREIGN KEY (id)
            REFERENCES PERSON(id)
);

INSERT INTO PLAYER (id, pseudo)
VALUES (2, 'amo666'),
       (3, 'facenboy'),
       (6, 'jeje00'),
       (8, 'louB');

-- =============================================================
-- GAME
-- =============================================================
create table GAME (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) not null unique,
    nb_player_min INT not null,
    nb_player_max INT,
    duration INT not null,
    expansion VARCHAR(40),
    CONSTRAINT fk_expansion_game FOREIGN KEY (expansion) REFERENCES GAME(name)

);
INSERT INTO GAME (name, nb_player_min, nb_player_max, duration, expansion)
VALUES ('CLUEDO', 3, 6, 15, null),
       ('UNO', 4, 8, 15, null),
       ('ECHEC', 2, null, 30, null),
       ('LEAGUE OF LEGENDS', 2, 10, 35, null),
       ('ROCKET LEAGUE', 1, 4, 15, null),
       ('7WONDERS', 3, 7, 40, null),
       ('7WONDERS-ARMADA', 3, 7, 40, '7WONDERS');

-- =============================================================
-- GAMESBYAUTHOR
-- =============================================================
create table GAMESBYAUTHOR (
                               id_person INT NOT NULL,
                               id_game INT NOT NULL,
                               PRIMARY KEY (id_person, id_game),
                               CONSTRAINT fk_id_person_gamesbyauthor FOREIGN KEY (id_person) REFERENCES PERSON(id),
                               CONSTRAINT fk_id_game_gamesbyauthor FOREIGN KEY (id_game) REFERENCES GAME(id)
);
INSERT INTO GAMESBYAUTHOR (id_person, id_game)
VALUES (1, 1),
       (4, 3);
-- =============================================================
-- GAMESBYILLUSTRATOR
-- =============================================================
create table GAMESBYILLUSTRATOR(
    id_person INT NOT NULL,
    id_game INT NOT NULL,
    PRIMARY KEY (id_person, id_game),
    CONSTRAINT fk_id_person_gamesbyillustrator FOREIGN KEY (id_person) REFERENCES PERSON(id),
    CONSTRAINT fk_id_game_gamesbyillustrator FOREIGN KEY (id_game) REFERENCES GAME(id)
);
INSERT INTO GAMESBYILLUSTRATOR (id_person, id_game)
VALUES (1, 1),
       (2, 2),
       (5, 3),
       (4, 3);

-- =============================================================
-- CONFIGURATION
-- =============================================================
create table CONFIGURATION (
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_game INT NOT NULL,
   nb_players INT NOT NULL,
   CONSTRAINT fk_id_game_configuration FOREIGN KEY (id_game) REFERENCES GAME(id)
);
INSERT INTO CONFIGURATION (id_game, nb_players)
VALUES (1, 5),
       (1, 4),
       (2, 6);

-- =============================================================
-- OPINION
-- =============================================================
create table OPINION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_configuration INT NOT NULL,
    id_player INT NOT NULL,
    message VARCHAR(200),
    mark INT NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_id_game_opinion FOREIGN KEY (id_configuration) REFERENCES CONFIGURATION(id),
    CONSTRAINT fk_id_player_opinion FOREIGN KEY (id_player) REFERENCES PLAYER(id)
);
INSERT INTO OPINION (id_configuration, id_player, message, mark, date)
VALUES (1, 2, 'Super jeu',  12, '2018-09-24'),
       (2, 2, 'Ce jeu est nul', 3, '2000-11-03'),
       (1, 3, 'Meilleur jeu auquel j\'ai joué', 18, '2008-05-03'),
       (1, 6, 'Un peu long', 10, '2006-03-17');

-- =============================================================
-- RELEVANT
-- =============================================================
create table RELEVANT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_player INT NOT NULL,
    id_opinion INT NOT NULL,
    CONSTRAINT fk_id_player_relevant FOREIGN KEY (id_player) REFERENCES PLAYER(id),
    CONSTRAINT fk_id_opinion_relevant FOREIGN KEY (id_opinion) REFERENCES OPINION(id)
    -- Ajouter la contrainte qu'un joueur ne peux pas qualifier de pertinent son propre avis
);
INSERT INTO RELEVANT (id_player, id_opinion)
VALUES (2, 1),
       (3, 2),
       (3, 3);

-- =============================================================
-- THEME
-- =============================================================
create table THEME (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40)
);
INSERT INTO THEME (name)
VALUES ('Pirate'),
       ('Egypte'),
       ('Espace'),
       ('Fantaisie'),
       ('Guerre');


-- =============================================================
-- CATEGORY
-- =============================================================
create table CATEGORY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40)
);
INSERT INTO CATEGORY (name)
VALUES ('Stratégie'),
       ('Réflexion'),
       ('Rapidité'),
       ('Coopération'),
       ('Patience')
