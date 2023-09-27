const express = require('express');
const dowloadController = require('../controllers/download');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(dowloadController.addDownload).get(dowloadController.getDownload);

Router.route('/:id').patch(dowloadController.updateDownload).post(dowloadController.deleteDownload);

Router.route('/get/all').get(dowloadController.showallDownload);

Router.route('/:category').get(dowloadController.getCategoryDownload);

//Export----------------------------->
module.exports = Router;