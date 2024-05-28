const express = require("express");
const rankingController = require("../controllers/ranking");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(rankingController.showRanking);

Router.route("/get/all").get(rankingController.showAllRanking);


//Export----------------------------->
module.exports = Router;
