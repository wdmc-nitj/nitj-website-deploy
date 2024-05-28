// router for /admissions/updates
const updatesRouter = require('express').Router();

const updatesController = require('../../controllers/admissions/updatesController');


updatesRouter.route('/create').post(updatesController.createUpdate);

updatesRouter.route('/update')
    .get(updatesController.getUpdateById)
    .patch(updatesController.editUpdate)
    .put(updatesController.toggleUpdateVisibility)
    .delete(updatesController.deleteUpdate);

updatesRouter.route('/get').get(updatesController.getUpdates); // visible can be 'visible', 'hidden' or 'all'

module.exports = updatesRouter;
