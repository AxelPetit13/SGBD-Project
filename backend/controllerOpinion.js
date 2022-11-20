const db = require('./db');


/***************Opinion***************/
// Create and Save a new Opinion
exports.createOpinion = (req, res) => {
  // Validate request
  const opinion = {
    grade: req.body.grade,
    comment: req.body.comment,
    playerPseudo: req.body.playerPseudo,
    gameName: req.body.gameName,
    idConfig: req.body.idConfig,
  };
  // Find the next available Id
  db.query('select max(OPINION_ID) as max from OPINION', (err, result) => {
    const idOpinion = result[0].max + 1;
    const currentDate = new Date().toISOString().split("T")[0];
    // Create a opinion
    db.query(`  insert into OPINION
                    values (${idOpinion},${opinion.grade}, '${opinion.comment}',
                            '${currentDate}','${opinion.playerPseudo}',
                            '${opinion.gameName}',${opinion.idConfig})`, (err, rows, fields) => {
      if (!err)
        res.status(303).send({ message: "Opinion created" });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the opinion."
        });
    });
  });

}

// Retrieve all Opinions from the database.
exports.findAllOpinion = (req, res) => {
  db.query(`select OPINION_ID as 'Id',
                     OPINION_GRADE as 'Grade',
                     COMMENT as 'Comment',
                     DATE as 'Date raw',
                     DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                     PLAYER_PSEUDO as 'Opinion author',
                     GAME_NAME as 'Game',
                     CONFIG_ID as 'ID config'
              from OPINION`
    , (err, rows, fields) => {
      if (!err)
        res.send(rows);
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding opinions."
        });
    })
};

// Retrieve all Opinions from a player from the database.
exports.findAllOpinionPerPlayer = (req, res) => {
  const id = req.params.id;
  db.query(`select * from PLAYER where PLAYER_PSEUDO='${id}'`, (err, rows, fields) => {
    if (!err)
      if (rows.length == 0)
        res.status(404).send({
          message:
            "No player found."
        });
      else
        db.query(`select OPINION_ID as 'Id',
                                 OPINION_GRADE as 'Grade',
                                 COMMENT as 'Comment',
                                 DATE as 'Date raw',
                                 DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                                 PLAYER_PSEUDO as 'Opinion author',
                                 GAME_NAME as 'Game',
                                 CONFIG_ID as 'ID config'
                          from OPINION
                          where PLAYER_PSEUDO='${id}'`
          , (err, rows, fields) => {
            if (!err)
              res.send(rows);
            else
              res.status(500).send({
                message:
                  err.message || "Some error occurred while finding opinions per player."
              });
          });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the player."
      });
  });

}

// Retrieve all Opinions from a opinion from the database.
exports.findAllOpinionPerGame = (req, res) => {
  const id = req.params.id;
  db.query(`select * from GAME where GAME_NAME='${id}'`, (err, rows, fields) => {
    if (!err)
      if (rows.length == 0)
        res.status(404).send({
          message:
            "No game found."
        });
      else
        db.query(`select OPINION_ID as 'Id',
                                 OPINION_GRADE as 'Grade',
                                 COMMENT as 'Comment',
                                 DATE as 'Date raw',
                                 DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                                 PLAYER_PSEUDO as 'Opinion author',
                                 GAME_NAME as 'Game',
                                 CONFIG_ID as 'ID config'
                          from OPINION
                          where GAME_NAME='${id}'`
          , (err, rows, fields) => {
            if (!err)
              res.send(rows);
            else
              res.status(500).send({
                message:
                  err.message || "Some error occurred while finding opinions per game."
              });
          });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the game."
      });
  });
}

// Find a single opinion with an id
exports.findOneOpinion = (req, res) => {
  const id = req.params.id;
  db.query(`select OPINION_ID as 'Id',
                     OPINION_GRADE as 'Grade',
                     COMMENT as 'Comment',
                     DATE as 'Date',
                     PLAYER_PSEUDO as 'Opinion author',
                     GAME_NAME as 'Game',
                     CONFIG_ID as 'ID config'
              from OPINION
              where OPINION_ID=${id}`, (err, rows, fields) => {
    if (!err)
      if (rows.length > 0)
        res.send(rows); // todo check if >1 ?
      else
        res.status(404).send({
          message:
            "No opinion found."
        });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the opinion."
      });
  })
};

// update a opinion by the id in the request
exports.updateOpinion = (req, res) => {
  const opinion = {
    grade: req.body.grade,
    comment: req.body.comment,
  };
  const id = req.params.id;
  const currentDate = new Date().toISOString().split("T")[0];
  db.query(`select * from OPINION where OPINION_ID=${id}`, (err, rows, fields) => {
    if (!err)
      if (rows.length > 0)
        db.query(`update OPINION set OPINION_GRADE=${opinion.grade}, COMMENT='${opinion.comment}', DATE='${currentDate}'
                            where OPINION_ID=${id}`, (err, rows, fields) => {
          if (!err)
            res.send('opinion updated');
          else
            console.log(err);
        })
      else
        res.status(404).send({
          message:
            "No opinion found."
        });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the opinion."
      });
  })
};

// Delete a opinion with the specified id in the request
exports.deleteOpinion = (req, res) => {
  const id = req.params.id;
  db.query(`select * from OPINION where OPINION_ID=${id}`, (err, rows, fields) => {
    if (!err)
      if (rows.length > 0) {
        db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from OPINION where OPINION_ID=${id};
                          SET FOREIGN_KEY_CHECKS=1;`, (err, rows, fields) => {
            if (!err)
              res.send({
                message: "Opinion deleted"
              });
            else
              console.log(err);
          }
        );
      } else
        res.status(404).send({
          message:
            "No opinion to delete."
        });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the opinion."
      });
  });
}

/***************Opinion***************/
// Create and Save a new Opinion
exports.createOpinion = (req, res) => {
    // Validate request
    const opinion = {
        grade: req.body.grade,
        comment: req.body.comment,
        playerPseudo: req.body.playerPseudo,
        gameName: req.body.gameName,
        idConfig: req.body.idConfig,
    };
    // Find the next available Id
    db.query('select max(OPINION_ID) as max from OPINION', (err, result) => {
        const idOpinion = result[0].max + 1;
        const currentDate = new Date().toISOString().split("T")[0];
        // Create a opinion
        db.query(`  insert into OPINION
                    values (${idOpinion},${opinion.grade}, '${opinion.comment}',
                            '${currentDate}','${opinion.playerPseudo}',
                            '${opinion.gameName}',${opinion.idConfig})`, (err, rows, fields) => {
            if (!err)
                res.status(303).send({ message: "Opinion created" });
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the opinion."
                });
        });
    });

}

// Retrieve all Opinions from the database.
exports.findAllOpinion = (req, res) => {
    db.query(`select OPINION_ID as 'Id',
                     OPINION_GRADE as 'Grade',
                     COMMENT as 'Comment',
                     DATE as 'Date raw',
                     DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                     PLAYER_PSEUDO as 'Opinion author',
                     GAME_NAME as 'Game',
                     CONFIG_ID as 'ID config'
              from OPINION`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding opinions."
                });
        })
};

// Retrieve all Opinions from a player from the database.
exports.findAllOpinionPerPlayer = (req, res) => {
    const id = req.params.id;
    db.query(`select * from PLAYER where PLAYER_PSEUDO='${id}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length == 0)
                res.status(404).send({
                    message:
                        "No player found."
                });
            else
                db.query(`select OPINION_ID as 'Id',
                                 OPINION_GRADE as 'Grade',
                                 COMMENT as 'Comment',
                                 DATE as 'Date raw',
                                 DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                                 PLAYER_PSEUDO as 'Opinion author',
                                 GAME_NAME as 'Game',
                                 CONFIG_ID as 'ID config'
                          from OPINION
                          where PLAYER_PSEUDO='${id}'`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding opinions per player."
                            });
                    });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the player."
            });
    });

}

// Retrieve all Opinions from a opinion from the database.
exports.findAllOpinionPerGame = (req, res) => {
    const id = req.params.id;
    db.query(`select * from GAME where GAME_NAME='${id}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length == 0)
                res.status(404).send({
                    message:
                        "No game found."
                });
            else
                db.query(`select OPINION_ID as 'Id',
                                 OPINION_GRADE as 'Grade',
                                 COMMENT as 'Comment',
                                 DATE as 'Date raw',
                                 DATE_FORMAT(DATE,"%d/%c/%y") as 'Last modification',
                                 PLAYER_PSEUDO as 'Opinion author',
                                 GAME_NAME as 'Game',
                                 CONFIG_ID as 'ID config'
                          from OPINION
                          where GAME_NAME='${id}'`
                    , (err, rows, fields) => {
                        if (!err)
                            res.send(rows);
                        else
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while finding opinions per game."
                            });
                    });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the game."
            });
    });
}

// Find a single opinion with an id
exports.findOneOpinion = (req, res) => {
    const id = req.params.id;
    db.query(`select OPINION_ID as 'Id',
                     OPINION_GRADE as 'Grade',
                     COMMENT as 'Comment',
                     DATE as 'Date',
                     PLAYER_PSEUDO as 'Opinion author',
                     GAME_NAME as 'Game',
                     CONFIG_ID as 'ID config'
              from OPINION
              where OPINION_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows); // todo check if >1 ?
            else
                res.status(404).send({
                    message:
                        "No opinion found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the opinion."
            });
    })
};

// update a opinion by the id in the request
exports.updateOpinion = (req, res) => {
    const opinion = {
        grade: req.body.grade,
        comment: req.body.comment,
    };
    const id = req.params.id;
    const currentDate = new Date().toISOString().split("T")[0];
    db.query(`select * from OPINION where OPINION_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                db.query(`update OPINION set OPINION_GRADE=${opinion.grade}, COMMENT='${opinion.comment}', DATE='${currentDate}'
                            where OPINION_ID=${id}`, (err, rows, fields) => {
                    if (!err)
                        res.send('opinion updated');
                    else
                        console.log(err);
                })
            else
                res.status(404).send({
                    message:
                        "No opinion found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the opinion."
            });
    })
};

// Delete a opinion with the specified id in the request
exports.deleteOpinion = (req, res) => {
    const id = req.params.id;
    db.query(`select * from OPINION where OPINION_ID=${id}`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from OPINION where OPINION_ID=${id};
                          SET FOREIGN_KEY_CHECKS=1;`, (err, rows, fields) => {
                    if (!err)
                        res.send({
                            message: "Opinion deleted"
                        });
                    else
                        console.log(err);
                }
                );
            } else
                res.status(404).send({
                    message:
                        "No opinion to delete."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the opinion."
            });
    });
}