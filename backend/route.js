module.exports = app => {
    const controller = require("./controller");
  
    var router = require("express").Router();
    router.use(require("express").json());
  //-------------------PEOPLE-----------------------
    // Create a new Person
    router.post("/people", controller.createPlayer);
  
    // Retrieve all Persons
    router.get("/people", controller.findAllPerson);
  
    // Retrieve a single person with id
    router.get("/people/:id", controller.findOnePerson);
  
    // Update a person with id
    router.put("/people/:id", controller.updatePerson);
  
    // Delete a person with id
    router.delete("/people/:id", controller.deletePerson);

  //-------------------PLAYER-----------------------
    //Retrieve all Players + persons
    router.get("/players", controller.findAllPlayers);

    router.get("/players/:id", controller.findOnePlayer);

    // Update a player with id
  router.put("/players/:id", controller.updatePlayer);

    app.use('/api/', router);
  };