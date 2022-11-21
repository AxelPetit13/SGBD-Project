const db = require('./db');


/***************CATEGORY***************/
// Create and Save a new category
exports.createCategory = (req, res) => {
    // Validate request
    const cat = {
        cName: req.body.cName,
    };
    // Create a category
    db.query(`  insert into CATEGORY
                values ('${cat.cName}')`, (err, rows, fields) => {
        if (!err)
            res.status(303).send({ message: "Category created" });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
    });

};

// Retrieve all themes from the database.
exports.findAllCategory = (req, res) => {
    db.query(`select CATEGORY_NAME as Name
              from CATEGORY`
        , (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while finding categories."
                });
        })
};

// Find a single category with an name
exports.findOneCategory = (req, res) => {
    const name = req.params.id;
    db.query(`select CATEGORY_NAME as Name
              from CATEGORY
              where CATEGORY_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0)
                res.send(rows); // todo check if >1 ?
            else
                res.status(404).send({
                    message:
                        "No category found."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the category."
            });
    })
};

// Delete a game with the specified name in the request
exports.deleteCategory = (req, res) => {
    const name = req.params.id;
    db.query(`select * from CATEGORY where CATEGORY_NAME='${name}'`, (err, rows, fields) => {
        if (!err)
            if (rows.length > 0) {
                db.query(`SET FOREIGN_KEY_CHECKS=0;
                          delete from CAT_PREF where CATEGORY_NAME='${name}';
                          delete from CATEGORY where CATEGORY_NAME='${name}';
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
                        "No category to delete."
                });
        else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding the category."
            });
    });
}
