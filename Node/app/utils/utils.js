'use strict';

var fs = require("fs");
var path = require("path");
var CONFIG = JSON.parse(process.env.CONFIG);

module.exports = this;

this.generateUUID = function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};

this.fileExists = function(path, callback) {
	fs.stat(path, function(err, stat) {
		if (err) {
			callback(err);
		} else {
			if (stat.isFile()) {
				callback(null);
			}
		}
	});
};

this.readFileIfExists = function(path, callback) {
	this.fileExists(path, function(err) {
		if (err) {
			callback(err);
		} else {
			fs.readFile(path, callback);
		}
	});
};

this.getMetaFilePath = function(id) {
	return path.join(CONFIG.contentDirectory, id + ".meta.json");
};

this.getDataFilePath = function(fileName) {
	return path.join(CONFIG.contentDirectory, fileName);
};

this.getNewFileName = function(id, originalFileName) {
	return id + '.' + originalFileName.split('.').pop();
};

this.logRequest = function(request, response) {
  var color =[200, 201, 302].indexOf(response.statusCode) != -1 ? "\x1b[32m" : "\x1b[31m";
  var endColor = "\x1b[0m";
  console.log(`${color}${response.statusCode} ${endColor} - ${request.method} ${request.path}`);
  if(request.body !== undefined) {
    console.log(`\trequest.body : ${JSON.stringify(request.body)}`);
  }
}
