const db = require('./db');


/***************PERTINENT***************/
// Create and Save a new Pertinent
exports.createPertinent = (req, res) => {
    // Validate request
    const pert = {
        idPlayer: req.body.idPlayer,
        idOpinion: req.body.idOpinion,
        grade: req.body.grade,
    };
    // Create a pertinent
    db.query(`  insert into PERTINENT
                    values ('${pert.idPlayer}', ${pert.idOpinion},${pert.grade})`, (err, rows, fields) => {
        if (!err)
            res.status(303).send({ message: "Pertinent created" });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pertinent."
            });
    });

}

// Retrieve all Pertinents from the database.
exports.findAllPertinent = (req, res) => {
    db.query(`select PERTINENT.PLAYER_PSEUDO as 'Player name',
                     PERTINENT_GRADE as 'Grade',
                     OPINION.COMMENT as 'Opinion graded',
                     OPINION.PLAYER_PSEUDO as 'Opinion author'
              from PERTINENT
              inner join OPINION on PERTINENT.OPINION_ID=OPINION.OPINION_ID`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding pertinents."
                });
        })
};

// Retrieve all Pertinents from a player from the database.
exports.findAllPertinentPerPlayer = (req, res) => {
    const id = req.params.id;
    db.query(`select * from PLAYER where PLAYER_PSEUDO='${id}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length == 0)
                res.status(404).send({
                    message:
                        "No player found."
                });
            else
                db.query(`select PERTINENT.PLAYER_PSEUDO as 'Player name',
                             PERTINENT_GRADE as 'Grade',
                             OPINION.COMMENT as 'Opinion graded',
                             OPINION.PLAYER_PSEUDO as 'Opinion author'
                          from PERTINENT
                          inner join OPINION on PERTINENT.OPINION_ID = OPINION.OPINION_ID
                          where PERTINENT.PLAYER_PSEUDO='${id}'`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding pertinents per player."
                            });
                    });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the player."
            });
    });

}

// Retrieve all Pertinents from a opinion from the database.
exports.findAllPertinentPerOpinion = (req, res) => {
    const id = req.params.id;
    db.query(`select * from OPINION where OPINION_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length == 0)
                res.status(404).send({
                    message:
                        "No opinion found."
                });
            else
                db.query(`select PERTINENT.PLAYER_PSEUDO as 'Player name',
                                 PERTINENT_GRADE as 'Grade',
                                 OPINION.COMMENT as 'Opinion graded',
                                 OPINION.PLAYER_PSEUDO as 'Opinion author'
                          from PERTINENT
                          inner join OPINION on PERTINENT.OPINION_ID=OPINION.OPINION_ID
                          where PERTINENT.OPINION_ID=${id}`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding pertinents per opinion."
                            });
                    });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the opinion."
            });
    });
}

// Find a single pertinent with the id of the player and the id of the opinion
exports.findOnePertinent = (req, res) => {
    const idPlayer = req.params.idPlayer;
    const idOpinion = req.params.idOpinion;
    db.query(`select PERTINENT.PLAYER_PSEUDO as 'Player name',
                     PERTINENT_GRADE as 'Grade',
                     OPINION.COMMENT as 'Opinion graded',
                     OPINION.PLAYER_PSEUDO as 'Opinion author'
              from PERTINENT
              inner join OPINION on PERTINENT.OPINION_ID=OPINION.OPINION_ID
              where PERTINENT.PLAYER_PSEUDO='${idPlayer}' and PERTINENT.OPINION_ID=${idOpinion}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows); // todo check if >1 ?
            else
                res.status(404).send({
                    message:
                        "No pertinent found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the pertinent."
            });
    })
};

// update a pertinent by the id in the request
exports.updatePertinent = (req, res) => {
    const pert = {
        grade: req.body.grade,
    };
    const idPlayer = req.params.idPlayer;
    const idOpinion = req.params.idOpinion;
    db.query(`select * from PERTINENT where PLAYER_PSEUDO='${idPlayer}' and OPINION_ID=${idOpinion}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update PERTINENT set PERTINENT_GRADE=${pert.grade}
                            where PLAYER_PSEUDO='${idPlayer}' and OPINION_ID=${idOpinion}`, (err, rows, fields) => {
                    if (!err)
                        res.send('pertinent updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No pertinent found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the pertinent."
            });
    })
};

// Delete a pertinent with the specified idPlayer and idOpinion in the request
exports.deletePertinent = (req, res) => {
    const idPlayer = req.params.idPlayer;
    const idOpinion = req.params.idOpinion;
    db.query(`select * from PERTINENT where PLAYER_PSEUDO='${idPlayer}' and OPINION_ID=${idOpinion}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from PERTINENT where PLAYER_PSEUDO='${idPlayer}' and OPINION_ID=${idOpinion};
                          SET FOREIGN_KEY_CHECKS=1;`, (err, rows, fields) => {
                    if (!err)
                        res.send({
                            message: "Pertinent deleted"
                        });
                    else
                        console.log(err);
                }
                );
            } else
                res.status(404).send({
                    message:
                        "No pertinent to delete."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the pertinent."
            });
    });
}