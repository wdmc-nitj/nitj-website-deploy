const express = require("express");
const club = require("../controllers/club");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").post(club.addClub).get(club.getClub);

// Router.route("/:id").patch(club.updateClub).post(club.deleteClub);
Router.route("/:name").get(club.getClubbyName).patch(club.updateClub).delete(club.deleteClub);

Router.route("/get/all").get(club.getAllClub);
// Router.route("/clubslist/get/all").get(club.getAllClubsNav);


//Export----------------------------->
module.exports = Router;
