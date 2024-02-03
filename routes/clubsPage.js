const express = require("express");
const clubsPage = require("../controllers/clubsPage");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").post(clubsPage.addClub).get(clubsPage.getClub);

// Router.route("/:id").patch(club.updateClub).post(club.deleteClub);
Router.route("/:name").get(clubsPage.getClubbyName).patch(clubsPage.updateClub).delete(clubsPage.deleteClub);

Router.route("/get/all").get(clubsPage.getAllClub);
// Router.route("/clubslist/get/all").get(club.getAllClubsNav);


//Export----------------------------->
module.exports = Router;