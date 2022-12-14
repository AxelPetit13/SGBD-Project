module.exports = (app) => {
  const controllerPeople = require("./controllers/controllerPeople");
  const controllerAuthor = require("./controllers/controllerAuthor");
  const controllerIllustrator = require("./controllers/controllerIllustrator");
  const controllerStatistics = require("./controllers/controllerStatistics");
  const controllerCategories = require("./controllers/controllerCategories");
  const controllerGame = require("./controllers/controllerGames");
  const controllerOpinion = require("./controllers/controllerComments");
  const controllerPlayer = require("./controllers/controllerPlayer");
  const controllerThemes = require("./controllers/controllerThemes");
  const controllerComments = require("./controllers/controllerComments");
  const controllerConfig = require("./controllers/controllerConfiguration");
  const router = require("express").Router();

  router.use(require("express").json());

  //-----------------------PEOPLE---------------------------
  // Create a Person
  router.post("/people", controllerPeople.createPerson);

  // Update a Person with ID
  router.put("/people/:id", controllerPeople.updatePerson);

  // Delete a Person with ID
  router.delete("/people/:id", controllerPeople.deletePerson);

  // Retrieve all person
  router.get("/people", controllerPeople.getPeople);

  // Retrieve one persone with ID
  router.get("/people/:id", controllerPeople.getPerson);

  //-------------------PLAYER-----------------------
  //Retrieve all Players + persons

  router.post("/player", controllerPlayer.createPlayer);

  router.get("/player", controllerPlayer.getAllPlayers);

  router.get("/player/:id", controllerPlayer.getAllGamesPlayed);

  // Update a player with id
  router.put("/player/:id", controllerPlayer.updatePlayer);

  // Delete a player with id
  router.delete("/player/:id", controllerPlayer.deletePlayer);

  //-------------------AUTHOR-----------------------
  // Get all author
  router.get("/authors", controllerAuthor.getAuthors);

  //-------------------ILLUSTRATOR-----------------------
  // Get all illustrator
  router.get("/illustrators", controllerIllustrator.getIllustrators);
  //-------------------GAME-----------------------
  // Create a new Game
  router.post("/game", controllerGame.createGame);

  // Find all Game
  router.get("/game", controllerGame.getAllGames);

  // Get games by theme
  router.get("/game/theme:themes", controllerGame.getGamesByTheme);

  // Get games by categories
  router.get(
    "/game/categories:categories",
    controllerGame.getGamesByCategories
  );

  // get games by themes
  router.get(
    "/game/:categories/:themes",
    controllerGame.getGamesByThemeAndCategories
  );

  // Update a game with id
  router.put("/game/:id", controllerGame.updateGame);

  // Delete a game with id
  router.delete("/game/:id", controllerGame.deleteGame);

  //-------------------OPINION-----------------------
  // Get all comments
  router.get("/comments", controllerComments.getAllComments);

  // Get all comments from a player
  router.get("/comments/:id", controllerComments.getAllCommentsOfPlayer);

  //-------------------THEME-----------------------
  // Get all themes
  router.get("/themes", controllerThemes.getAllThemes);

  //-------------------CATEGORY-----------------------
  // Get all themes
  router.get("/categories", controllerCategories.getAllCategories);

  //-------------------CONFIG-----------------------
  // Create a new Config
  router.post("/config", controllerConfig.createConfig);

  // Find all Config
  router.get("/config", controllerConfig.findAllConfig);

  // Retrieve a single config with id
  router.get("/config/:id", controllerConfig.findOneConfig);

  //-------------------OPINION-----------------------
  // Create a new Opinion
  router.post("/opinion", controllerOpinion.createOpinion);

  // Find all opinions
  router.get("/opinion", controllerOpinion.getAllComments);

  // Retrieve all opinion per player_id
  router.get("/opinion/player/:id", controllerOpinion.getAllCommentsOfPlayer);

  //-------------------STATISTICS-----------------------
  // Get most rated comment
  router.get("/mostRatedComment", controllerStatistics.getMostRatedComment);

  // Get pourcentage repr??sentation of each theme
  router.get("/pourcentageThemes", controllerStatistics.pourcentageThemes);

  // Get 5 most recents comments
  router.get("/recentComments", controllerStatistics.recentComments);

  // Get most commented Game
  router.get("/mostCommentedGame", controllerStatistics.mostCommentedGame);

  // Get the game with the highest grade
  router.get("/bestGradedGame", controllerStatistics.bestGradedGame);

  // Get the game with the worst grade
  router.get("/worstGradedGame", controllerStatistics.worstGradedGame);

  // Get the most prolific editor
  router.get("/mostProlificEditor", controllerStatistics.mostProlificEditor);

  // Get most active players
  router.get("/mostActivePlayers", controllerStatistics.mostActivePlayers);

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  app.use("/api/", router);
};
