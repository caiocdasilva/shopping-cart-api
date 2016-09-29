let express = require('express');
let router = express.Router();
let ShoppingCartService = require('../services/shopping-cart');
let ShoppingCart = require('../models/shopping-cart');

const STATUS_OK = '200';
const STATUS_INTERNAL_ERROR = '500';

/* GET session's shopping cart */
router.get('/', function(req, res, next){
  let cartId = req.cookies.cartId;
  let shoppingCart;
  res.header('Content-Type', 'application/json');
  res.status(STATUS_OK);
  ShoppingCartService.getShoppingCart(cartId).then(function(resp){
    if(resp == null){
      shoppingCart = new ShoppingCart();
      ShoppingCartService.updateShoppingCart(cartId, shoppingCart);
    } else{
      shoppingCart = resp;
    }
    res.send(shoppingCart);
  }).catch(function(err){
    console.error(err);
    res.status(STATUS_INTERNAL_ERROR);
    res.send('Error getting your cart. We\'re sorry');
  });
});

/* POST item, i.e., add item to the session's shopping cart */
router.post('/items/:id', function(req, res, next) {
  let itemId = req.params.id;
  let cartId = req.cookies.cartId;
  res.status(STATUS_OK);
  ShoppingCartService.addItem(cartId, itemId).then(function(resp){
    res.send();
  }).catch(function(err){
    console.error(err);
    res.status(STATUS_INTERNAL_ERROR);
    res.send();
  })
});

/* DELETE item, i.e., remove item from the session's shopping cart */
router.delete('/items/:id', function(req, res, next) {
  let itemId = req.params.id;
  ShoppingCartService.remove(itemId);
  res.status(STATUS_OK);
  res.send();
})

module.exports = router;
