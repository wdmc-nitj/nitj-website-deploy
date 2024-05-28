const express = require('express');
const recruitmentUpdateRouter = express.Router();
const recruitmentUpdateController = require('../../controllers/recruitmentUpdatesController');

recruitmentUpdateRouter.route('/create')
    .post(recruitmentUpdateController.createRecruitmentUpdate);

recruitmentUpdateRouter.route('/get')
    .get(recruitmentUpdateController.getAllRecruitmentUpdates);

recruitmentUpdateRouter.route('/categorised')
    .get(recruitmentUpdateController.getVisibleRecruitmentUpdatesByCategory);

recruitmentUpdateRouter.route('/update')
    .get(recruitmentUpdateController.getRecruitmentUpdateByID)
    .patch(recruitmentUpdateController.editRecruitmentUpdateByID)
    .put(recruitmentUpdateController.hideRecruitmentUpdateByID)
    .delete(recruitmentUpdateController.deleteRecruitmentUpdateByID);

recruitmentUpdateRouter.route('/defaultTab')
    .get(recruitmentUpdateController.getDefaultTabName);

module.exports = recruitmentUpdateRouter;
