'use strict';

const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const CONFIG = require("./config.json");
const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();

process.env.CONFIG = JSON.stringify(CONFIG);

const defaultRoute = require("./app/routes/default.route.js");
const presentationRoute= require("./app/routes/presentation.route.js");
const contentRoute= require("./app/routes/content.route.js");

// Route definition
app.use(defaultRoute);
app.use(presentationRoute);
app.use(contentRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

// init server
const server = http.createServer(app);
server.listen(CONFIG.port);

console.log(`Server running on port ${CONFIG.port}`);
