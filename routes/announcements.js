const express = require('express');
const announcementsController = require('../controllers/announcements');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(announcementsController.addAnnouncement).get(announcementsController.getAnnouncement);

Router.route('/:id').patch(announcementsController.updateAnnouncement).post(announcementsController.deleteAnnouncement);

Router.route('/get/all').get(announcementsController.showallAnnouncements);


//Export----------------------------->
module.exports = Router;