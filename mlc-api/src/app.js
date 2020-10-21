const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

const server = express();

server.name = 'API';
server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use('/', routes);

module.exports = server;