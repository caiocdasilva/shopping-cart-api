let redisClient = require('../bin/redisConnection');
let ShoppingCart = require('../models/shopping-cart');

let ShoppingCartService = function(){
  cartAlreadyExist = function(cartId){
    cart = redisClient.get(cartId);
    return typeof(cart) !== 'undefined' && cart != null;
  }
};

ShoppingCartService.prototype.createCart = function (cartId){
  let cartExists = cartAlreadyExist(cartId);
  console.log('CartExist', cartExists);
  if(!cartExists){
    let shoppingCart = new ShoppingCart();
    let cartJson = JSON.stringify(shoppingCart);
    console.log('[createCart] CartJson', cartJson);
    redisClient.set(cartId, cartJson);
  }
};

ShoppingCartService.prototype.getShoppingCart = function(cartId){
    cart =  redisClient.get(cartId);
    console.log('Cart From cartid', cartId, cart);
    return cart;
};

module.exports = new ShoppingCartService();
