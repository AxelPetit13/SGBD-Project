const db = require("./../db");

/************** PERSON CONTROLLER **************/
// Create person
exports.createPerson = (req, res) => {
  const person = {
    lastName: req.body.lastName,
    name: req.body.name,
    mail: req.body.mail,
    id: null,
  };
  const idSql = "SELECT MAX(ID) AS newId FROM PERSON";

  db.query(idSql, (err, result, fields) => {
    person.id = result[0].newId + 1;
    if (!err) {
      const sql = `INSERT INTO PERSON (id, name, last_name, mail)
                   VALUES (${person.id}, '${person.name}', '${person.lastName}', '${person.mail}')`;

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
  const person = {
    name: req.body.name,
    lastName: req.body.lastName,
    mail: req.body.mail,
  };
  const sql = `UPDATE PERSON
    SET name = '${person.name}',
        last_name = '${person.lastName}',
        mail = '${person.mail}' 
    WHERE id = ${id};
        `;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

// Delete person
exports.deletePerson = (req, res) => {
  const id = req.params.id;
  const sql = `
    DELETE FROM AUTHOR WHERE id_person = ${id};
    DELETE FROM ILLUSTRATOR WHERE id_person = ${id};
    DELETE FROM PLAYER WHERE id = ${id};
    DELETE FROM PERSON WHERE id = ${id};
              `;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: `La personne ${id} a été supprimée`,
      });
    }
  });
};

// Get all People
exports.getPeople = (req, res) => {
  const sql = "SELECT * FROM PERSON";
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

// Get one person
exports.getPerson = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM PERSON WHERE id = ${id}`;
  db.query(sql, (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(rows);
    }
  });
};
