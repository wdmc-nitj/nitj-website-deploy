const express = require('express');
const noticeController = require('../controllers/notice');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(noticeController.getNotice);

Router.route('/get/all').get(noticeController.showallNotice);




//Export----------------------------->
module.exports = Router;
