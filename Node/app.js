'use strict';

const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const CONFIG = require("./config.json");
const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();
//
app.use(bodyParser.json())
process.env.CONFIG = JSON.stringify(CONFIG);

const defaultRoute = require("./app/routes/default.route.js");
const presentationRoute= require("./app/routes/presentation.route.js");
const contentRoute= require("./app/routes/content.route.js");
const loginRoute= require("./app/routes/login.route.js");

var IOController = require("./app/controllers/io.controller.js");

// Route definition
app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);
app.use(loginRoute);

// Client route
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

// init server
const server = http.createServer(app);
server.listen(CONFIG.port);
console.log(`Server running on port ${CONFIG.port}`);

IOController.listen(server);
