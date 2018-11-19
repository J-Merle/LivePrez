'use strict';
var express = require("express");
var router = express.Router();
var fs = require('fs');
module.exports = router;
let CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');



router.route("/loadPres").get(function(request, response){
  let mapPres = {};

  fs.readdir(CONFIG.presentationDirectory, (err, files) => {
    files.forEach(function(fileName,index){
      if (path.extname(fileName) === ".json") {
        fs.readFile(CONFIG.presentationDirectory + fileName, function(errFile, content){
          if(errFile){
            console.log(errFile.message);
          }
          let pres = JSON.parse(content);
          mapPres[pres.id] = pres;
          if(index == (files.length-1)){
            response.writeHead(200, {"Content-Type" : "application/json"});
            response.end(JSON.stringify(mapPres));
          }
        });
      }
    })
  });
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
