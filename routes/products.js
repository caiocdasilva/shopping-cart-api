let express = require('express');
let router = express.Router();
let shoppingCartService = require('../services/shopping-cart');
let Product = require('../models/product.js')


/* GET products listing. */
router.get('/', function(req, res, next) {
  cartId = req.cookies.cartId;
  shoppingCartService.createCart(cartId);
  res.header("Content-Type", "application/json");
  products = [];
  res.send(JSON.stringify(products));
});

module.exports = router;
