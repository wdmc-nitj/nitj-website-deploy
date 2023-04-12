const express = require("express");
const instituteProspectusLinkController = require("../controllers/instituteProspectusLink");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/")
  .get(instituteProspectusLinkController.showInstituteProspectusLink);

Router.route("/get/all").get(
  instituteProspectusLinkController.showAllInstituteProspectusLink
);


//Export----------------------------->
module.exports = Router;
