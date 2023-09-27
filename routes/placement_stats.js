const express = require('express');
const placement_statsController = require('../controllers/placement_stats');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(placement_statsController.addPlacement_Stat).get(placement_statsController.getPlacement_Stat);

Router.route('/:id').patch(placement_statsController.updatePlacement_Stat).post(placement_statsController.deletePlacement_Stat);

Router.route('/get/all').get(placement_statsController.showallPlacement_Stats);

//Export----------------------------->
module.exports = Router;