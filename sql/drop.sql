DELIMITER $$
CREATE FUNCTION dropGame (a_id INT)
    RETURNS INT
    DETERMINISTIC
BEGIN
    DECLARE find INT;
    SELECT count(*) FROM GAME WHERE id=a_id into find ;
    IF  find = 1
    THEN
        DELETE FROM CONFIGURATION WHERE id_game=a_id;
        DELETE FROM GAME WHERE id=a_id;
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
    SELECT count(*) FROM OPINION WHERE id=a_id into find ;
    IF  find = 1
    THEN
        delete from OPINION where id=a_id;
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
    SELECT count(*) FROM OPINION WHERE id=a_id into find ;
    IF  find = 1
    THEN
        UPDATE OPINION SET id_player=1 WHERE id_player=a_id;
        DELETE FROM PLAYER WHERE id=a_id;
        RETURN 0;
    ELSE
        RETURN -1;
    END IF;

END; $$

delimiter ;

