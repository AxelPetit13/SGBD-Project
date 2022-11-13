const db = require('./db');

// Create and Save a new person
exports.createPerson = (req, res) => {
    // Validate request
    console.log(req.body);
    const person = {
        idperson: Date.now() % 1000,
        fName : req.body.fName,
        sName : req.body.sName,
        email: req.body.email,
        idplayer: Date.now() % 1000,
      };
    // Create a person
    db.query(`INSERT INTO person
        VALUES (${person.idperson}, '${person.fName}' ,'${person.sName}'  ,'${person.email}', ${person.idplayer})`, (err, rows, fields) => {
        if (!err)
            res.status(303).send({message : "person created"});
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the person."
          });
        })
  };

// Retrieve all persons from the database.
exports.findAllPerson = (req, res) => {
    db.query(`SELECT * from person`, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding persons."
          });
        })
  };

// Find a single Player with an id
exports.findOnePerson = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * from person where id_person=${id}`, (err, rows, fields) => {
        if (!err)
            if(rows.length>0)
                res.send(rows);
            else
                res.status(404).send({
                    message:
                     "No person"
                  });
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding  the person."
          });
        })
  };

// Update a person by the id in the request
exports.updatePerson = (req, res) => {
    const id = req.params.id;
    
    db.query(`SELECT * from person where id_person=${id}`, (err, rows, fields) => {
        if (!err)
            if(rows.length>0)
            db.query(`UPDATE person SET f_name = '${req.body.fName}', s_name = '${req.body.sName}' , email='${req.body.email}' WHERE id_person=${id}`, (err, rows, fields) => {
            if (!err)
                res.send('updated');
            else
                console.log(err);
            })
            else
                res.status(404).send({
                    message:
                     "No person"
                  });
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding  the person."
          });
        })
    
  };

// Delete a person with the specified id in the request
exports.deletePerson = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * from person where id_person=${id}`, (err, rows, fields) => {
        if (!err)
            if(rows.length>0)
                db.query(`DELETE from person where id_person=${id}`, (err, rows, fields) => {
                if (!err)
                    res.send({
                        message: "deleted"
                    });
                else
                    console.log(err);
                })   
            else
                res.status(404).send({
                    message:
                     "No person"
                  });
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding  the person."
          });
        })
    
  };

  // Retrieve all persons from the database.
exports.findAllPlayers = (req, res) => {
    db.query(`SELECT * from person pe inner join player pl on pl.ID_PLAYER=pe.ID_PLAYER `, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding persons."
          });
        })
  };