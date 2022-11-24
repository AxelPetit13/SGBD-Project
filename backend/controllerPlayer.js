const db = require("./db");

/***************PEOPLE***************/
// Create and Save a new person
exports.createPlayer = (req, res) => {
  // Validate request
  const person = {
    fName: req.body.fName,
    name: req.body.name,
    mail: req.body.mail,
    pseudo: req.body.pseudo,
  };
  // Create a person
  db.query("select max(PEOPLE_ID) as max from PEOPLE", (err, result) => {
    const idPerson = result[0].max + 1;
    db.query(
      `insert into PEOPLE
                  values (${idPerson}, '${person.name}' ,'${person.fName}' ,'${person.mail}')`,
      (err, rows, fields) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the person.",
          });
      }
    );
    const date = new Date();
    db.query(
      `insert into PLAYER
                  values ('${person.pseudo}', ${idPerson} ,'${date}')`,
      (err) => {
        if (!err)
          res.status(303).send({ message: "people and player created" });
        else
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the person.",
          });
      }
    );
  });
};

// Retrieve all persons from the database.
exports.findAllPerson = (req, res) => {
  db.query("select * from PEOPLE", (err, rows, fields) => {
    if (!err) res.send(rows);
    else
      res.status(500).send({
        message: err.message || "Some error occurred while finding persons.",
      });
  });
};

// Find a single person with an id
exports.findOnePerson = (req, res) => {
  const id = req.params.id;
  db.query(
    `select * from PEOPLE where PEOPLE_ID=${id}`,
    (err, rows, fields) => {
      if (!err)
        if (rows.length > 0) res.send(rows);
        else
          res.status(404).send({
            message: "No person",
          });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding  the person.",
        });
    }
  );
};

// update a person by the id in the request
exports.updatePerson = (req, res) => {
  const person = {
    fName: req.body.fName,
    name: req.body.name,
    mail: req.body.mail,
  };
  const id = req.params.id;
  db.query(
    `select * from PEOPLE where PEOPLE_ID=${id}`,
    (err, rows, fields) => {
      if (!err)
        if (rows.length > 0)
          db.query(
            `update PEOPLE set  PEOPLE_NAME='${person.name}' , PEOPLE_FIRSTNAME='${person.fName}' , mail='${person.mail}' WHERE people_id=${id}`,
            (err, rows, fields) => {
              if (!err) res.send("updated");
              else console.log(err);
            }
          );
        else
          res.status(404).send({
            message: "No person",
          });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding  the person.",
        });
    }
  );
};

// update a person by the id in the request
exports.updatePlayer = (req, res) => {
  const id = req.params.id;
  const player = {
    pseudo: req.body.pseudo,
    themeId: req.body.themeId,
    catId: req.body.catId,
  };

  db.query(
    `select * from PLAYER where PEOPLE_ID =${id}`,
    (err, rows, fields) => {
      if (!err)
        if (rows.length > 0)
          db.query(
            `update PLAYER set THEME_NAME='${player.themeName}' , CATEGORY_NAME='${player.catName}' WHERE PEOPLE_ID =${id}`,
            (err, rows, fields) => {
              if (!err) res.send("updated");
              else console.log(err);
            }
          );
        else
          res.status(404).send({
            message: "No player",
          });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding  the person.",
        });
    }
  );
};

// Delete a person with the specified id in the request
exports.deletePerson = (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * from PEOPLE where PEOPLE_ID =${id}`,
    (err, rows, fields) => {
      if (!err)
        if (rows.length > 0) {
          db.query(
            `delete from PLAYER where PEOPLE_ID =${id}`,
            (err, rows, fields) => {
              if (err) console.log(err);
            }
          );
          db.query(
            `set PLAYER_FK1=0;
             delete from PEOPLE where PEOPLE_ID =${id};
             set PLAYER_FK1=1`,
            (err, rows, fields) => {
              if (!err)
                res.send({
                  message: "deleted",
                });
              else console.log(err);
            }
          );
        } else
          res.status(404).send({
            message: "No people",
          });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding  the person.",
        });
    }
  );
};

// Retrieve all people from the database.
exports.findAllPlayer = (req, res) => {
  db.query(
    `select * from PEOPLE pe inner join PLAYER pl on pl.PEOPLE_ID=pe.PEOPLE_ID  `,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else
        res.status(500).send({
          message: err.message || "Some error occurred while finding persons.",
        });
    }
  );
};

// Find a single Player with an id
exports.findOnePlayer = (req, res) => {
  const id = req.params.id;
  db.query(
    `select * from PEOPLE pe inner join PLAYER pl on pl.PEOPLE_ID=pe.PEOPLE_ID where pe.PEOPLE_ID=${id}`,
    (err, rows, fields) => {
      if (!err)
        if (rows.length > 0) res.send(rows);
        else
          res.status(404).send({
            message: "No person",
          });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding the player.",
        });
    }
  );
};

// Find a single Player with an id todo
exports.orderPlayer = (req, res) => {
  db.query(
    "select pl.player_pseudo, count(pl.player_pseudo) as nb_opinion from player pl inner join opinion o on o.player_pseudo=pl.player_pseudo group by pl.player_pseudo order by nb_opinion desc",
    (err, rows, fields) => {
      if (!err)
        if (rows.length > 0) res.send(rows);
        else
          res.status(404).send({
            message: "No person",
          });
      else
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding the player.",
        });
    }
  );
};
