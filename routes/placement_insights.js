const express = require('express');
const placement_insightsController = require('../controllers/placement_insights');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(placement_insightsController.addPlacement_Insight).get(placement_insightsController.getPlacement_Insight);

Router.route('/:id').patch(placement_insightsController.updatePlacement_Insight).post(placement_insightsController.deletePlacement_Insight);

Router.route('/get/all').get(placement_insightsController.showallPlacement_Insights);

//Export----------------------------->
module.exports = Router;