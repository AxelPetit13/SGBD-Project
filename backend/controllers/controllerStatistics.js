const db = require("./../db");

/************** STATS **************/
// Get most Rated Comment
exports.getMostRatedComment = (req, res) => {
  const sql =
    "SELECT P.id, P.pseudo, G.id, G.name as game, O.id, O.message, O.mark, O.date, COUNT(*) AS times_rated FROM RELEVANT JOIN OPINION O ON RELEVANT.id_opinion = O.id JOIN CONFIGURATION C ON O.id_configuration = C.id JOIN GAME G ON C.id_game = G.id JOIN PLAYER P ON P.id = O.id_player GROUP BY O.id ORDER BY COUNT(*) DESC LIMIT 1;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};

// get pourcentage représentation of each theme
exports.pourcentageThemes = (req, res) => {
  const sql =
    "SELECT T.name, count(T.name) as value FROM GAME JOIN GAMESBYTHEME ON GAME.id = GAMESBYTHEME.id_game JOIN THEME T on GAMESBYTHEME.id_theme = T.id GROUP BY T.name;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};

// get 5 most recent comments with all details
exports.recentComments = (req, res) => {
  const sql =
    "SELECT O. id, P.pseudo as author, G.name as game, O.message, O.mark, O.date, CONFIDENCE.confidence_index FROM OPINION O JOIN PLAYER P on O.id_player = P.id JOIN GAME G on G.id = O.id_configuration JOIN CONFIGURATION C on C.id = O.id_configuration JOIN (SELECT id_opinion,  (1 + SUM(is_positive))/(1 + COUNT(is_positive) - SUM( is_positive)) as confidence_index FROM RELEVANT GROUP BY RELEVANT.id_opinion ORDER BY confidence_index DESC) as CONFIDENCE ON CONFIDENCE.id_opinion = O.id ORDER BY O.date DESC LIMIT 5;";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
  });
};
