'use strict';

var express = require("express");
var multer = require("multer");
var contentController = require("./../controllers/content.controller");
var router = express.Router();
var multerMiddleware = multer({"dest": "/tmp/"});

router.route("/contents")
  .get(contentController.list)
router.post("/contents", multerMiddleware.single("file"), contentController.create);

router.route("/contents/:contentId")
  .get(contentController.read)  
  .put(contentController.update)
  .delete(contentController.delete);

module.exports = router;
