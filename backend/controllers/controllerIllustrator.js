const db = require("./../db");

/******** CONTROLLER ILLUSTRATOR **********/
// Get all authors
exports.getIllustrators = (req, res) => {
  const sql =
    "SELECT PEOPLE.*, COUNT(PEOPLE.id) FROM PEOPLE JOIN ILLUSTRATORS I on PEOPLE.id = I.id_person GROUP BY PEOPLE.id ORDER BY PEOPLE.id;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
