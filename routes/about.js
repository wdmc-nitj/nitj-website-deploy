const express = require('express');
const about = require('../controllers/about');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').get(about.getAbout);


//Export----------------------------->
module.exports = Router;