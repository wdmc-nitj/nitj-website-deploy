const majorProgramRouter = require("express").Router();

const majorProgramController = require("../../controllers/admissions/majorProgramController.js");

majorProgramRouter.route("/:visible").get(majorProgramController.getProgrammeByCategory);

module.exports = majorProgramRouter;