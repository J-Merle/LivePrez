"use strict";

var fs = require("fs");
var path = require("path");
let CONFIG = JSON.parse(process.env.CONFIG);

exports.list = function(request, response) {
  var contents = {};

  fs.readdir(CONFIG.contentDirectory, (err, files) => { 
    files.forEach(function(fileName,index){ 
      
      if (path.extname(fileName) === ".json") { 
        fs.readFile(CONFIG.presentationDirectory + fileName, function(errFile, data){ 
          if(errFile){ 
            console.log(errFile.message); 
          } 
          let content= JSON.parse(data); 
          contents[content.id] = content; 
          if(index == (files.length-1)){ 
            response.writeHead(200, {"Content-Type" : "application/json"}); 
            response.end(JSON.stringify(contents)); 
          } 
        }); 
      } 
    }) 
  }); 
}


exports.create = function(request, response) {}
exports.read= function(request, response) {}
exports.update= function(request, response) {}
exports.delete= function(request, response) {}
