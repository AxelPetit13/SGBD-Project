module.exports = app => {
    const controller = require("./controller");
  
    var router = require("express").Router();
    router.use(require("express").json());
  
    // Create a new Person
    router.post("/persons", controller.createPerson);
  
    // Retrieve all Persons
    router.get("/persons", controller.findAllPerson);
  
    // Retrieve a single person with id
    router.get("/persons/:id", controller.findOnePerson);
  
    // Update a person with id
    router.put("/persons/:id", controller.updatePerson);
  
    // Delete a person with id
    router.delete("/persons/:id", controller.deletePerson);

    //Retrieve all Players + persons
    router.get("/players/", controller.findAllPlayers)

    app.use('/api/', router);
  };