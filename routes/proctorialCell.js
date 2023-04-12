const express = require("express");
const proctorialCellController = require("../controllers/proctorialCell");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(proctorialCellController.getProctorialCell);

Router.route("/:id").get(proctorialCellController.getProctorialCellbyId);

Router.route("/get/all").get(proctorialCellController.getAllProctorialCell);

//Export----------------------------->
module.exports = Router;
