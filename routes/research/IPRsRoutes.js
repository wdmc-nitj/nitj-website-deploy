const express = require('express');
const IPRRouter = express.Router();
const IPRsController = require('../../controllers/research/IPRsController');


IPRRouter.route('/IPR')
    .get(IPRsController.getIPRById);

IPRRouter.route('/get')
    .get(IPRsController.getIPRs); // visible can be 'visible', 'hidden' or 'all

module.exports = IPRRouter;