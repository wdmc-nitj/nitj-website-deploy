const express = require('express');
const examination = require('../controllers/examinationSchedule');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(examination.getAllexamination);

Router.route('/get/all').get(examination.getAllexamination);

Router.route('/getexamination/:shortterm').get(examination.getByDeptexamination);

//Export----------------------------->
module.exports = Router;