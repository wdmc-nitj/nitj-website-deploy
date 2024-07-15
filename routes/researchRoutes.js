const express = require('express');
const researchRouter = express.Router();

const citedResearchesRouter = require('./research/citedResearchesRoutes');
const refereedResearchesRouter = require('./research/refreedResearchesRoutes');
const consultanciesRouter = require('./research/consultanciesRoutes');
const eventsRouter = require('./research/eventsRoutes');
const sponsoredProjectsRouter = require('./research/sponsoredProjectsRoutes');
const MOUsRoutes = require('./research/MOUsRoutes');
const IPRRouter = require('./research/IPRsRoutes');

researchRouter.use('/publications/citedResearches', citedResearchesRouter);

researchRouter.use('/publications/refereedResearches', refereedResearchesRouter);

researchRouter.use('/MOUs', MOUsRoutes);

researchRouter.use('/consultancies', consultanciesRouter);

researchRouter.use('/events', eventsRouter);

researchRouter.use('/sponsoredProjects', sponsoredProjectsRouter);

researchRouter.use('/IPRs', IPRRouter);

module.exports = researchRouter;