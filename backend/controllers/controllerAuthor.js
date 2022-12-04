const db = require("./../db");

/******** CONTROLLER AUTHOR **********/
// Get all authors
exports.getAuthors = (req, res) => {
  const sql =
    "SELECT PERSON.*, COUNT(PERSON.id) FROM PERSON JOIN AUTHOR A on PERSON.id = A.id_person GROUP BY PERSON.id ORDER BY PERSON.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
