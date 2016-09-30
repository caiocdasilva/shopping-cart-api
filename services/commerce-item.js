var CommerceItem = require('../models/commerce-item');
var bluebird = require('bluebird');

let CommerceItemService = function(){
}

CommerceItemService.prototype.getCommerceItemByProductId = function (productId) {
  console.log('getCommerceItemByProductId', productId);
  return CommerceItem.find({product_id: productId}).then(function(res) {
    console.log('getCommerceItemByProductId result:', res);
    return res;
  });
};

module.exports = new CommerceItemService();
