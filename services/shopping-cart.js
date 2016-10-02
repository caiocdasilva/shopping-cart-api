let redis = require('redis');
let bluebird = require('bluebird');
let _ = require('lodash');
let redisClient = require('../bin/redisConnection');
let ShoppingCart = require('../models/shopping-cart');
let CommerceItem = require('../models/commerce-item');
let ProductService = require('../services/product');
let CommerceItemService = require('../services/commerce-item');


bluebird.promisifyAll(redis.RedisClient.prototype);

let ShoppingCartService = function(){
};

ShoppingCartService.prototype.updateShoppingCart = function (cartId, shoppingCart) {
  return redisClient.set(cartId, JSON.stringify(shoppingCart));
};

ShoppingCartService.prototype.getShoppingCart = function(cartId){
  let self = this;
  return redisClient.getAsync(cartId).then(function(shoppingCart) {
    if(shoppingCart == null){
      shoppingCart = new ShoppingCart();
      self.updateShoppingCart(cartId, shoppingCart);
    }
    return shoppingCart;
  });
};

ShoppingCartService.prototype.addItem = function (cartId, itemId) {
  let self = this;
  self.productId = itemId;

  addItemToCommerceItem = function(commerceItem) {
    return ProductService.getProductById(self.productId).then(function(res){
      let product = res[0];
      if(typeof(commerceItem) === 'undefined' || commerceItem == null){
        commerceItem = new CommerceItem({product_id: product._id, quantity: 1, amount: 0});
        commerceItem.calculateAmount(product.price);
        CommerceItem.create(commerceItem);
      } else {
        commerceItem = new CommerceItem({_id: commerceItem._id, product_id: commerceItem.product_id, quantity: commerceItem.quantity, amount: commerceItem.amount});
        commerceItem.increaseQuantity();
        commerceItem.calculateAmount(product.price);
        CommerceItem.update(commerceItem);
      }
      return commerceItem;
    });
  };

  return self.getShoppingCart(cartId).then(function(res){
    res = JSON.parse(res);
    let shoppingCart = new ShoppingCart();
    shoppingCart.items = res.items != null ? res.items : [];
    shoppingCart.amount = res.amount;
    let commerceItem = _.find(shoppingCart.items, {product_id: self.productId});
    addItemToCommerceItem(commerceItem).then(function(res){
      commerceItem = res;
      items = shoppingCart.items;
      shoppingCart.items = _.remove(items, function(i){
         return i._id != commerceItem._id;
      });
      shoppingCart.items.push(commerceItem);
      shoppingCart.calculateAmount();
      self.updateShoppingCart(cartId, shoppingCart);
    });
  });
}

module.exports = new ShoppingCartService();
