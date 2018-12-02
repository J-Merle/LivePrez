'use strict';
var express = require("express");
var router = express.Router();
var fs = require('fs');
module.exports = router;
let CONFIG = JSON.parse(process.env.CONFIG);
const path = require('path');
const utils = require('../utils/utils.js');
const http = require('http');

router.post("/login", function(request, response){
  console.log(request.body);
  let payload = {login: request.body.login, pwd: request.body.pwd };

  console.log(payload);

  const options = {
    host: 'localhost',
    port: '8080',
    path: '/FrontAuthWatcherWebService/rest/login',
    method: 'POST',
    json: JSON.parse(payload)
  };

  const req = http.request(options);
  req.end();


  req.on('response', (res)=> {
    const auth = {login: res.body.login, validAuth: res.body.validAuth, role: res.body.role}
  })
});
