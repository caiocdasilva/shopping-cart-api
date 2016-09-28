let redis = require('redis');
let redisClient = require('../bin/redisConnection');
let ShoppingCart = require('../models/shopping-cart');

let ShoppingCartService = function(){};

ShoppingCartService.prototype.getShoppingCart = function(cartId){
  let shoppingCart;
  redisClient.get(cartId, function(err, result){
    if(result){
      console.log('getShoppingCart from cartId')
      shoppingCart = result;
    }
    else {
      console.log('new shopping cart');
      shoppingCart = new ShoppingCart();
      redisClient.set(cartId, JSON.stringify(shoppingCart));
    }
  });
  return shoppingCart;
};

module.exports = new ShoppingCartService();
