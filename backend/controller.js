const db = require('./db');



//--------------------PEOPLE--------------------
// Create and Save a new person
exports.createPlayer = (req, res) => {
    // Validate request
    console.log(req.body);
    const person = {
        fName : req.body.fName,
        name : req.body.name,
        mail: req.body.mail,
        pseudo: req.body.pseudo,
        themeName: req.body.themeName,
        catName: req.body.catName,
      };
    // Create a person
    db.query('SELECT max(PEOPLE_ID) as max from PEOPLE', (err, result) => {
        const idPerson = result[0].max + 1;
        db.query(`INSERT INTO PEOPLE
        VALUES (${idPerson}, '${person.name}' ,'${person.fName}' ,'${person.mail}')`, (err, rows, fields) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the person."
          });
        });
        db.query(`INSERT INTO PLAYER
        VALUES ('${person.pseudo}', ${idPerson} ,'${person.themeName}' ,'${person.catName}')`, 
        (err) => {
        if (!err)
            res.status(303).send({message : "people and player created"});
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the person."
          });
        });
    });
    
  };

// Retrieve all persons from the database.
exports.findAllPerson = (req, res) => {
    db.query('SELECT * from people', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding persons."
          });
        })
  };

// Find a single person with an id
exports.findOnePerson = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * from people where people_id=${id}`, (err, rows, fields) => {
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
    const person = {
        fName : req.body.fName,
        name : req.body.name,
        mail: req.body.mail,
    };
    const id = req.params.id;
    db.query(`SELECT * from people where people_id=${id}`, (err, rows, fields) => {
        if (!err) 
            if(rows.length>0)
                db.query(`UPDATE people SET  people_name='${person.name}' , people_firstname='${person.fName}' , mail='${person.mail}' WHERE people_id=${id}`, (err, rows, fields) => {
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

// Update a person by the id in the request
exports.updatePlayer = (req, res) => {
    const id = req.params.id;
    const player = {
        pseudo: req.body.pseudo,
        themeName: req.body.themeName,
        catName: req.body.catName,
    };
    
    db.query(`SELECT * from player where PEOPLE_ID =${id}`, (err, rows, fields) => {
        if (!err)
            if(rows.length>0)
            db.query(`UPDATE player SET THEME_NAME='${player.themeName}' , CATEGORY_NAME='${player.catName}' WHERE PEOPLE_ID =${id}`, (err, rows, fields) => {
            if (!err)
                res.send('updated');
            else
                console.log(err);
            })
            else
                res.status(404).send({
                    message:
                     "No player"
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
    db.query(`SELECT * from people where PEOPLE_ID =${id}`, (err, rows, fields) => {
        if (!err)
            if(rows.length>0){
                db.query(`DELETE from player where PEOPLE_ID =${id}`, (err, rows, fields) => {
                    if (err)
                        console.log(err);
                    });
                db.query(`SET PLAYER_FK1=0; DELETE from people where PEOPLE_ID =${id}; SET PLAYER_FK1=1`, (err, rows, fields) => {
                if (!err)
                    res.send({
                        message: "deleted"
                    });
                else
                    console.log(err);
                })   }
            else
                res.status(404).send({
                    message:
                     "No people"
                  });
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while finding  the person."
          });
        })
    
  };

  // Retrieve all people from the database.
exports.findAllPlayers = (req, res) => {
    db.query(`SELECT * from people pe inner join player pl on pl.PEOPLE_ID=pe.PEOPLE_ID  `, (err, rows, fields) => {
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
exports.findOnePlayer = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * from people pe inner join player pl on pl.PEOPLE_ID=pe.PEOPLE_ID where pE.PEOPLE_ID=${id}`, (err, rows, fields) => {
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
              err.message || "Some error occurred while finding the player."
          });
        })
};

//------------------------OPINION-------------------------------

exports.createOpinion = (req, res) => {
    // Validate request
    console.log(req.body);
    const opinion = {
        date : Date.now(),
        comment : req.body.comment,
        grade : req.body.grade,
        pseudo: req.body.pseudo,
        gameName: req.body.gameName,
      };
    // Create a person
    db.query('SELECT max(PEOPLE_ID) as max from PEOPLE', (err, result) => {
        const idPerson = result[0].max + 1;
        db.query(`INSERT INTO PEOPLE
        VALUES (${idPerson}, '${person.name}' ,'${person.fName}' ,'${person.mail}')`, (err, rows, fields) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the person."
          });
        });
        db.query(`INSERT INTO PLAYER
        VALUES ('${person.pseudo}', ${idPerson} ,'${person.themeName}' ,'${person.catName}')`, 
        (err) => {
        if (!err)
            res.status(303).send({message : "people and player created"});
        else
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the person."
          });
        });
    });
    
  };