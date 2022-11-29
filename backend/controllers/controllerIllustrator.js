const db = require("./../db");

/******** CONTROLLER ILLUSTRATOR **********/
// Get all illustrators
exports.getAuthors = (req, res) => {
  const sql =
    "SELECT * FROM PERSON JOIN GAMESBYILLUSTRATOR G on PERSON.id = G.id_person;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.status(200).send({
        message: "Récupération de tous les illustrateurs",
      });
    }
  });
};
