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

exports.getGamesByCategories = (req, res) => {
  const categories = req.params.categories.split(/(?=[A-Z])/);
  console.log(categories);

  let sql = `SELECT GAME.* FROM GAME JOIN GAMESBYCATEGORY ON GAME.id = GAMESBYCATEGORY.id_game JOIN CATEGORY C on GAMESBYCATEGORY.id_category = C.id WHERE C.name = '${categories[0]}'`;
  for (let i = 1; i < categories.length; i++) {
    sql += `UNION SELECT GAME.* FROM GAME JOIN GAMESBYCATEGORY ON GAME.id = GAMESBYCATEGORY.id_game JOIN CATEGORY C on GAMESBYCATEGORY.id_category = C.id WHERE C.name = '${categories[i]}'`;
  }
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};

exports.getGamesByThemeAndCategories = (req, res) => {
  const themes = req.params.themes.split(/(?=[A-Z])/);
  const categories = req.params.categories.split(/(?=[A-Z])/);

  let sql = "SELECT * FROM";

  let sqlCategories = `SELECT GAME.* FROM GAME JOIN GAMESBYCATEGORY ON GAME.id = GAMESBYCATEGORY.id_game JOIN CATEGORY C on GAMESBYCATEGORY.id_category = C.id WHERE C.name = '${categories[0]}'`;
  for (let i = 1; i < categories.length; i++) {
    sqlCategories += `UNION SELECT GAME.* FROM GAME JOIN GAMESBYCATEGORY ON GAME.id = GAMESBYCATEGORY.id_game JOIN CATEGORY C on GAMESBYCATEGORY.id_category = C.id WHERE C.name = '${categories[i]}'`;
  }
  let sqlThemes = `SELECT GAME.id FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id WHERE T.name = '${themes[0]}'`;
  for (let i = 1; i < themes.length; i++) {
    sqlThemes += `UNION SELECT GAME.id FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id WHERE T.name = '${themes[i]}'`;
  }
  /*const sql = `${sqlCategories} AND GAME.id IN (${sqlThemes});`;*/
  sql += `(${sqlCategories}) AS RES WHERE RES.id IN (${sqlThemes}) ORDER BY RES.id;`;

  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
