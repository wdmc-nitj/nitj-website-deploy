const express = require("express");
const storeController = require("../controllers/store");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").post(storeController.addStore);

Router.route("/:id").get(storeController.getStorebyId);

Router.route('/get/all').get(storeController.getStore);

Router.route("/:id").put(storeController.updateStore)

//Export----------------------------->
module.exports = Router;
