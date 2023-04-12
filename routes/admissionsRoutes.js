// router for /admissions
const admissionsRouter = require('express').Router();

const admissionHelplineRouter = require('./admissions/helplinesRoutes');
const admissionsLinkRouter = require('./admissions/linksRoutes');
const admissionsUpdateRouter = require('./admissions/updatesRoutes');

admissionsRouter.use('/helplines', admissionHelplineRouter);
admissionsRouter.use('/links', admissionsLinkRouter);
admissionsRouter.use('/updates', admissionsUpdateRouter);

module.exports = admissionsRouter;