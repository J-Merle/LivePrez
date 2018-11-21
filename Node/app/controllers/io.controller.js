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
    });
    socket.on('slidEvent', function(data) {
      parsedData = JSON.parse(data);
      var cmd = parsedData.CMD;
      var presId = parsedData.PRES_ID;
      if(["START", "END", "BEGIN", "PREV", "NEXT"].indexOf(cmd) > -1) {
        console.log("Envoie des meta données");
      }
    });
  });
}
