const express = require("express");
const researchHighlights = require("../controllers/researchHighlights");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(researchHighlights.showResearchHighlights);

Router.route("/get/all").get(researchHighlights.showAllResearchHighlight);

//Export----------------------------->
module.exports = Router;
