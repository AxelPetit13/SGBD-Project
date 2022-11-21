const db = require('./db');

/***************GAME***************/
// Create and Save a new game
exports.createGame = (req, res) => {
    // Validate request
    const game = {
        gName: req.body.gName,
        date: req.body.date,
        type: req.body.type,
        duration: req.body.duration,
        pNumber: req.body.pNumber,
        editor: req.body.editor,
        themeName: req.body.themeName,
        catName: req.body.catName,
        extOfName: req.body.extOfName,
    };
    // Create a game todo parse date
    db.query(`  insert into GAME
    values ('${game.gName}', '${game.date}' ,'${game.type}' ,${game.duration},${game.pNumber} ,
    '${game.editor}' ,'${game.themeName}' ,'${game.catName}' ,'${game.extOfName}')`, (err, rows, fields) => {
        if (!err)
            res.status(303).send({ message: "game created" });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the game."
            });
    });

};

// Retrieve all games from the database.
exports.findAllGame = (req, res) => {
    db.query(`select GAME_NAME as Name, 
                     GAME_EXTENSION_OF as 'Extension of'     , 
                     APPARITION_DATE as 'Date raw',
                     DATE_FORMAT(APPARITION_DATE,"%d/%c/%y") as Created,
                     GAME_TYPE as Type,
                     DURATION as 'Duration (min)',
                     PEOPLE_NUMBER as 'Max players/game',
                     EDITOR as Editor,
                     THEME_NAME as Theme,
                     CATEGORY_NAME as Category
              from GAME`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding games."
                });
        })
};

// Find a single game with an name
exports.findOneGame = (req, res) => {
    const name = req.params.id;
    db.query(`select GAME_NAME as Name, 
                     GAME_EXTENSION_OF as ExtensionOf, 
                     APPARITION_DATE as 'Date raw',
                     DATE_FORMAT(APPARITION_DATE,"%d/%c/%y") as Created,
                     GAME_TYPE as Type,
                     DURATION as 'Duration (min)',
                     PEOPLE_NUMBER as 'Max players/game',
                     EDITOR as Editor,
                     THEME_NAME as Theme,
                     CATEGORY_NAME as Category
              from GAME 
              where GAME_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows);
            else
                res.status(404).send({
                    message:
                        "No game found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the game."
            });
    })
};

// update a game by the name in the request
exports.updateGame = (req, res) => {
    const game = {
        date: req.body.date, //todo Parse
        type: req.body.type,
        duration: req.body.duration,
        pNumber: req.body.pNumber,
        editor: req.body.editor,
        themeName: req.body.themeName,
        catName: req.body.catName,
        extOfName: req.body.extOfName,
    };
    const name = req.params.id;
    db.query(`select * from GAME where GAME_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update GAME set APPARITION_DATE='${game.date}' , GAME_TYPE='${game.type}' ,
                            DURATION=${game.duration},EDITOR='${game.editor}',THEME_NAME='${game.themeName}',CATEGORY_NAME='${game.catName}',GAME_EXTENSION_OF='${game.extOfName}'
                            where GAME_NAME='${name}'`, (err, rows, fields) => {
                    if (!err)
                        res.send('game updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No game found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the game."
            });
    })
};

// Delete a game with the specified name in the request, delete also creators
exports.deleteGame = (req, res) => {
    const name = req.params.id;
    db.query(`select * from GAME where GAME_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from CREATOR where GAME_NAME='${name}';
                          delete from GAME where GAME_NAME='${name}';
                          SET FOREIGN_KEY_CHECKS=1;`, (err, rows, fields) => {
                    if (!err)
                        res.send({
                            message: "deleted"
                        });
                    else
                        console.log(err);
                }
                );
            } else
                res.status(404).send({
                    message:
                        "No game to delete."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the game."
            });
    });

}