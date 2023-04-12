const express = require("express");
const placementStatController = require("../controllers/placementStat");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/")
  .get(placementStatController.showPlacementStat);

Router.route("/get/all").get(placementStatController.showAllPlacementStat);


//Export----------------------------->
module.exports = Router;
