const server = require("express").Router();
const fetch = require("node-fetch");

server.get('/search', (req, res) => {
  const { query } = req.query;

  fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + query)
    .then(results => results.json())
    .then(data => res.json(data.results))
    .catch(err => res.send(err));
});

module.exports = server;