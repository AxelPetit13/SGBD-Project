const db = require("./../db");

/****************** GAMES ******************/
exports.getAllGames = (req, res) => {
  const sql = "SELECT * FROM GAME;";
  db.query(sql, (err, rows) => {
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
    editor : req.body.editor
};
  const sql = `SELECT addGame('${game.name}', ${game.duration}, '${game.illustrator_lastname}', '${game.illustrator_name}',
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
  const game = {
    id: req.params.id,
    name:req
  }
  const sql = `SELECT updateGame(a_id, a_name , a_expansion , a_duration , max , min)`;
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
