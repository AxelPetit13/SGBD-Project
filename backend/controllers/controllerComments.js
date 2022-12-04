const db = require("./../db");

/****************** COMMENTS ******************/
exports.getAllComments = (req, res) => {
  const sql =
    "SELECT O.id, G.name, O.message, P.pseudo, O.mark, O.date  FROM OPINION O JOIN PLAYER P on O.id_player = P.id JOIN CONFIGURATION C on O.id_configuration = C.id JOIN GAME G on C.id_game = G.id ORDER BY O.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};

exports.getAllCommentsOfPlayer = (req, res) => {
  const id_player = req.params.id;
  const sql = `SELECT O.* FROM OPINION O
    JOIN PLAYER P on O.id_player = P.id
    WHERE P.id = ${id_player}`;
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
