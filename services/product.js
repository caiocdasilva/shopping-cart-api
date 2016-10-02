let Product = require('../models/product');

let ProductService = function(){};

ProductService.prototype.getAllProducts = function(){
  return Product.find();
};

ProductService.prototype.getProductById = function(productId){
  return Product.find({_id: productId});
}

module.exports = new ProductService();
