const express = require("express");
const publicationController = require("../controllers/publication");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/")
    .get(publicationController.showPublication);

Router.route("/get/all").get(publicationController.showAllPublication);

Router.route("/:id")
    .get(publicationController.showPublicationbyId);

//Export----------------------------->
module.exports = Router;
