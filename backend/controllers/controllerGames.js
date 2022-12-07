const db = require("./../db");

/****************** GAMES ******************/
exports.getAllGames = (req, res) => {
  const sql = "SELECT * FROM GAMES;";
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
  });
};

exports.getGamesByTheme = (req, res) => {
  const themes = req.params.themes.split(/(?=[A-Z])/);
  console.log(themes);

  let sql = `SELECT GAMES.* FROM GAMES JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id WHERE T.name = '${themes[0]}'`;
  for (let i = 1; i < themes.length; i++) {
    sql += `UNION SELECT GAMES.* FROM GAMES JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id WHERE T.name = '${themes[i]}'`;
  }
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
  });
};

exports.createGame = (req, res) => {
  const game = {
    name: req.body.name,
    min: req.body.nb_player_min,
    max: req.body.nb_player_max,
    duration: req.body.duration,
    illustrator_name: req.body.i_name,
    illustrator_lastname: req.body.i_lastname,
    author_name: req.body.a_name,
    author_lastname: req.body.a_lastname,
    editor : req.body.editor,
    expansion : req.body.expansion,
};
  const sql = `SELECT addGame('${game.name}', ${game.duration}, '${game.expansion}','${game.illustrator_lastname}', '${game.illustrator_name}',
      '${game.author_lastname}', '${game.author_name}', '${game.editor}', ${game.max}, ${game.min})`;
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
    else
      res.send(err);
  });
};

exports.deleteGame = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT dropGame(${id})`;
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
    else
      res.send(err);
  });
};

exports.updateGame = (req, res) => {
  const id = req.params.id;
  const game = {
    name: req.body.name,
    expansion: req.body.expansion,
    duration: req.body.duration,
    max: req.body.nb_player_max,
    min: req.body.nb_player_min
  }
  const sql = `SELECT updateGame(${id} ,'${game.name}', ${game.expansion}, ${game.duration}, ${game.max}, ${game.min})`;
  db.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows);
    }
    else
      res.send(err);
  });
};

exports.getGamesByCategories = (req, res) => {
  const categories = req.params.categories.split(/(?=[A-Z])/);
  console.log(categories);

  let sql = `SELECT GAMES.* FROM GAMES JOIN GAMESBYCATEGORIES ON GAMES.id = GAMESBYCATEGORIES.id_game JOIN CATEGORIES C on GAMESBYCATEGORIES.id_category = C.id WHERE C.name = '${categories[0]}'`;
  for (let i = 1; i < categories.length; i++) {
    sql += `UNION SELECT GAMES.* FROM GAMES JOIN GAMESBYCATEGORIES ON GAMES.id = GAMESBYCATEGORIES.id_game JOIN CATEGORY C on GAMESBYCATEGORIES.id_category = C.id WHERE C.name = '${categories[i]}'`;
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

  let sqlCategories = `SELECT GAMES.* FROM GAMES JOIN GAMESBYCATEGORIES ON GAMES.id = GAMESBYCATEGORIES.id_game JOIN CATEGORIES C on GAMESBYCATEGORIES.id_category = C.id WHERE C.name = '${categories[0]}'`;
  for (let i = 1; i < categories.length; i++) {
    sqlCategories += `UNION SELECT GAMES.* FROM GAMES JOIN GAMESBYCATEGORIES ON GAMES.id = GAMESBYCATEGORIES.id_game JOIN CATEGORIES C on GAMESBYCATEGORIES.id_category = C.id WHERE C.name = '${categories[i]}'`;
  }
  let sqlThemes = `SELECT GAMES.id FROM GAMES JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id WHERE T.name = '${themes[0]}'`;
  for (let i = 1; i < themes.length; i++) {
    sqlThemes += `UNION SELECT GAMES.id FROM GAMES JOIN GAMESBYTHEMES ON GAMES.id = GAMESBYTHEMES.id_game JOIN THEMES T on GAMESBYTHEMES.id_theme = T.id WHERE T.name = '${themes[i]}'`;
  }
  /*const sql = `${sqlCategories} AND GAME.id IN (${sqlThemes});`;*/
  sql += `(${sqlCategories}) AS RES WHERE RES.id IN (${sqlThemes}) ORDER BY RES.id;`;

  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
