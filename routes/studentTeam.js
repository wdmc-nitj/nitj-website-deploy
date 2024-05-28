const express = require("express");
const studentTeamController = require("../controllers/studentTeam");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(studentTeamController.getStudentTeam);

Router.route("/:id").get(studentTeamController.getStudentTeambyId)

Router.route("/get/all").get(studentTeamController.getAllStudentTeam);

//Export----------------------------->
module.exports = Router;
