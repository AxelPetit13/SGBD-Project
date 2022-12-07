const db = require("./../db");

/****************** CATEGORIES ******************/
exports.getAllCategories = (req, res) => {
  const sql = "SELECT * FROM CATEGORIES;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
