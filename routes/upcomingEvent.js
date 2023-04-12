const express = require('express');
const upcomingEvent = require('../controllers/upcomingEvent');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(upcomingEvent.getUpcomingEvent);

Router.route('/get/all').get(upcomingEvent.getAllUpcomingEvent);





//Export----------------------------->
module.exports = Router;