const express = require("express");
const timelineController = require("../controllers/timeline");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(timelineController.showTimeline);

Router.route("/get/all").get(timelineController.showAllTimeline);

Router.route("/:id")
    .get(timelineController.showTimelinebyId)


//Export----------------------------->
module.exports = Router;
