const express = require("express");
const searchController = require("../controllers/search");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").post(searchController.globalSearch);

//Export----------------------------->
module.exports = Router;
