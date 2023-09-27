const express = require('express');
const usersController = require('../controllers/users');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/signin').post(usersController.getUser);

Router.route('/signup').post(usersController.addUser);

Router.route('/:id').patch(usersController.updateUser).post(usersController.deleteUser);

Router.route('/get/all').get(usersController.showallUsers);

//Export----------------------------->
module.exports = Router;