const express = require('express');
const nitjMessagesController = require('../controllers/nitj_messages');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(nitjMessagesController.addNitjMessage).get(nitjMessagesController.getNitjMessage);

Router.route('/:id').patch(nitjMessagesController.updateNitjMessage).post(nitjMessagesController.deleteNitjMessage);

Router.route('/get/all').get(nitjMessagesController.showallNitjMessage);

Router.route('/:category').get(nitjMessagesController.getCategoryNitjMessage);


//Export----------------------------->
module.exports = Router;