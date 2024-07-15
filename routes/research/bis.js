// routes for /BIS

const express = require('express');
const BISRouter = express.Router();
const BISController = require('../../controllers/research/bis');


BISRouter.route('/get')
    .get(BISController.getBIS);

module.exports = BISRouter;
