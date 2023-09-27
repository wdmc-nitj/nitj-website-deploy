const express = require('express');
const policiesController = require('../controllers/policies');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(policiesController.addPolicy).get(policiesController.getPolicy);

Router.route('/:id').patch(policiesController.updatePolicy).post(policiesController.deletePolicy);

Router.route('/get/all').get(policiesController.showallPolicies);

Router.route('/:category').get(policiesController.getCategoryPolicies);


//Export----------------------------->
module.exports = Router;