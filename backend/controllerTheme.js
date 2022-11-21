const db = require('./db');

/***************THEME***************/
// Create and Save a new theme
exports.createTheme = (req, res) => {
    // Validate request
    const theme = {
        tName: req.body.tName,
    };
    // Create a theme
    db.query(`  insert into THEME
                values ('${theme.tName}')`, (err, rows, fields) => {
        if (!err)
            res.status(303).send({ message: "theme created" });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the theme."
            });
    });

};

// Retrieve all themes from the database.
exports.findAllTheme = (req, res) => {
    db.query(`select THEME_NAME as Name
              from THEME`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding themes."
                });
        })
};

// Find a single game with an name
exports.findOneTheme = (req, res) => {
    const name = req.params.id;
    db.query(`select THEME_NAME as Name
              from THEME
              where THEME_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows); // todo check if >1 ?
            else
                res.status(404).send({
                    message:
                        "No theme found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding  the theme."
            });
    })
};

// Delete a theme with the specified name in the request
exports.deleteTheme = (req, res) => {
    const name = req.params.id;
    db.query(`select * from THEME where THEME_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from THEME_PREF where THEME_NAME='${name}';
                          delete from THEME where THEME_NAME='${name}';
                          SET FOREIGN_KEY_CHECKS=1;`, (err, rows, fields) => {
                    if (!err)
                        res.send({
                            message: "deleted"
                        });
                    else
                        console.log(err);
                }
                );
            } else
                res.status(404).send({
                    message:
                        "No theme to delete."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the theme."
            });
    });
}