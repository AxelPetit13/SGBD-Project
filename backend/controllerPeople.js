const db = require("./db");

/**************PEOPLE**************/
// Create person
exports.createPerson = (req, res) => {
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

// Update person
exports.updatePerson = (req, res) => {
  const id = req.params.id;
  /*const sql = "";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send("Personne mise à jour");
    }
  });*/
};

// Delete person
exports.deletePerson = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM PEOPLE WHERE PEOPLE_ID = ${id}`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send("Personne supprimée");
    }
  });
};

// Get all People
exports.getPeople = (req, res) => {
  const sql = "SELECT * FROM PEOPLE";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send("Toutes les personnes ont été recupérées");
    }
  });
};

// Get one person
exports.getPerson = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM PEOPLE WHERE PEOPLE_ID = ${id}`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(`Personne ${id} sélectionnée`);
    }
  });
};
