const express = require('express');
const administrationController = require('../controllers/administration');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(administrationController.getAdministration);

Router.route('/get/all').get(administrationController.getAdministrationall);



//Export----------------------------->
module.exports = Router;