const express = require("express");
const footer = require("../controllers/footer");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(footer.getFooter);

Router.route("/get/all").get(footer.getFooterAll);



//Export----------------------------->
module.exports = Router;
