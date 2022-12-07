const db = require("./../db");

/****************** COMMENTS ******************/
exports.getAllComments = (req, res) => {
  const sql =
    "SELECT O.id, G.name, O.message, P.pseudo, O.mark, O.date  FROM OPINIONS O JOIN PLAYERS P on O.id_player = P.id JOIN CONFIGURATIONS C on O.id_configuration = C.id JOIN GAMES G on C.id_game = G.id ORDER BY O.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};

exports.getAllCommentsOfPlayer = (req, res) => {
  const id_player = req.params.id;
  const sql = `SELECT O.* FROM OPINIONS O
    JOIN PLAYERS P on O.id_player = P.id
    WHERE P.id = ${id_player}`;
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};

exports.createOpinion = (req, res) => {
  const game = {
    message: req.body.message,
    nb_player: req.body.nb_player,
    mark: req.body.mark,
    date: req.body.date,
    game_name: req.body.game_name,
    pseudo: req.body.pseudo,
  };
  const sql = `SELECT addOpinion(${game.nb_player}, "${game.game_name}", '${game.pseudo}', 
      '${game.message}', ${game.mark}, '${game.date}')`;
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
    else
      res.send(err);
  });
};



exports.updateOpinion = (req, res) => {
  const game = {
    id: req.params.id,
    message: req.body.message,
    mark: req.body.mark,
    date: req.body.date,
  };
  const sql = `SELECT updateOpinion(${game.id}, '${game.message}', 
        ${game.mark}, '${game.date}')`;
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
    else
      res.send(err);
  });
};

