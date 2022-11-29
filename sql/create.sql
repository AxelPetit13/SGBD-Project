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


-- =============================================================
-- CONFIGURATION
-- =============================================================
create table CONFIGURATION (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               id_game INT NOT NULL,
                               nb_players INT NOT NULL,
                               CONSTRAINT fk_id_game_configuration FOREIGN KEY (id_game) REFERENCES GAME(id)
);

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

-- =============================================================
-- RELEVANT
-- =============================================================
DELIMITER $$

CREATE FUNCTION nothimself()
    RETURN INT id
    BEGIN
        END;
$$
DELIMITER ;

create table RELEVANT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_player INT NOT NULL,
    id_opinion INT NOT NULL CHECK( id_player <> ),
    CONSTRAINT fk_id_player_relevant FOREIGN KEY (id_player) REFERENCES PLAYER(id),
    CONSTRAINT fk_id_opinion_relevant FOREIGN KEY (id_opinion) REFERENCES OPINION(id)
    -- Ajouter la contrainte qu'un joueur ne peux pas qualifier de pertinent son propre avis
);

-- =============================================================
-- THEME
-- =============================================================
create table THEME (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40)
);

-- =============================================================
-- CATEGORY
-- =============================================================
create table CATEGORY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40)
);

-- =============================================================
-- GAMESBYCATEGORY
-- =============================================================
create table GAMESBYCATEGORY (
    id_game INT NOT NULL,
    id_category INT NOT NULL,
    PRIMARY KEY (id_game, id_category),
    CONSTRAINT fk_id_game_gamesbycategory FOREIGN KEY (id_game) REFERENCES GAME(id),
    CONSTRAINT fk_id_category_gamesbycategory FOREIGN KEY (id_category) REFERENCES CATEGORY(id)
);
-- =============================================================
-- GAMESBYTHEME
-- =============================================================
create table GAMESBYTHEME (
    id_game INT NOT NULL,
    id_theme INT NOT NULL,
    PRIMARY KEY (id_game, id_theme),
    CONSTRAINT fk_id_game_gamesbytheme FOREIGN KEY (id_game) REFERENCES GAME(id),
    CONSTRAINT fk_id_theme_gamesbytheme FOREIGN KEY (id_theme) REFERENCES THEME(id)
);

-- =============================================================
-- FAVORITECATEGORIES
-- =============================================================
create table FAVORITECATEGORIES (
    id_player INT NOT NULL,
    id_category INT NOT NULL,
    PRIMARY KEY(id_player, id_category),
    CONSTRAINT fk_id_player_favoritecategories FOREIGN KEY (id_player) REFERENCES PLAYER(id),
    CONSTRAINT fk_id_category_favoritecategories FOREIGN KEY (id_category) REFERENCES CATEGORY(id)
);

-- =============================================================
-- FAVORITETHEMES
-- =============================================================
create table FAVORITETHEMES (
    id_player INT NOT NULL,
    id_theme INT NOT NULL,
    PRIMARY KEY(id_player, id_theme),
    CONSTRAINT fk_id_player_favoritethemes FOREIGN KEY (id_player) REFERENCES PLAYER(id),
        CONSTRAINT fk_id_category_favoritethemes FOREIGN KEY (id_theme) REFERENCES THEME(id)
);