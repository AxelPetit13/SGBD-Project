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


// Most ranked comment
exports.rankedComment = (req, res) => {
    db.query(`select Op.OPINION_ID, Op.COMMENT, count(Pe.PLAYER_PSEUDO) as Count 
              from OPINION as Op 
              inner join PERTINENT as Pe on Op.OPINION_ID=Pe.OPINION_ID  
              group by Op.OPINION_ID
              order by count(Pe.PLAYER_PSEUDO) desc
              limit 1`
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

// Most ranked comments by trust index
exports.commentsByTrustIndex = (req, res) => {
    db.query(`select ((1+Good.NoteGood)/(1+Bad.NoteBad)) as Trust, Good.NoteGood as 'Nb good grades', Bad.NoteBad as 'Nb bad grades', Op.OPINION_ID, Op.COMMENT
              from OPINION as Op
              natural join (select count(PLAYER_PSEUDO) as NoteGood,OPINION_ID from PERTINENT where PERTINENT_GRADE>3 group by OPINION_ID) as Good 
              natural join (select count(PLAYER_PSEUDO) as NoteBad,OPINION_ID from PERTINENT where PERTINENT_GRADE<3 group by OPINION_ID) as Bad
              order by Trust desc
                `
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


// Most ranked games balanced by trust
exports.gamePerTrust = (req, res) => {
    db.query(`select G.GAME_NAME as 'Game name', (sum(Tb.gradeTrusted) / sum(O.OPINION_ID)) as Grade, sum(Tb.gradeTrusted) as 'Grade trusted', sum(O.OPINION_ID) as 'sum opinion'
              from GAME as G
              inner join OPINION as O on G.GAME_NAME = O.GAME_NAME 
              natural join
              (
                select (((1+Good.NoteGood)/(1+Bad.NoteBad))*Op.OPINION_GRADE) as gradeTrusted, Op.OPINION_ID
                from OPINION as Op
                natural join (select count(PLAYER_PSEUDO) as NoteGood,OPINION_ID from PERTINENT where PERTINENT_GRADE>3 group by OPINION_ID) as Good 
                natural join (select count(PLAYER_PSEUDO) as NoteBad,OPINION_ID from PERTINENT where PERTINENT_GRADE<3 group by OPINION_ID) as Bad
              ) as Tb
              group by G.GAME_NAME
              order by Grade desc
                `
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
