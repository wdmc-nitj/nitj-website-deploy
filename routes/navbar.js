const express = require("express");
const navbarController = require("../controllers/navbar");
const bodyParser=require('body-parser');
//----------------------------------->

//Router
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended:false}));

Router.route("/").post(navbarController.create).get(navbarController.show);

Router.route("/update").post(navbarController.update);
Router.route('/edit').post(navbarController.edit);
Router.route("/sort").post(navbarController.sort);
Router.route("/delete").post(navbarController.delete);

//Export----------------------------->
module.exports = Router;
