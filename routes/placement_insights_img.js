const express = require('express');
const placementInsightImgController = require('../controllers/placement_insights_img');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(placementInsightImgController.addPlacement_Insights_img).get(placementInsightImgController.getPlacement_Insights_img);

Router.route('/:id').patch(placementInsightImgController.updatePlacement_Insights_img).post(placementInsightImgController.deletePlacement_Insights_img);

Router.route('/get/all').get(placementInsightImgController.showallPlacement_Insights_img);

//Export----------------------------->
module.exports = Router;