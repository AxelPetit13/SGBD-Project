const db = require("./../db");

/************** PERSON PLAYER **************/
// Create player
exports.createPlayer = (req, res) => {
  const player = {
    id: req.body.id,
    name: req.body.name,
    lastName: req.body.lastName,
    mail: req.body.lastName,
    pseudo: res.body.pseudo,
  };
  const sql = `SELECT * FROM PLAYER WHERE id = ${player.id}`;
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      if (rows[0] != null) {
        const sql1 = `
        INSERT INTO PERSON (id, name, last_name, mail) VALUES (${player.id}, '${player.name}', '${player.lastName}', '${player.mail}');
        INSERT INTO PLAYER (id, pseudo) VALUES (${player.id}, '${player.pseudo}');
`;
        db.query(sql1, (err1, rows1, fields1) => {
          if (!err1) {
            res.status(200).send({
              message: "Le joueur a été créé.",
            });
          }
        });
      }
    }
  });
};

// Get all players
exports.getAllPlayers = (req, res) => {
  const sql =
    "SELECT * FROM PLAYER JOIN PERSON on PLAYER.id = PERSON.id ORDER BY PERSON.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
