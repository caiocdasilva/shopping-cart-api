var mongoose = require('../bin/mongoConnection');

var ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number
});

let Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
