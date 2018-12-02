'use strict';
var express = require("express");
var router = express.Router();
var fs = require('fs');
module.exports = router;
let CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const utils = require('../utils/utils.js');



router.route("/loadPres").get(function(request, response){
  let mapPres = {};

  fs.readdir(CONFIG.presentationDirectory, (err, files) => {

    if(err) {
      console.log(err.message);
      response.writeHead(500, {"Content-Type" : "application/json"});
      response.end();
      utils.logRequest(request, response);
      return;
    }

    files = files.filter(function(file){return path.extname(file) === ".json"});

    if( files.length === 0) {
      response.writeHead(200, {"Content-Type" : "application/json"});
      response.end(JSON.stringify(mapPres));
      utils.logRequest(request, response);
      return;
    }

    files.forEach(function(fileName,index){
      fs.readFile(CONFIG.presentationDirectory + fileName, function(errFile, content){
        if(err) {
          console.log(errFile.message);
          response.writeHead(500, {"Content-Type" : "application/json"});
          response.end();
          utils.logRequest(request, response);
          return;
        }
        let pres = JSON.parse(content);
        mapPres[pres.id] = pres;
        if(index == (files.length-1)){
          response.writeHead(200, {"Content-Type" : "application/json"});
          response.end(JSON.stringify(mapPres));
          utils.logRequest(request, response);
          return;
        }
      });
    });
  })
});

router.route("/savePres").post(function(request, response){
  let presentation = request.body;

  // A presentation without id can not be saved
  if(!pres.id) {
    response.writeHead(422);
    response.end("Unprocessable entity");
    return -1;
  }

  fs.writeFile(path.join(CONFIG.presentationDirectory))


});
