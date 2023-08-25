const express = require("express");
const latestNewsController = require("../controllers/news");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(latestNewsController.getNews);

Router.route("/pin/:id/:pin").put(latestNewsController.pinNews);

Router.route("/get/all").get(latestNewsController.getAllNews);

Router.route("/getNewsByType").get(latestNewsController.getNewsbyType);

//Export----------------------------->
module.exports = Router;
