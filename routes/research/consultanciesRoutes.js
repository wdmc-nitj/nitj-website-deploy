const express = require('express');
const ConsultancyRouter = express.Router();
const consultancyController = require('../../controllers/research/consultancyController');

ConsultancyRouter.route('/get')
    .get(consultancyController.getAllConsultancies);

ConsultancyRouter.route('/year')
    .get(consultancyController.getVisibleConsultanciesInStartYear);

ConsultancyRouter.route('/groupByYear')
    .get(consultancyController.getVisibleConsultanciesGroupedByStartYear);

ConsultancyRouter.route('/create')
    .post(consultancyController.createConsultancy);

ConsultancyRouter.route('/consultancy')
    .get(consultancyController.getConsultancyByID)
    .patch(consultancyController.updateConsultancyByID)
    .put(consultancyController.hideConsultancyByID)
    .delete(consultancyController.deleteConsultancyByID);

module.exports = ConsultancyRouter;