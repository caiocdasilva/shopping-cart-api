var mongoose = require('../bin/mongoConnection');

var ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number
});

let Product = mongoose.model('Product', ProductSchema);

// let Product = function(id, name, image, price){
//   this.id = id;
//   this.name = name;
//   this.image = image;
//   this.price = price;
// }

module.exports = Product;
