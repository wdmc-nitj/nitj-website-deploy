const express = require("express");
const router = express.Router();

const recentEventsController  =  require("../../controllers/alumni/recentEventsController");
const noticesController = require("../../controllers/alumni/noticesController");
const  alumnusController = require("../../controllers/alumni/alumnusController")
const  notableAlumnusController = require("../../controllers/alumni/notableAlumnusController")
const ImageRollController = require("../../controllers/alumni/ImageRollController")
const donarAwardsController = require("../../controllers/alumni/donarAwardsController")
const donarsController = require("../../controllers/alumni/donarsController")


router.get("/recentEvents/get/new", recentEventsController.getNew);
router.get("/recentEvents/get/all", recentEventsController.getAll)
router.get("/notices/get/new", noticesController.getNew);
router.get("/notices/get/all", noticesController.getAll);
router.get("/alumnus", alumnusController.get);
router.get("/notableAlumnus", notableAlumnusController.get);
router.get("/imageRoll", ImageRollController.get);
router.get("/donarAwards", donarAwardsController.get);
router.get("/donars", donarsController.get );


module.exports  = router;