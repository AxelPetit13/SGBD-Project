const db = require('./db');


/***************CONFIG***************/
// Create and Save a new config
exports.createConfig = (req, res) => {
    // Validate request
    const config = {
        nbPlayers: req.body.nbPlayers,
        extend: req.body.extend,
        gName: req.body.gName,
    };
    // Find the next available Id
    db.query('select max(CONFIG_ID) as max from CONFIG', (err, result) => {
        const idConfig = result[0].max + 1;
        // Create a config
        db.query(`  insert into CONFIG
                    values (${idConfig},${config.nbPlayers}, '${config.extend}','${config.gName}')`, (err, rows, fields) => {
            if (!err)
                res.status(303).send({ message: "config created" });
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the config."
                });
        });
    });

}

// Retrieve all configs from the database.
exports.findAllConfig = (req, res) => {
    db.query(`select CONFIG_ID as Id,
                     PLAYER_NUMBER as 'Nb players',
                     EXTEND as 'Extend',
                     GAME_NAME as 'Game name'
              from CONFIG`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding configs."
                });
        })
};

// Find a single config with an id
exports.findOneConfig = (req, res) => {
    const id = req.params.id;
    db.query(`select CONFIG_ID as Id,
                     PLAYER_NUMBER as 'Nb players',
                     EXTEND as 'Extend',
                     GAME_NAME as 'Game name'
              from CONFIG
              where CONFIG_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows); // todo check if >1 ?
            else
                res.status(404).send({
                    message:
                        "No config found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the config."
            });
    })
};

// update a config by the id in the request
exports.updateConfig = (req, res) => {
    const config = {
        nbPlayers: req.body.nbPlayers, //todo Parse
        extend: req.body.extend,
        gName: req.body.gName,
    };
    const id = req.params.id;
    db.query(`select * from CONFIG where CONFIG_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update CONFIG set PLAYER_NUMBER=${config.nbPlayers},
                            EXTEND='${config.extend}',
                            GAME_NAME='${config.gName}'
                          where CONFIG_ID=${id}`, (err, rows, fields) => {
                    if (!err)
                        res.send('config updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No config found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the config."
            });
    })
};

// Delete a config with the specified id in the request
exports.deleteConfig = (req, res) => {
    const id = req.params.id;
    db.query(`select * from CONFIG where CONFIG_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from CONFIG where CONFIG_ID=${id};
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
                        "No config to delete."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the config."
            });
    });
}