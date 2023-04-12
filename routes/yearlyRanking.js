const express = require("express");
const YearlyRankingController = require("../controllers/yearlyRanking");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/")
  .get(YearlyRankingController.showYearlyRanking);

Router.route("/get/all").get(YearlyRankingController.showAllYearlyRanking);


//Export----------------------------->
module.exports = Router;
