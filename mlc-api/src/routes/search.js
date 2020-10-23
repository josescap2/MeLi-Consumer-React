const server = require("express").Router();
const fetch = require("node-fetch");

server.get('/search', (req, res) => {
  const { query } = req.query;

  fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + query)
    .then(results => results.json())
    .then(data => {
      const products = data.results.map((e) => {
        return {
          title: e.title,
          price: e.price,
          money: e.currency_id,
          image: e.thumbnail,
          stock: e.available_quantity,
          link: e.permalink,
          condition: e.condition
        }
      });
      res.status(200).json(products);
    })
    .catch(err => res.send(err));
});

module.exports = server;