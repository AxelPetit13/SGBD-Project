const db = require("./../db");

/******** CONTROLLER AUTHOR **********/
// Get all authors
exports.getAuthors = (req, res) => {
  const sql =
    "SELECT * FROM PERSON JOIN GAMESBYAUTHOR G on PERSON.id = G.id_person;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.status(200).send({
        message: "Récupération de tous les auteurs",
      });
    }
  });
};
