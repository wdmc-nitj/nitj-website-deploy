const express= require('express');
const login = require('../controllers/authenticate');

const Router=express.Router();

Router.post('/login',login);

module.exports= Router;