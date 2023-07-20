// router for /admissions
const admissionsRouter = require('express').Router();

const admissionHelplineRouter = require('./admissions/helplinesRoutes');
const admissionsLinkRouter = require('./admissions/linksRoutes');
const admissionsUpdateRouter = require('./admissions/updatesRoutes');
const majorProgramRouter = require("./admissions/majorProgramRoutes.js");
const minorProgramRouter = require("./admissions/minorProgramRoutes.js");

admissionsRouter.use('/helplines', admissionHelplineRouter);
admissionsRouter.use('/links', admissionsLinkRouter);
admissionsRouter.use('/updates', admissionsUpdateRouter);
admissionsRouter.use("/majorProgramme", majorProgramRouter);
admissionsRouter.use("/minorProgramme", minorProgramRouter);

module.exports = admissionsRouter;