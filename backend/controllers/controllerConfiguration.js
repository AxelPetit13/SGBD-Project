const db = require("./../db");


/***************CONFIG***************/
// Create and Save a new config
exports.createConfig = (req, res) => {
  // Validate request
  const config = {
    game_name: req.body.game,
    nb_player: req.body.nbPlayers
  };
    db.query(`SELECT addConfiguration (${config.game}, ${config.nb_players})`, (err, result) => {
      if (!err)
        res.send(result);
      else
        res.send(err);
        });
}

// Retrieve all configs from the database.
exports.findAllConfig = (req, res) => {
  db.query(`select * from CONFIGURATIONS`
    , (err, rows) => {
      if (!err)
        res.send(rows);
      else
        res.send(err);
        });
};

// Find a single config with an id
exports.findOneConfig = (req, res) => {
  db.query(`select * from CONFIGURATIONS where id=${req.params.id}`, (err, rows) => {
    if (!err)
      if (rows.length > 0)
        res.send(rows);
      else
        res.send(err);
  })
};

