const db = require("./db");
exports.listOpinion = (req, res) => {
  const nbOpinion= req.params.id;
  db.query(`select * from OPINION order by DATE desc LIMIT ${nbOpinion}`, (err, rows, fields) => {
    if (!err)
      if (rows.length > 0)
        res.send(rows);
      else
        res.status(404).send({
          message:
            "No person"
        });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the player."
      });
  })
};

exports.pertinentOpinion = (req, res) => {
  db.query("select O.OPINION_ID, count(O.OPINION_ID) as pertinence from OPINION O inner join PERTINENT P on P.OPINION_ID = O.OPINION_ID group by O.OPINION_ID", (err, rows, fields) => {
    if (!err)
      if (rows.length > 0)
        res.send(rows);
      else
        res.status(404).send({
          message:
            "No person"
        });
    else
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the player."
      });
  })
};
