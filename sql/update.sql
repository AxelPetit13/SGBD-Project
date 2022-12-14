DELIMITER $$
CREATE FUNCTION updateGame (a_id INT, a_name VARCHAR(40), a_expansion VARCHAR(40), a_duration INT, max INT, min INT)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) INTO find FROM GAME WHERE id=a_id;
    IF  find = 1
    THEN
    UPDATE GAMES SET name=a_name, duration=a_duration, expansion=a_expansion, nb_player_max=max,
                    nb_player_min=min WHERE id=a_id;
    RETURN 0;
    ELSE
        RETURN -1;
    END IF;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION updatePerson (a_id INT, a_name VARCHAR(100), a_last_name VARCHAR(100))
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM PEOPLE WHERE id=a_id into find ;
    IF  find = 1
    THEN
        UPDATE PEOPLE SET name=a_name, last_name=a_last_name
                    WHERE id=a_id;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION updatePlayer (a_id INT, a_pseudo VARCHAR(100), a_mail VARCHAR(100))
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) into find  FROM PLAYERS WHERE id=a_id;
    IF  find = 1
    THEN
        update PLAYERS set pseudo=a_pseudo, mail=a_mail
                      WHERE id=a_id;
        RETURN 0;
    END IF;
    RETURN -1;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION updateOpinion (a_id INT, a_message VARCHAR(200), a_mark INT, a_date DATE)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    select count(*) FROM OPINIONS WHERE id = a_id into find;
    IF  find = 1
    THEN
        IF a_mark >=0 AND a_mark <=20
            THEN
            update OPINIONS set message=a_message, mark=a_mark, date=a_date
                WHERE id=a_id;
            RETURN 0;
        END IF;

    END IF;
    RETURN -1;
END; $$


DELIMITER $$
CREATE FUNCTION updateRelevant (a_id INT, a_is_positive BOOLEAN)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    select count(*) FROM RELEVANTS WHERE id = a_id into find;
    IF  find = 1
    THEN
        update RELEVANTS set is_positive = a_is_positive
        WHERE id=a_id;
        RETURN 0;
    END IF;
    RETURN -1;
END; $$




delimiter ;



