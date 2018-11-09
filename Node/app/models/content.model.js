"use strict";

let CONFIG = JSON.parse(process.env.CONFIG);
const fs = require('fs');

class ContentModel {

	constructor(content){
		let parsed = JSON.parse(content);
		this.type = parsed.type;
		this.id = parsed.id;
		this.title = parsed.title;
		this.src = parsed.src;
		this.fileName = parsed.fileName;
	}

	static create(content, callback) {
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

	static read(id, callback) {
		var path = `${CONFIG.contentDirectory}/${id}.mesa.json`;
		fs.readFile(path, function(err, data){
			if(err) {
				return console.log(err);
			}
			return data;
		});
	}

	static update(content, callback) {}

	static delete(id, callback) {
	
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

}
