// router for /admissions/helplines
const helplineRouter = require('express').Router();

const helplineController = require('../../controllers/admissions/helplineController');


helplineRouter.route('/create').post(helplineController.createHelpline);

helplineRouter.route('/helpline')
    .get(helplineController.getHelplineById)
    .patch(helplineController.editHelpline)
    .put(helplineController.toggleHelplineVisiblity)
    .delete(helplineController.deleteHelpline);

helplineRouter.route('/get').get(helplineController.getHelplines); // visible can be 'visible', 'hidden' or 'all'

module.exports = helplineRouter;
