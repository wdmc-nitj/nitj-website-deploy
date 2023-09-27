const express = require('express');
const peopleController = require('../controllers/people');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(peopleController.addPerson).get(peopleController.getPerson);

Router.route('/:id').patch(peopleController.updatePerson).post(peopleController.deletePerson);

Router.route('/get/all').get(peopleController.showallPeople);

Router.route('/:category').get(peopleController.getCategoryPeople);


//Export----------------------------->
module.exports = Router;