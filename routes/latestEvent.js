const express = require('express');
const latestEventController = require('./../controllers/latestEvent');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(latestEventController.getLatestEvent);

Router.route('/get/all').get(latestEventController.getAllLatestEvent);


//Export----------------------------->
module.exports = Router;