const express = require("express");
const currentachievements = require("../controllers/currentAchievements");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(currentAchievements.showcurrentAchievements);

Router.route("/get/all").get(currentAchievements.showAllcurrentAchievements);

//Export----------------------------->
module.exports = Router;
