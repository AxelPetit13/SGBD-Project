const db = require("./../db");

/******** CONTROLLER AUTHOR **********/
// Get all authors
exports.getAuthors = (req, res) => {
  const sql =
    "SELECT PEOPLE.*, COUNT(PEOPLE.id) FROM PEOPLE JOIN AUTHORS A on PEOPLE.id = A.id_person GROUP BY PEOPLE.id ORDER BY PEOPLE.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
