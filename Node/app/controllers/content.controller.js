"use strict";

const  fs = require("fs");
const path = require("path");
const ContentModel = require("../models/content.model.js");
const CONFIG = JSON.parse(process.env.CONFIG);
const utils = require("../utils/utils.js")

/*
 * List all the contents in a JSON response with the id of each one as key
 *
 * Response example :
 *
 * {
 *    1 : content1,
 *    2 : content2,
 *    ...
 * }
 */
exports.list = function(request, response) {
  var contents = {};

  fs.readdir(CONFIG.contentDirectory, (err, files) => { 
    files.forEach(function(fileName,index){ 

      if (path.extname(fileName) === ".json") { 
        fs.readFile(CONFIG.contentDirectory + fileName, function(errFile, data){ 
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

  utils.logRequest(request, response);
}


exports.create = function(request, response) {
  const contentData = {
    id: utils.generateUUID(),
    type: request.body.type,
    title: request.body.title
  }
  if( contentData.type === 'img' ) {
    contentData.file = request.file;
  } else {
    contentData.src = request.body.src
  }

  ContentModel.create(new ContentModel(contentData), (err) => {
    if(err) {
      response.writeHead(422, {"Content-Type" : "application/json"});
      response.end(JSON.stringify(err));
    } else {
      response.writeHead(200, {"Content-Type" : "application/json"});
      response.end(JSON.stringify(""));
    }
  });
  utils.logRequest(request, response);


}
exports.read= function(request, response) {}
exports.update= function(request, response) {}
exports.delete= function(request, response) {}