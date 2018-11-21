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
    if(err) {
      response.writeHead(500, {"Content-Type" : "application/json"}); 
      response.end();
    } else {
      files = files.filter(function(fileName) {return path.extname(fileName) === ".json"});
      if (files.length === 0) {
        response.writeHead(200, {"Content-Type" : "application/json"}); 
        response.end(JSON.stringify(contents)); 
        utils.logRequest(request, response);
        return;
      }
      files.forEach(function(fileName,index){ 
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
      }) 
    }
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
    contentData.data = JSON.stringify(request.file);
    contentData.fileName = request.file.filename;
  } else {
    contentData.src = request.body.src
  }

  var content = new ContentModel(contentData);
  content.setData(contentData.data);
  ContentModel.create(content, (err) => {
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
exports.read= function(request, response) {

  const contentId = request.params.contentId;
  ContentModel.read(contentId, (err, content) => {
    if(err) {
      response.writeHead(404, {"Content-Type" : "application/json"});
      response.end(JSON.stringify("Content not found"));
      utils.logRequest(request, response);
      return;
    }
    if(request.query.json === 'true') {
      response.writeHead(200, {"Content-Type" : "application/json"});
      response.end(JSON.stringify(content));
      utils.logRequest(request, response);
      return;
    }
    if(content.type === "img") {
      response.sendFile(utils.getDataFilePath(content.fileName));
      utils.logRequest(request, response);
      return;
    } else {
      response.writeHead(302, {
        'Location': content.src
      });
      response.end();
      utils.logRequest(request, response);
      return;
    }


  });
    

}
exports.update= function(request, response) {}
exports.delete= function(request, response) {}
