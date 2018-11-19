"use strict";

let CONFIG = JSON.parse(process.env.CONFIG);
const fs = require('fs');



function ContentModel(content){
    this.type = content.type;
    this.id = content.id;
    this.title = content.title;
    this.src = content.src;
    this.fileName = content.fileName;
}

ContentModel.create =  function(content, callback) {
    let path= '';
    if(this.type === 'img') {
        path = `${CONFIG.contentDirectory}/${content.fileName}`;
    } else {
        path = `${CONFIG.contentDirectory}/${content.id}.mesa.json`;
    }

    fs.writeFile(path, JSON.parse(content), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

 ContentModel.read = function(id, callback) {
    var path = `${CONFIG.contentDirectory}/${id}.mesa.json`;
    fs.readFile(path, function(err, data){
        if(err) {
            return console.log(err);
        }
        return data;
    });
}

 ContentModel.update = function(content, callback) {}

 ContentModel.delete = function(id, callback) {

    var path = `${CONFIG.contentDirectory}/${id}.mesa.json`;
    fs.readFile(path, function(err){
        if(err) {
            return console.log(err);
        }
    });

    path = `${CONFIG.contentDirectory}/${this.fileName}`;
    fs.readFile(path, function(err){
        if(err) {
            return console.log(err);
        }
    });
}

module.exports = ContentModel;
