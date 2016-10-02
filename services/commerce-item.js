var CommerceItem = require('../models/commerce-item');
var bluebird = require('bluebird');

let CommerceItemService = function(){
}

CommerceItemService.prototype.getCommerceItemById = function (commerceItemId) {
  return CommerceItem.find({_id: commerceItemId}).then(function(res) {
    return res;
  });
};

module.exports = new CommerceItemService();
