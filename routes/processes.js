const express = require('express');
const processesController = require('../controllers/processes');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(processesController.addProcess).get(processesController.getProcess);

Router.route('/:id').patch(processesController.updateProcess).post(processesController.deleteProcess);

Router.route('/get/all').get(processesController.showallProcesses);

Router.route('/:category').get(processesController.getCategoryProcesses);

//Export----------------------------->
module.exports = Router;