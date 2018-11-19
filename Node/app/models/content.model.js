"use strict";

let CONFIG = JSON.parse(process.env.CONFIG);
let utils = require('../utils/utils')
const fs = require('fs');


function ContentModel(content){
  this.type = null;
  this.id = null;
  this.title = null;
  this.src = null;
  this.fileName = null;
  this.updateContent(content);
}

ContentModel.prototype.updateContent = function(content) {
  if (content !== undefined) {
    this.type = content.type;
    this.id = content.id;
    this.title = content.title;
    this.src = content.src;
    this.fileName = content.fileName;
  }
}

ContentModel.prototype.setData = function(data) {
  this.data = data;
}

ContentModel.prototype.getData = function(data) {
  return this.data;
}

ContentModel.create =  function(content, callback) {

  if(content === null ||  content.type === undefined|| content.id === undefined|| !(content instanceof ContentModel) ) {
    callback(new Error("The content is invalid"));
    return;
  }


  if(content.type === 'img' && content.fileName !== undefined) {

    var contentPath = utils.getDataFilePath(content.fileName);

    fs.open(contentPath, 'w+', (errOpen, fd) => {
      if(errOpen) { callback(errOpen); return; }

      fs.writeFile(contentPath, content.data, function(err) {
        if(err) { callback(err); return; }

        fs.close(fd, (err) => {callback(err); return;});
      });
    });
  }

  var metaDataPath = utils.getMetaFilePath(content.id);

  fs.open( metaDataPath, 'w+', (errOpen, fd) => {
    if(errOpen) { callback(errOpen); return; }

    fs.writeFile(metaDataPath, JSON.stringify(content, null, 4), function(err) {
      if(err) {
        callback(err); 
        return;
      }
      fs.close(fd, (err) => {callback(err); return;});
    });
  });
}

ContentModel.read = function(id, callback) {

  if( id === null) {callback( new Error("Can not read a content if the id is null")); return; }

  var path = utils.getMetaFilePath(id);

  fs.readFile(path, 'utf8', (err, data) => {
    if(err) { callback(err); return;}
    var parsedData = JSON.parse(data);
    var result = new ContentModel(parsedData);
    result.setData(parsedData.data);
    callback(null, result);
  });

}

ContentModel.update = function(content, callback) {

  if(content === null ||  content.type === undefined|| content.id === undefined|| !(content instanceof ContentModel) ) {
    callback(new Error("The content is invalid"));
    return;
  }

  var metaDataPath = utils.getMetaFilePath(content.id);
  utils.fileExists(metaDataPath, (err) => {
    if(err) { callback(new Error("The file doesn't exists")); return; }

    fs.open( metaDataPath, 'w+', (errOpen, fd) => {
      if(errOpen) { callback(errOpen); return; }

      fs.writeFile(metaDataPath, JSON.stringify(content, null, 4), function(err) {
        if(err) { callback(err); return;}
        fs.close(fd, (err) => {callback(err); return;});
      });

      if(content.type === 'img' && content.data !== undefined && content.data.length > 0) {
        var dataPath = utils.getDataFilePath(content.fileName);
        fs.open(dataPath, 'w+', (errOpen, fd) => {
          if(errOpen) { callback(errOpen); return; }

          fs.writeFile(dataPath, content.data, function(err) {
            if(err) { callback(err); return; }

            fs.close(fd, (err) => {callback(err); return;});
          });
        });

      }

    });
  });

}

ContentModel.delete = function(id, callback) {
  if(id === null) {
    callback(new Error("Can not delete, the id is null"));
    return; 
  }

  var path = utils.getMetaFilePath(id);
  fs.readFile(path, 'utf8', (err, data) => {
    if(err) { callback(err); return;}
    var parsedData = JSON.parse(data);

    fs.unlink(path, function(err){
      if(err) { callback(err); return;}

      if(parsedData.fileName === undefined) {
        callback(new Error("Can not delete, the id is null"));
        return; 
      }
      var dataFilePath = utils.getDataFilePath(parsedData.fileName);
      fs.unlink(dataFilePath, function(err){
        if(err) { callback(err); return;}
        callback(null, null);
      });
    });
  });
}


module.exports = ContentModel;
