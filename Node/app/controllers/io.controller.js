"use strict";

const io = require("socket.io");

exports.listen = function(httpServer) {
  var ioServer = io(httpServer);
  var mapSocket = {};

  ioServer.on('connection', function(socket) {
    console.log("New connection");
    socket.emit('connection');
    socket.on('_data_com_', function(data) {
      mapSocket[data] = socket;
      console.log('data_com');
    });
    socket.on('slidEvent', function(data) {
      console.log("Got slidEvent");
      console.log("Envoie des meta données");
      var content = {
        "type": "typelol",
        "id": "034656e0-f6d0-4d64-a2fc-ef20fa8e50e0",
        "title": "mytitle",
        "src": "http://www.donttouchthespikes.com/p/2017/07/top-27-best-free-node-js-tutorials-to-improve-your-coding-skills-for-best-node-js-tutorial.png"
      };

      socket.emit('currentSlidEvent',content);
    });
  });
}
