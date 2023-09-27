const express = require('express');
const internship_insightsController = require('../controllers/internship_insights');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(internship_insightsController.addInternship_Insight).get(internship_insightsController.getInternship_Insight);

Router.route('/:id').patch(internship_insightsController.updateInternship_Insight).post(internship_insightsController.deleteInternship_Insight);

Router.route('/get/all').get(internship_insightsController.showallInternship_Insights);

//Export----------------------------->
module.exports = Router;