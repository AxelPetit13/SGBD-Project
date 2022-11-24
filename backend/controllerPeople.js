const db = require("./db");

/**************PEOPLE**************/
// Delete people
exports.deletePerson = (req, res) => {
  const id = req.params.id;
  /*db.query(`
        DELETE FROM PEOPLE
        WHERE PEOPLE_ID = ${id}`);*/
  res.send("DELETE resquest");
};
