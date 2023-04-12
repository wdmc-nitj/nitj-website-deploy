const express = require('express');
const sponsoredProjectsRouter = express.Router();
const sponsoredProjectsController = require('../../controllers/research/sponsoredProjectsController');

sponsoredProjectsRouter.route('/create')
    .post(sponsoredProjectsController.createSponsoredProject);

sponsoredProjectsRouter.route('/get')
    .get(sponsoredProjectsController.getAllSponsoredProjects);

sponsoredProjectsRouter.route('/year')
    .get(sponsoredProjectsController.getVisibleSponsoredProjectsInYear);

sponsoredProjectsRouter.route('/groupedByYear')
    .get(sponsoredProjectsController.getVisibleSponsoredProjectsGroupedByYear);

sponsoredProjectsRouter.route('/project')
    .get(sponsoredProjectsController.getSponsoredProjectByID)
    .patch(sponsoredProjectsController.updateSponsoredProjectByID)
    .put(sponsoredProjectsController.hideSponsoredProjectByID)
    .delete(sponsoredProjectsController.deleteSponsoredProjectByID);

module.exports = sponsoredProjectsRouter;