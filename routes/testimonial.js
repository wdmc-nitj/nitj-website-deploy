const express = require("express");
const testimonial = require("../controllers/testimonial");
//----------------------------------->

//Router
const Router = express.Router();

Router.route("/").get(testimonial.getTestimonial);



Router.route("/get/all").get(testimonial.getAllTestimonial);

//Export----------------------------->
module.exports = Router;
