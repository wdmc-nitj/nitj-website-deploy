const express = require('express');
const recruitmentsRouter = express.Router();

const recruitmentUpdatesRouter = require('./recruitments/updatesRoutes');
recruitmentsRouter.use('/updates', recruitmentUpdatesRouter);

module.exports = recruitmentsRouter;