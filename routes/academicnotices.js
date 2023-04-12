const express = require('express');
const academicnotices = require('../controllers/academicnotices');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(academicnotices.getAllAcademicNotices);

Router.route('/get/all').get(academicnotices.getAllAcademicNotices);


//Export----------------------------->
module.exports = Router;