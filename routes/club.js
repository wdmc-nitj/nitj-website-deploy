const express = require("express");
const club = require("../controllers/club");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").post(club.addClub).get(club.getClub);

Router.route("/:id").patch(club.updateClub).post(club.deleteClub);

Router.route("/get/all").get(club.getAllClub);

//Export----------------------------->
module.exports = Router;
