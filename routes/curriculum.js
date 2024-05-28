const express = require('express');
const curriculum = require('../controllers/curriculum');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(curriculum.getAllCurriculum);

Router.route('/get/all').get(curriculum.getAllCurriculum);

Router.route('/getcurriculum/:shortterm').get(curriculum.getByDeptCurriculum);

//Export----------------------------->
module.exports = Router;