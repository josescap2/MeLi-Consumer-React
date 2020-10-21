const server = require("express").Router();

server.get('/', (req, res) => {
  res.send({
    message: "Hello world"
  });
});

module.exports = server;