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

exports.getGamesByTheme = (req, res) => {
  const themes = req.params.themes.split(/(?=[A-Z])/);
  console.log(themes);

  let sql = `SELECT GAME.* FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id WHERE T.name = '${themes[0]}'`;
  for (let i = 1; i < themes.length; i++) {
    sql += `UNION SELECT GAME.* FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id WHERE T.name = '${themes[i]}'`;
  }
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
