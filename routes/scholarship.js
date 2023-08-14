const express = require("express");
const scholarshipController = require("../controllers/scholarship");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(scholarshipController.getAllScholarship);

Router.route("/:id").get(scholarshipController.getByIdScholarship)

Router.route("/get/all").get(scholarshipController.getAllScholarship);

//Export----------------------------->
module.exports = Router;
