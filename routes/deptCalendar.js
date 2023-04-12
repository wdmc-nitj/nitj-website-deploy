const express = require('express');
const DeptCalendar = require('../controllers/deptCalendar');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/get/all').get(DeptCalendar.getAllDeptCalendar);


//Export----------------------------->
module.exports = Router;