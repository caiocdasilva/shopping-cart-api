let mongoose = require('mongoose');

let CommerceItemSchema = mongoose.Schema({
  product_id: {type: Number, ref: 'Product' },
  quantity: Number,
  amount: Number
});

// var CommerceItem = function(id, product, quantity){
//   this.id = id;
//   this.product_id = product.id;
//   this.quantity = quantity;
//   calculateAmount(product.price);
//
//   function calculateAmount(price){
//     this.amount = price * this.quantity;
//   }
// }
//
// CommerceItem.prototype.increaseQuantity = function(){
//   let price = this.amount / this.quantity;
//   this.quantity = this.quantity + 1;
//   this.calculateAmount(price);
// }
//
// CommerceItem.prototype.decreaseQuantity = function(){
//   let price = this.amount / this.quantity;
//   this.quantity = this.quantity - 1 < 0 ? 0 : this.quantity - 1;
//   this.calculateAmount(price);
// }

CommerceItemSchema.methods.calculateAmount = function(price){
    this.amount = price * this.quantity;
}

CommerceItemSchema.methods.increaseQuantity = function(){
  let price = this.amount / this.quantity;
  this.quantity = this.quantity + 1;
  this.calculateAmount(price);
}

CommerceItemSchema.methods.decreaseQuantity = function(){
  let price = this.amount / this.quantity;
  this.quantity = this.quantity - 1 < 0 ? 0 : this.quantity - 1;
  this.calculateAmount(price);
}

let CommerceItem = mongoose.model('CommerceItem', CommerceItemSchema);
module.exports = CommerceItem;
