const express = require("express");
const intiativeController = require("../controllers/initiatives");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(intiativeController.getInitiative);

Router.route("/get/all").get(intiativeController.getAllInitiative);

Router.route("/getInitiativeByType").get(intiativeController.getInitiativebyType);

//Export----------------------------->
module.exports = Router;
