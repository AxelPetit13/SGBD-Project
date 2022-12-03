const db = require("./../db");

/****************** THEMES ******************/
exports.getAllThemes = (req, res) => {
  const sql = "SELECT * FROM THEME;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
