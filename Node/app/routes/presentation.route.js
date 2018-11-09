'use strict';
var express = require("express");
var router = express.Router();
module.exports = router;

// TODO : Routing using

router.route("/loadPres")
  .get(function(request, response){
      response.end("AHAH JAI LOAD MA PRES PTDR");
  })
  .post(function(request, response){})
  .put(function(request, response){})
  .delete(function(request, response){})
  .all(function(request, response){});

router.route("/savePres")
  .get(function(request, response){
      response.end("AHAH JAI SAVE MA PRES PTDR");
  })
  .post(function(request, response){})
  .put(function(request, response){})
  .delete(function(request, response){})
  .all(function(request, response){});
