DELIMITER $$
CREATE FUNCTION updateGame (a_name VARCHAR(40), a_expansion VARCHAR(40), a_duration INT, max INT, min INT)
    RETURNS INT
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM GAME WHERE name=a_name into find ;
    IF  find = 1
    THEN
    UPDATE GAME SET duration=a_duration, expansion=a_expansion, nb_player_max=max,
                    nb_player_min=min WHERE name=a_name;
    END IF;
    RETURN 0;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION updatePerson (a_id INT, a_name VARCHAR(100), a_last_name VARCHAR(100), a_mail VARCHAR(100))
    RETURNS INT
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM PERSON WHERE id=a_id into find ;
    IF  find = 1
    THEN
        UPDATE PERSON SET name=a_name, last_name=a_last_name, mail=a_mail
                    WHERE id=a_id;
    END IF;
    RETURN 0;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION updatePlayer (a_id INT, a_pseudo VARCHAR(100))
    RETURNS INT
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM PERSON WHERE id=a_id into find ;
    IF  find = 1
    THEN
        update PLAYER set pseudo=a_pseudo
                      WHERE id=a_id;
    END IF;
    RETURN 0;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION updateOpinion (a_id INT, a_message VARCHAR(200), a_mark INT, a_date DATE)
    RETURNS INT
BEGIN
    DECLARE find INT;
    select count(*) FROM OPINION WHERE id = a_id into find;
    IF  find = 1
    THEN
        update OPINION set message=a_message, mark=a_mark, date=a_date
            WHERE id=a_id;
    END IF;
    RETURN 0;
END; $$

delimiter ;



