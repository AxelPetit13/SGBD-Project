module.exports = app => {
  const controller = require("./controller");

  var router = require("express").Router();

  router.use(require("express").json());
  //-------------------PEOPLE-----------------------
  // Create a new Person
  router.post("/people", controller.createPlayer);

  // Retrieve all People
  router.get("/people", controller.findAllPerson);

  // Retrieve a single person with id
  router.get("/people/:id", controller.findOnePerson);

  // Update a person with id
  router.put("/people/:id", controller.updatePerson);

  // Delete a person with id
  router.delete("/people/:id", controller.deletePerson);

  //-------------------PLAYER-----------------------
  //Retrieve all Players + persons
  router.get("/players/", controller.findAllPlayers)

  router.get("/players", controller.findAllPlayers);

  router.get("/players/:id", controller.findOnePlayer);

  // Update a player with id
  router.put("/players/:id", controller.updatePlayer);

  //-------------------GAME-----------------------
  /*  Amaux (je dis ça juste si y'a des erreurs ici c'est ma faute) */
  // Create a new Game
  router.post("/game", controller.createGame);

  // Create a new Game
  router.get("/game", controller.findAllGames);

  // Retrieve a single person with id
  router.get("/game/:id", controller.findOneGame);

  // Update a person with id
  router.put("/game/:id", controller.updateGame);

  // Delete a person with id
  router.delete("/game/:id", controller.deleteGame);
  /*  fin Amaux */

  app.use('/api/', router);
};