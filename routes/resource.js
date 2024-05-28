const express = require("express");
const resourceController = require("../controllers/resource");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/")
  .get(resourceController.getResource);

Router.route("/get/all").get(resourceController.getResourceall);


//Export----------------------------->
module.exports = Router;
