const db = require("./../db");

/******** CONTROLLER ILLUSTRATOR **********/
// Get all authors
exports.getIllustrators = (req, res) => {
  const sql =
    "SELECT PERSON.*, COUNT(PERSON.id) FROM PERSON JOIN ILLUSTRATOR I on PERSON.id = I.id_person GROUP BY PERSON.id ORDER BY PERSON.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
