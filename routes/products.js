let express = require('express');
let router = express.Router();
let shoppingCartService = require('../services/shopping-cart');
let Product = require('../models/product.js')
let ProductService = require('../services/product.js')




/* GET all products */
router.get('/', function(req, res, next) {
  let cartId = req.cookies.cartId;
  shoppingCartService.getShoppingCart(cartId);
  res.header("Content-Type", "application/json");
  ProductService.getAllProducts().then(function(products){
    res.send(JSON.stringify(products));
  }).catch(function(err){
    res.send('Error trying to get products. We\'re sorry.');
  });
});

module.exports = router;
