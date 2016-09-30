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
  console.log('updating shoppingCart');
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
  let product;

  addCommerceItemToShoppingCart = function(commerceItem){
    self.getShoppingCart(cartId).then(function(res){
      res = JSON.parse(res);
      shoppingCart = new ShoppingCart();
      shoppingCart.items = res.items != null ? res.items : [];
      shoppingCart.amount = res.amount;
      shoppingCart.items = _.remove(shoppingCart.items, function(i){
         return i._id === commerceItem._id;
      });
      console.log('shoppingCart', shoppingCart);
      shoppingCart.items.push(commerceItem);
      shoppingCart.calculateAmount();
      self.updateShoppingCart(cartId, shoppingCart);
    }).catch(function(err){
      console.error(err);
    });
  }

  addItemToCommerceItem = function(commerceItem) {
    if(typeof(commerceItem) === 'undefined' || commerceItem == null){
      commerceItem = new CommerceItem({product_id: self.product._id, quantity: 1, amount: 0});
      commerceItem.calculateAmount(self.product.price);
      CommerceItem.create(commerceItem);
    } else {
      commerceItem.increaseQuantity();
      commerceItem.calculateAmount();
      CommerceItem.update(commerceItem);
    }
    return addCommerceItemToShoppingCart(commerceItem);
  };

  return ProductService.getProductById(itemId).then(function(products){
    self.product = products[0];
    return CommerceItemService.getCommerceItemByProductId(self.product._id).then(function(res){
      return addItemToCommerceItem(res[0]);
    });
  });
}

module.exports = new ShoppingCartService();
