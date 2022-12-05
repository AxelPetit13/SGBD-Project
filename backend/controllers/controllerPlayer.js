const db = require("./../db");

/************** PERSON PLAYER **************/
// Create player
exports.createPlayer = (req, res) => {
  const player = {
    pseudo: req.body.pseudo,
    mail: req.body.mail,
    name: req.body.name,
    lastname: req.body.lastname,
  };
  const sql = `SELECT addPlayer ('${player.name}', '${player.lastname}', '${player.pseudo}', '${player.mail}')`;
  db.query(sql, (err, res1) => {
    if (!err) {
      res.send(res1);
      }
    else
      console.log(err);
  })
};

// Get all players
exports.getAllPlayers = (req, res) => {
  const sql =
    "SELECT * FROM PLAYER JOIN PERSON on PLAYER.id = PERSON.id ORDER BY PERSON.id;";
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
  });
};


//  Delete a player
exports.deletePlayer = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT dropPlayer(${id})`;
  db.query(sql, (err, res1) => {
    if (!err) {
      res.send(res1);
    }
    else
      res.send(err);
  });
};

// Update a player
exports.updatePlayer = (req, res) => {
  const player = {
    id: req.params.id,
    pseudo:req.body.pseudo,
    mail:req.body.mail
  }
  const sql = `SELECT updatePlayer(${player.id}, '${player.pseudo}', '${player.mail}')`;
  db.query(sql, (err, res1) => {
    if (!err) {
      res.send(res1);
    }
    else
      res.send(err);
  });
};

exports.getAllGamesPlayed = (req, res) => {
  const id_player = req.params.id;
  const sql = `SELECT G.* FROM GAME G
    JOIN OPINION O ON O.id_configuration
    JOIN CONFIGURATION C on O.id_configuration = C.id
    JOIN PLAYER P on O.id_player = P.id
    WHERE C.id_game = G.id
    AND P.id = ${id_player};`;
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
