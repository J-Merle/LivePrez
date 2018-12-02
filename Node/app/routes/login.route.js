'use strict';
var express = require("express");
var router = express.Router();
var fs = require('fs');
let CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const utils = require('../utils/utils.js');
const http = require('http');

router.route("/login").post( function(request, response){
  let payload = {login: request.body.login, pwd: request.body.pwd };

  if(CONFIG.dev) {
    response.end(JSON.stringify({login: 'Admin', validAuth: true, role: "ADMIN"}));
    return;
  }

  const options = {
    host: 'localhost',
    port: '8080',
    path: '/FrontAuthWatcherWebService/rest/login',
    method: 'POST',
    json: JSON.stringify(payload)
  };

  const req = http.request(options);
  req.end();


  req.on('response', (res)=> {
    console.log(res);
    const auth = {login: res.body.login, validAuth: res.body.validAuth, role: res.body.role}
  })
});

module.exports = router;
