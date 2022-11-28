const db = require("./db");

/**************PEOPLE**************/
// Create person
exports.createPerson = (req, res) => {
  // Validate request
  const person = {
    firstName: req.body.firstName,
    name: req.body.name,
    mail: req.body.mail,
    id: null,
  };
  const idSql = "SELECT MAX(PEOPLE_ID) AS newId FROM PEOPLE";

  db.query(idSql, (err, result, fields) => {
    person.id = result[0].newId + 1;
    if (!err) {
      const sql = `INSERT INTO PEOPLE (PEOPLE_ID, PEOPLE_NAME, PEOPLE_FIRSTNAME, MAIL)
                   VALUES (${person.id}, '${person.name}', '${person.firstName}', '${person.mail}')`;

      db.query(sql, (error, result1, fields1) => {
        if (error) {
          res.status(500).send({
            message: error.message,
          });
        } else {
          res.status(200).send({
            message: `La personne a bien été crée`,
          });
        }
      });
    } else {
      res.status(500).send({
        message: err.message,
      });
    }
  });
};

// Delete person
exports.deletePerson = (req, res) => {
  const id = req.params.id;
  /*db.query(`
        DELETE FROM PEOPLE
        WHERE PEOPLE_ID = ${id}`);*/
  res.send("DELETE resquest");
};
