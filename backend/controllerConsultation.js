const db = require('./db');

// The set of reviewed games available in a given theme, classified by category
exports.reviewedGamePerThemeByCategory = (req, res) => {

    const theme = req.params.id;
    db.query(`select * from THEME where THEME_NAME='${theme}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`select G.GAME_NAME as Name, 
                                 G.GAME_EXTENSION_OF as 'Extension of', 
                                 G.CATEGORY_NAME as Category,
                                 G.APPARITION_DATE as 'Date raw',
                                 DATE_FORMAT(G.APPARITION_DATE,"%d/%c/%y") as Created,
                                 G.GAME_TYPE as Type,
                                 G.DURATION as 'Duration (min)',
                                 G.AUTHOR as 'Author',
                                 G.ILLUSTRATOR as 'Illustrator',
                                 G.PEOPLE_NUMBER as 'Max players/game',
                                 G.EDITOR as Editor,
                                 G.THEME_NAME as Theme
                          from GAME as G
                          inner join OPINION as O on G.GAME_NAME = O.GAME_NAME
                          where G.THEME_NAME='${theme}'
                          order by G.CATEGORY_NAME`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding games."
                            });
                    })
            else
                res.status(404).send({
                    message:
                        "No theme found."
                });

    });
};



// Per comment, the list of players who liked it.
exports.playerReactedPerOpinion = (req, res) => {
    const id = req.params.id;
    db.query(`select * from OPINION where OPINION_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`select Pl.PLAYER_PSEUDO as Name, 
                                 Pe.PERTINENT_GRADE as 'Player grade'`/*,
                                 O.GAME_NAME as 'Game', 
                                 O.CONFIG_ID as 'Config',
                                 O.COMMENT as 'Comment',
                                 O.DATE as 'Date raw',
                                 DATE_FORMAT(O.DATE,"%d/%c/%y") as 'Date opinion created',
                                 O.OPINION_GRADE as 'Opinion grade'*/+`
                          from OPINION as O
                          inner join PERTINENT as Pe on O.OPINION_ID = Pe.OPINION_ID
                          inner join PLAYER as Pl on Pe.PLAYER_PSEUDO = Pl.PLAYER_PSEUDO
                          where O.OPINION_ID=${id}`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding pertinent."
                            });
                    })
            else
                res.status(404).send({
                    message:
                        "No opinion found."
                });

    });
};


// Per player, the list of comments which refered to games in its favorites categories.
exports.commentsPerPlayerFavCategory = (req, res) => {
    const pPseudo = req.params.id;
    db.query(`select * from PLAYER where PLAYEr_PSEUDO='${pPseudo}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`select P.PLAYER_PSEUDO as Name, 
                                 P.PERTINENT_GRADE as 'Player grade',
                                 O.GAME_NAME as 'Game', 
                                 O.CONFIG_ID as 'Config',
                                 O.COMMENT as 'Comment',
                                 O.DATE as 'Date raw',
                                 DATE_FORMAT(O.DATE,"%d/%c/%y") as 'Date opinion created',
                                 O.OPINION_GRADE as 'Opinion grade'
                          from PLAYER as P
                          inner join PERTINENT as Pe on O.OPINION_ID = Pe.OPINION_ID
                          inner join PLAYER as Pl on Pe.PLAYER_PSEUDO = Pl.PLAYER_PSEUDO
                          where O.OPINION_ID=${id}`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding comments."
                            });
                    })
            else
                res.status(404).send({
                    message:
                        "No player found."
                });

    });
};
