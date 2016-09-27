let express = require('express');
let router = express.Router();
let ShoppingCartService = require('../services/shopping-cart');

router.get('/', function(req, res, next){
  let cartId = req.cookies.cartId;
  shoppingCart = ShoppingCartService.getShoppingCart(cartId);
  res.send(shoppingCart);
});

router.post('/items', function(req, res, next) {
  let item = JSON.parse(req);
  res.status('200');
});

module.exports = router;
