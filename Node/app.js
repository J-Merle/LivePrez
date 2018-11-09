'use strict';

const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const CONFIG = require("./config.json");

process.env.CONFIG = JSON.stringify(CONFIG);

const defaultRoute = require("./app/routes/default.route.js");

app.use(defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

// init server
const server = http.createServer(app);
server.listen(CONFIG.port);

console.log(`Server running on port ${CONFIG.port}`);
