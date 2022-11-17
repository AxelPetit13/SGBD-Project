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
    
    
    /*  Amaux (je dis ça juste si y'a des erreurs ici c'est ma faute) */
    // Create a new Game
    router.get("/game", controller.findAllGame);
  
    // Retrieve a single person with id
    router.get("/game/:id", controller.findOneGame);
  
    // Update a person with id
    router.put("/game/:id", controller.updateGame);
  
    // Delete a person with id
    router.delete("/game/:id", controller.deleteGame);

    //Retrieve all Players + persons
    router.get("/game/", controller.findAllGame)
    
    /*  fin Amaux */


    app.use('/api/', router);
  };