'use strict';
var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/")
  .get(function(request, response){
      response.end("it works!");
  })
  .post(function(request, response){})
  .put(function(request, response){})
  .delete(function(request, response){})
  .all(function(request, response){});
