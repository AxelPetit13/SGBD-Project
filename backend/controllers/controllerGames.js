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
  };
  const sql = `SELECT addGame('${game.name}', ${game.duration}, ${game.max},  ${game.min})`;
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
