// router for /admissions/links
const linksRouter = require('express').Router();

const linksController = require('../../controllers/admissions/linksController');


linksRouter.route('/create').post(linksController.createLink);

linksRouter.route('/link')
    .get(linksController.getLinkById)
    .patch(linksController.editLink)
    .put(linksController.toggleLinkVisiblity)
    .delete(linksController.deleteLink);

linksRouter.route('/get').get(linksController.getLinks); // visible can be 'visible', 'hidden' or 'all'


module.exports = linksRouter;
