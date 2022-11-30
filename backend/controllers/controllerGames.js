const db = require("./../db");

/****************** GAMES ******************/
exports.getAllGames = (req, res) => {
  const sql = "SELECT * FROM GAME;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
