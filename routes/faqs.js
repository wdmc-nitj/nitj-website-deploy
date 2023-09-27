const express = require('express');
const faqsController = require('../controllers/faqs');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(faqsController.addFAQ).get(faqsController.getFAQ);

Router.route('/:id').patch(faqsController.updateFAQ).post(faqsController.deleteFAQ);

Router.route('/get/all').get(faqsController.showallFAQs);

Router.route('/:related').get(faqsController.getRelatedFAQs);


//Export----------------------------->
module.exports = Router;