const express = require('express');
const RefereedResearchRouter = express.Router();
const refereedResearchController = require('../../controllers/research/refereedResearchController');

// routes for /research/publications/refreedResearch
RefereedResearchRouter.route('/create')
    .post(refereedResearchController.createRefereedResearch);

RefereedResearchRouter.route('/research')
    .get(refereedResearchController.getRefereedResearchById)
    .patch(refereedResearchController.editRefereedResearch)
    .put(refereedResearchController.hideRefereedResearch)
    .delete(refereedResearchController.deleteRefereedResearch);

RefereedResearchRouter.route('/get')
    .get(refereedResearchController.getAllRefereedResearches);

module.exports = RefereedResearchRouter;
