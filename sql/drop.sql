DELIMITER $$
CREATE FUNCTION dropGame (a_id INT)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM GAMES WHERE id=a_id into find ;
    IF  find = 1
    THEN
        DELETE FROM GAMES WHERE id=a_id;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;
END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION dropOpinion (a_id INT)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM OPINIONS WHERE id=a_id into find ;
    IF  find = 1
    THEN
        delete from OPINIONS where id=a_id;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;

END; $$

DELIMITER $$
CREATE FUNCTION dropRelevant(a_id INT)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM RELEVANTS WHERE id=a_id into find ;
    IF  find = 1
    THEN
        delete from RELEVANTS where id=a_id;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;

END; $$

delimiter ;

DELIMITER $$
CREATE FUNCTION dropPlayer (a_id INT)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM OPINIONS WHERE id=a_id into find ;
    IF  find = 1
    THEN
        UPDATE OPINIONS SET id_player=1 WHERE id_player=a_id;
        DELETE FROM PLAYERS WHERE id=a_id;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;

END; $$

delimiter ;

