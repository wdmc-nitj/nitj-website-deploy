const express = require("express");
const photoGalleryController = require("../controllers/photoGallery");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(photoGalleryController.get);


//Export----------------------------->
module.exports = Router;
