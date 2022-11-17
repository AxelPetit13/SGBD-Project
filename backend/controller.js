const db = require('./db');

// Create and Save a new person
exports.createPlayer = (req, res) => {
    // Validate request
    console.log(req.body);
    const person = {
        fName: req.body.fName,
        name: req.body.name,
        mail: req.body.mail,
        pseudo: req.body.pseudo,
        themeName: req.body.themeName,
        catName: req.body.catName,
    };
    // Create a person
    db.query('select max(PEOPLE_ID) as max from PEOPLE', (err, result) => {
        const idPerson = result[0].max + 1;
        db.query(`insert into PEOPLE
        VALUES (${idPerson}, '${person.name}' ,'${person.fName}' ,'${person.mail}')`, (err, rows, fields) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the person."
                });
        });
        db.query(`insert into PLAYER
        VALUES ('${person.pseudo}', ${idPerson} ,'${person.themeName}' ,'${person.catName}')`,
            (err) => {
                if (!err)
                    res.status(303).send({ message: "people and player created" });
                else
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the person."
                    });
            });
    });

};

// Retrieve all persons from the database.
exports.findAllPerson = (req, res) => {
    console.log("todo : a retirer");
    db.query('select * from PEOPLE', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding persons."
            });
    })
};

// Find a single person with an id
exports.findOnePerson = (req, res) => {
    const id = req.params.id;
    db.query(`select * from PEOPLE where PEOPLE_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows);
            else
                res.status(404).send({
                    message:
                        "No person"
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the person."
            });
    })
};

// update a person by the id in the request
exports.updatePerson = (req, res) => {
    const person = {
        fName: req.body.fName,
        name: req.body.name,
        mail: req.body.mail,
    };
    const id = req.params.id;
    db.query(`select * from PEOPLE where PEOPLE_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update PEOPLE SET  PEOPLE_NAME='${person.name}' , PEOPLE_FIRSTNAME='${person.fName}' , mail='${person.mail}' WHERE people_id=${id}`, (err, rows, fields) => {
                    if (!err)
                        res.send('updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No person"
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the person."
            });
    })
};

// update a person by the id in the request
exports.updatePlayer = (req, res) => {
    const id = req.params.id;
    const player = {
        pseudo: req.body.pseudo,
        themeName: req.body.themeName,
        catName: req.body.catName,
    };

    db.query(`select * from PLAYER where PEOPLE_ID =${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update PLAYER set THEME_NAME='${player.themeName}' , CATEGORY_NAME='${player.catName}' WHERE PEOPLE_ID =${id}`, (err, rows, fields) => {
                    if (!err)
                        res.send('updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No player"
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the person."
            });
    })

};

// Delete a person with the specified id in the request
exports.deletePerson = (req, res) => {
    const id = req.params.id;
    db.query(`select * from PEOPLE where PEOPLE_ID =${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`delete from PLAYER where PEOPLE_ID =${id}`, (err, rows, fields) => {
                    if (err)
                        console.log(err);
                });
                db.query(`set PLAYER_FK1=0; delete from PEOPLE where PEOPLE_ID =${id}; set PLAYER_FK1=1`, (err, rows, fields) => {
                    if (!err)
                        res.send({
                            message: "deleted"
                        });
                    else
                        console.log(err);
                })
            }
            else
                res.status(404).send({
                    message:
                        "No people"
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the person."
            });
    })

};

// Retrieve all people from the database.
exports.findAllPlayers = (req, res) => {
    db.query(`select * from PEOPLE pe inner join PLAYER pl on pl.PEOPLE_ID=pe.PEOPLE_ID  `, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding persons."
            });
    })
};

// Find a single Player with an id
exports.findOnePlayer = (req, res) => {
    const id = req.params.id;
    db.query(`select * from PEOPLE pe inner join PLAYER pl on pl.PEOPLE_ID=pe.PEOPLE_ID where pE.PEOPLE_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows);
            else
                res.status(404).send({
                    message:
                        "No person"
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the player."
            });
    })
};




/*  Amaux (je dis ça juste si y'a des erreurs ici c'est ma faute) */
// Create and Save a new game
exports.createGame = (req, res) => {
    // Validate request
    console.log(req.body);
    const game = {
        gName: req.body.gName,
        date: req.body.date,
        type: req.body.type,
        duration: req.body.duration,
        pNumber: req.body.pNumber,
        author: req.body.author,
        illustrator: req.body.illustrator,
        editor: req.body.editor,
        themeName: req.body.themeName,
        catName: req.body.catName,
        extOfName: req.body.extOfName,
    };
    // Create a game todo parse date
    db.query(`insert into GAME
        VALUES (${game.gName}, '${game.date}' ,'${game.type}' ,${game.duration},${game.pNumber} ,${game.author} ,${game.illustrator} ,
        '${game.editor}',${game.peopleId} ,'${game.themeName}' ,'${game.catName}' ,'${game.extOfName}')`, (err, rows, fields) => {
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
exports.findAllGames = (req, res) => {
    db.query('select * from GAME', (err, rows, fields) => {
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
    const name = req.params.name;
    db.query(`select * from GAME where GAME_NAME=${name}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows); // todo check if >1 ?
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
        gName: req.body.gName,
        date: req.body.date, //todo Parse
        type: req.body.type,
        duration: req.body.duration,
        pNumber: req.body.pNumber,
        author: req.body.author,
        illustrator: req.body.illustrator,
        editor: req.body.editor,
        themeName: req.body.themeName,
        catName: req.body.catName,
        extOfName: req.body.extOfName,
    };
    const name = req.params.name;
    db.query(`select * from GAME where GAME_NAME=${name}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update game SET GAME_NAME='${game.gName}', APPARITION_DATE='${game.date}' , GAME_TYPE='${game.type}' 
                            DURATION='${game.duration}',PEOPLE_NUMBER=${game.pNumber},EDITOR='${game.editor}',AUTHOR=${game.author},
                            ILLUSTRATOR='${game.illustrator}',THEME_NAME='${game.themeName}',CATEGORY_NAME='${game.catName}',GAME_EXTENSION_OF='${game.extOfName}'
                        WHERE GAME_NAME=${name}`, (err, rows, fields) => {
                    if (!err)
                        res.send('game updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No game"
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the game."
            });
    })
};

// Delete a game with the specified name in the request
exports.deleteGame = (req, res) => {
    const name = req.params.name;
    db.query(`select * from GAME where GAME_NAME=${name}`, (err, rows, fields) => {
        if (!err)
            res.send({
                message: "deleted"
            });
        else
            console.log(err);
    })

};
/* Fin Amaux */