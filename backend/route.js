module.exports = (app) => {
  const controllerPeople = require("./controllers/controllerPeople");
  const controllerAuthor = require("./controllers/controllerAuthor");
  const controllerIllustrator = require("./controllers/controllerIllustrator");
  const controllerStatistics = require("./controllers/controllerStatistics");
  const controllerConsultation = require("./controllerConsultation");
  const controllerCategories = require("./controllers/controllerCategories");
  const controllerConfig = require("./controllerConfig");
  const controllerGame = require("./controllers/controllerGames");
  const controllerOpinion = require("./controllers/controllerComments");
  const controllerPertinent = require("./controllerPertinent");
  const controllerPlayer = require("./controllers/controllerPlayer");
  const controllerThemes = require("./controllers/controllerThemes");
  const controllerComments = require("./controllers/controllerComments");
  var router = require("express").Router();

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

  /*router.get("/player/order", controllerPlayer.orderPlayer);*/

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

  router.get(
    "/game/:categories/:themes",
    controllerGame.getGamesByThemeAndCategories
  );
  /*
   // Retrieve a single person with id
  router.get("/game/:id", controllerGame.findOneGame);
*/
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
  router.get(
    "/pertinent/player/:id",
    controllerPertinent.findAllPertinentPerPlayer
  );

  // Retrieve all pertinents per opinion_id
  router.get(
    "/pertinent/opinion/:id",
    controllerPertinent.findAllPertinentPerOpinion
  );

  // Retrieve a single pertinent with id
  router.get(
    "/pertinent/Player=:idPlayer&Opinion=:idOpinion",
    controllerPertinent.findOnePertinent
  );

  // Update a pertinent with id
  router.put(
    "/pertinent/Player=:idPlayer&Opinion=:idOpinion",
    controllerPertinent.updatePertinent
  );

  // Delete a pertinent with id
  router.delete(
    "/pertinent/Player=:idPlayer&Opinion=:idOpinion",
    controllerPertinent.deletePertinent
  );

  //-------------------OPINION-----------------------
  // Create a new Opinion
  router.post("/opinion", controllerOpinion.createOpinion);

  // Find all opinions
  router.get("/opinion", controllerOpinion.getAllComments);

  // Retrieve all opinion per player_id
  router.get("/opinion/player/:id", controllerOpinion.getAllCommentsOfPlayer);

  //-------------------CONSULTATION-----------------------
  // The set of reviewed games available in a given theme, classified by category
  router.get(
    "/reviewedGamePerThemeByCategory/:id",
    controllerConsultation.reviewedGamePerThemeByCategory
  );

  // Per player, the list of comments which refered to games in its favorites categories.
  router.get(
    "/commentsPerPlayerFavCategory/:id",
    controllerConsultation.commentsPerPlayerFavCategory
  );

  // Per comment, the list of players who liked it.
  router.get(
    "/playerReactedPerOpinion/:id",
    controllerConsultation.playerReactedPerOpinion
  );

  //-------------------STATISTICS-----------------------
  // Get most rated comment
  router.get("/mostRatedComment", controllerStatistics.getMostRatedComment);

  // Get pourcentage représentation of each theme
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

  /*  // Players ranked by the number of comments
  router.get(
    "/playerRankedByNbComments",
    controllerStatistics.playerRankedByNbComments
  );

  // Players ranked by the number of game rated
  router.get(
    "/playerRankedByNumberGameCommented",
    controllerStatistics.playerRankedByNumberGameCommented
  );

  // List of n more recent comments
  router.get("/recentComments", controllerStatistics.allRecentComments);
  router.get("/recentComments/:id", controllerStatistics.nRecentComments);

  // Most ranked comment
  router.get("/rankedComment", controllerStatistics.rankedComment);

  // Comment by trust index
  router.get(
    "/commentsByTrustIndex",
    controllerStatistics.commentsByTrustIndex
  );

  // // Most ranked games balanced by trust
  router.get("/gameByTrust", controllerStatistics.gameByTrust);*/

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  app.use("/api/", router);
};
