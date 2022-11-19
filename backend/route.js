module.exports = app => {
  const controller = require("./controller");
  const controllerCategory = require("./controllerCategory");
  const controllerConfig = require("./controllerConfig");
  const controllerGame = require("./controllerGame");
  const controllerOpinion = require("./controllerOpinion");
  const controllerPertinent = require("./controllerPertinent");
  const controllerPlayer = require("./controllerPlayer");
  const controllerTheme = require("./controllerTheme");

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

  //-------------------PERTINENT-----------------------
  // Create a new Pertinent
  router.post("/pertinent", controllerPertinent.createPertinent);

  // Find all Pertinent
  router.get("/pertinent", controllerPertinent.findAllPertinent);

  // Retrieve all pertinents per player_id
  router.get("/pertinent/player/:id", controllerPertinent.findAllPertinentPerPlayer);

  // Retrieve all pertinents per opinion_id
  router.get("/pertinent/opinion/:id", controllerPertinent.findAllPertinentPerOpinion);

  // Retrieve a single pertinent with id
  router.get("/pertinent/Player=:idPlayer&Opinion=:idOpinion", controllerPertinent.findOnePertinent);

  // Update a pertinent with id
  router.put("/pertinent/Player=:idPlayer&Opinion=:idOpinion", controllerPertinent.updatePertinent);

  // Delete a pertinent with id
  router.delete("/pertinent/Player=:idPlayer&Opinion=:idOpinion", controllerPertinent.deletePertinent);

  //-------------------OPINION-----------------------
  // Create a new Opinion
  router.post("/opinion", controllerOpinion.createOpinion);

  // Find all opinions
  router.get("/opinion", controllerOpinion.findAllOpinion);

  // Retrieve all opinion per player_id
  router.get("/opinion/player/:id", controllerOpinion.findAllOpinionPerPlayer);

  // Retrieve all opinion per game_id
  router.get("/opinion/game/:id", controllerOpinion.findAllOpinionPerGame);

  // Retrieve a single opinion with id
  router.get("/opinion/:id", controllerOpinion.findOneOpinion);

  // Update a opinion with id
  router.put("/opinion/:id", controllerOpinion.updateOpinion);

  // Delete a opinion with id
  router.delete("/opinion/:id", controllerOpinion.deleteOpinion);

  // The set of reviewed games available in a given theme, classified by category
  router.get("/reviewedGamePerThemeByCategory/:id", controller.reviewedGamePerThemeByCategory);

  // Per player, the list of comments which refered to games in its favorites categories.
  router.get("/commentsPerPlayerFavCategory/:id", controller.commentsPerPlayerFavCategory);

  // Per comment, the list of players who liked it.
  router.get("/playerReactedPerOpinion/:id", controller.playerReactedPerOpinion);

  /*  fin Amaux */




  app.use('/api/', router);
};