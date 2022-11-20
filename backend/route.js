const controllerPlayer = require("./controllerPlayer");
const controllerConfig = require("./controllerConfig");
module.exports = app => {
  const controllerCategory = require("./controllerCategory");
  const controllerConfig = require("./controllerConfig");
  const controllerGame = require("./controllerGame");
  const controllerPlayer = require("./controllerPlayer");
  const controllerTheme = require("./controllerTheme");
  const controllerOpinion = require("./controllerOpinion");

  var router = require("express").Router();

  router.use(require("express").json());
  //-------------------PEOPLE-----------------------
  // Create a new Person
  router.post("/people", controllerPlayer.createPlayer);

  // Retrieve all People
  router.get("/people", controllerPlayer.findAllPerson);

  // Retrieve a single person with id
  router.get("/people/:id", controllerPlayer.findOnePerson);

  // Update a person with id
  router.put("/people/:id", controllerPlayer.updatePerson);

  // Delete a person with id
  router.delete("/people/:id", controllerPlayer.deletePerson);

  //-------------------PLAYER-----------------------
  //Retrieve all Players + persons
  router.get("/player/", controllerPlayer.findAllPlayer)

  router.get("/player/order", controllerPlayer.orderPlayer)

  router.get("/player", controllerPlayer.findAllPlayer);

  router.get("/player/:id", controllerPlayer.findOnePlayer);

  // Update a player with id
  router.put("/player/:id", controllerPlayer.updatePlayer);

  /*  Amaux (je dis ça juste si y'a des erreurs ici c'est ma faute) */
  //-------------------GAME-----------------------
  // Create a new Game
  router.post("/game", controllerGame.createGame);

  // Find all Game
  router.get("/game", controllerGame.findAllGame);

  // Retrieve a single person with id
  router.get("/game/:id", controllerGame.findOneGame);

  // Update a person with id
  router.put("/game/:id", controllerGame.updateGame);

  // Delete a person with id
  router.delete("/game/:id", controllerGame.deleteGame);

  //-------------------THEME-----------------------
  // Create a new Theme
  router.post("/theme", controllerTheme.createTheme);

  // Find all Themes
  router.get("/theme", controllerTheme.findAllTheme);

  // Retrieve a single theme with id
  router.get("/theme/:id", controllerTheme.findOneTheme);

  // Can't update a theme

  // Delete a theme with id
  router.delete("/theme/:id", controllerTheme.deleteTheme);

   //-------------------CATEGORY-----------------------
  // Create a new Category
  router.post("/category", controllerCategory.createCategory);

  // Find all Category
  router.get("/category", controllerCategory.findAllCategory);

  // Retrieve a single category with id
  router.get("/category/:id", controllerCategory.findOneCategory);

  // Can't update a category

  // Delete a category with id
  router.delete("/category/:id", controllerCategory.deleteCategory);

  //-------------------CONFIG-----------------------
  // Create a new Config
  router.post("/config", controllerConfig.createConfig);

  // Find all Config
  router.get("/config", controllerConfig.findAllConfig);

  // Retrieve a single config with id
  router.get("/config/:id", controllerConfig.findOneConfig);

  // Update a config with id
  router.put("/config/:id", controllerConfig.updateConfig);

  // Delete a config with id
  router.delete("/config/:id", controllerConfig.deleteConfig);

  //-------------------Opinion-----------------------
  // Find nth opinion
  router.get("/opinion/recentList/:id", controllerOpinion.listOpinion);

  router.get("/opinion/pertinence", controllerOpinion.pertinentOpinion);

app.use('/api/', router);
};