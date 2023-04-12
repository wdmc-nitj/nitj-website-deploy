const express = require('express');
const citedResearchRouter = express.Router();
const citedResearchController = require('../../controllers/research/citedResearchController');

// routes for /research/publications/citedReasearch
citedResearchRouter.route('/create')
    .post(citedResearchController.createCitedResearch);

citedResearchRouter.route('/top10')
    .get(citedResearchController.getTop10CitedResearches);

citedResearchRouter.route('/get')
    .get(citedResearchController.getAllCitedResearches);

citedResearchRouter.route('/research')
    .get(citedResearchController.getCitedResearchById)
    .patch(citedResearchController.editCitedResearch)
    .put(citedResearchController.hideCitedResearch)
    .delete(citedResearchController.deleteCitedResearch);

module.exports = citedResearchRouter;
