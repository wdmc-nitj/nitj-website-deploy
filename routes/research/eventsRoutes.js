const express = require('express');
const eventController = require('../../controllers/research/eventController');
const eventRouter = express.Router();

eventRouter.route('/get')
    .get(eventController.getAllevents);

eventRouter.route('/create')
    .post(eventController.createevent);

eventRouter.route('/event')
    .get(eventController.geteventByID)
    .patch(eventController.updateeventByID)
    .put(eventController.hideeventByID)
    .delete(eventController.deleteeventByID);

module.exports = eventRouter;