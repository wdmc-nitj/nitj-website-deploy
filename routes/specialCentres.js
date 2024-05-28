const express = require('express');
const specialCentres = require('../controllers/specialCentres');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(specialCentres.getAllSpecialCentres);

Router.route('/get/all').get(specialCentres.getAllSpecialCentres);

Router.route('/getcentre/:shortterm').get(specialCentres.getByDeptSpecialCentres);




//Export----------------------------->
module.exports = Router;