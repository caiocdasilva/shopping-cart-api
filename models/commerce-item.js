let mongoose = require('mongoose');

let CommerceItemSchema = mongoose.Schema({
  product_id: {type: String, ref: 'Product' },
  quantity: Number,
  amount: Number
});

CommerceItemSchema.methods.calculateAmount = function(price){
    console.log('calculateAmount', price, this.quantity);
    this.amount = price * this.quantity;
}

CommerceItemSchema.methods.increaseQuantity = function(){
  console.log('quantity', this.quantity);
  this.quantity += 1;
}

CommerceItemSchema.methods.decreaseQuantity = function(){
  this.quantity = this.quantity - 1 < 0 ? 0 : this.quantity - 1;
}

let CommerceItem = mongoose.model('CommerceItem', CommerceItemSchema);
module.exports = CommerceItem;
