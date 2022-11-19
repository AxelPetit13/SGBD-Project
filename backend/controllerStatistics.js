const db = require('./db');

// Players ranked by the number of game rated
exports.playerRankedByNumberGameCommented = (req, res) => {
    const pPseudo = req.params.id;
    db.query(`select ST.PLAYER_PSEUDO, count(ST.PLAYER_PSEUDO) as Count
              from      (select P.PLAYER_PSEUDO, O.GAME_NAME 
                      from PLAYER as P
                      inner join OPINION as O on P.PLAYER_PSEUDO = O.PLAYER_PSEUDO
                      group by O.GAME_NAME, P.PLAYER_PSEUDO ) as ST
              group by ST.PLAYER_PSEUDO
              order by count(ST.PLAYER_PSEUDO) desc`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding opinion per player."
                });
        })
};

// Players ranked by the number of game rated
exports.playerRankedByNbComments = (req, res) => {
    const pPseudo = req.params.id;
    db.query(`select P.PLAYER_PSEUDO as Name, count(O.OPINION_ID) as count 
              from PLAYER as P
              inner join OPINION as O on P.PLAYER_PSEUDO = O.PLAYER_PSEUDO
              group by P.PLAYER_PSEUDO
              order by count(O.OPINION_ID) desc`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding opinion per player."
                });
        })
};


// List of n more recent comments
exports.allRecentComments = (req, res) => {
    const n = req.params.id;
    db.query(`select OPINION_ID as 'Id',
                     OPINION_GRADE as 'Grade',
                     COMMENT as 'Comment',
                     DATE as 'Date raw',
                     DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                     PLAYER_PSEUDO as 'Opinion author',
                     GAME_NAME as 'Game',
                     CONFIG_ID as 'ID config'
              from OPINION
              order by DATE desc`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding comments."
                });
        })
};


// List of n more recent comments
exports.nRecentComments = (req, res) => {
    const n = req.params.id;
    db.query(`select OPINION_ID as 'Id',
                     OPINION_GRADE as 'Grade',
                     COMMENT as 'Comment',
                     DATE as 'Date raw',
                     DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                     PLAYER_PSEUDO as 'Opinion author',
                     GAME_NAME as 'Game',
                     CONFIG_ID as 'ID config'
              from OPINION
              order by DATE desc
              limit ${n}`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding comments."
                });
        })
};
