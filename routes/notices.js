const express = require('express');
const noticesController = require('../controllers/notices');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(noticesController.addNotice).get(noticesController.getNotice);

Router.route('/:id').patch(noticesController.updateNotice).post(noticesController.deleteNotice);

Router.route('/get/all').get(noticesController.showallNotices);


//Export----------------------------->
module.exports = Router;