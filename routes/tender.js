const express = require("express");
const tenderController = require("../controllers/tender");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(tenderController.showTenderbyId);

Router.route("/get/all").get(tenderController.showTender);

//Export----------------------------->
module.exports = Router;
