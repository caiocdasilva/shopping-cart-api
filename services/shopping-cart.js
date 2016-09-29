let redis = require('redis');
let bluebird = require('bluebird');
let redisClient = require('../bin/redisConnection');
let ShoppingCart = require('../models/shopping-cart');
let ProductService = require('../services/product');
let CommerceItem = require('../models/commerce-item');

bluebird.promisifyAll(redis.RedisClient.prototype);

let ShoppingCartService = function(){
};

ShoppingCartService.prototype.updateShoppingCart = function (cartId, shoppingCart) {
  console.log('updating shoppingCart');
  return redisClient.set(cartId, JSON.stringify(shoppingCart));
};

ShoppingCartService.prototype.getShoppingCart = function(cartId){
  return redisClient.getAsync(cartId);
};

ShoppingCartService.prototype.addItem = function (cartId, itemId) {
  let self = this;
  let product;
  let commerceItem;
  ProductService.getProductById(itemId).then(function(res){
    self.product = res[0];
    return res[0];
  }).then(function(res){
    /* Put in a service */
    promise = CommerceItem.find({ product_id: self.product._id });
  promise.then(function(res){
      console.log('res',res);
      self.commerceItem = res;
      /* */
      let commerceItem;
      /* New CommerceItem */
      if(!res){
        commerceItem = new CommerceItem({product_id: self.product._id, quantity: 1, amount: 0});
        commerceItem.calculateAmount(self.product.price);
        CommerceItem.create(commerceItem);
      } else {
        commerceItem.increaseQuantity();
        commerceItem.calculateAmount();
        CommerceItem.update(commerceItem);
      }
      /**/
      return self.getShoppingCart(cartId).then(function(res){
        let shoppingCartObj = JSON.parse(res);
        let shoppingCart = new ShoppingCart(shoppingCartObj);
        shoppingCart.items = shoppingCartObj.items;
        shoppingCart.items.push(self.commerceItem);
        shoppingCart.calculateAmount();
        self.updateShoppingCart(cartId, shoppingCart);
      }).catch(function(err){
        console.error(err);
      });
    });
  });
};


module.exports = new ShoppingCartService();
