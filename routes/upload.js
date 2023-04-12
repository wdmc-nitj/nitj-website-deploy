const express = require("express");
const UploadController = require("../controllers/upload");
const { singleFileMiddleware } = require("../utils/uploadMulter");

const Router = express.Router();

Router.route("/").post(singleFileMiddleware, UploadController.upload);

module.exports = Router;
