const db = require('./db');

// Players ranked by the number of game rated
exports.playerRankedByNumberGameCommented = (req, res) => {
    const pPseudo = req.params.id;
    db.query(`select ST.PLAYER_PSEUDO, count(ST.PLAYER_PSEUDO) as Count
              from      (select P.PLAYER_PSEUDO, O.GAME_NAME 
                      from PLAYER as P
                      inner join OPINION as O on P.PLAYER_ID = O.PLAYER_ID
                      group by O.GAME_ID, P.PLAYER_ID ) as ST
              group by ST.PLAYER_ID
              order by count(ST.PLAYER_ID) desc`
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
              inner join OPINION as O on P.PLAYER_ID = O.PLAYER_ID
              group by P.PLAYER_ID
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
                     PLAYER_ID as 'Opinion author',
                     GAME_ID as 'Game',
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
                     PLAYER_ID as 'Opinion author',
                     GAME_ID as 'Game',
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
    db.query(`select Op.OPINION_ID, Op.COMMENT, count(Pe.PLAYER_ID) as Count 
              from OPINION as Op 
              inner join PERTINENT as Pe on Op.OPINION_ID=Pe.OPINION_ID  
              group by Op.OPINION_ID
              order by count(Pe.PLAYER_ID) desc
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
exports.gameByTrust = (req, res) => {
    db.query(`select G.GAME_NAME as 'Game name', IFNULL((sum(Tb.gradeTrusted) / count(O.OPINION_ID)),0) as Grade, ifnull(sum(Tb.gradeTrusted),0) as 'Sum trusted opinion grade', count(O.OPINION_ID) as 'Nb opinions'
              from GAME as G
              left outer join OPINION as O on G.GAME_ID=O.GAME_ID 
              left outer join
              (
                select (((1+IFNULL(Good.NoteGood,0))/(1+IFNULL(Bad.NoteBad,0)))*Op.OPINION_GRADE) as gradeTrusted, Op.OPINION_ID
                from OPINION as Op
                left outer join (select count(PLAYER_PSEUDO) as NoteGood,OPINION_ID from PERTINENT where PERTINENT_GRADE>3 group by OPINION_ID) as Good on Op.OPINION_ID=Good.OPINION_ID
                left outer join (select count(PLAYER_PSEUDO) as NoteBad,OPINION_ID from PERTINENT where PERTINENT_GRADE<3 group by OPINION_ID) as Bad on Op.OPINION_ID=Bad.OPINION_ID
              ) as Tb on O.OPINION_ID=Tb.OPINION_ID
              group by G.GAME_NAME
              order by Grade desc, sum(O.OPINION_ID) desc`
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
