let ShoppingCart = function(){
  this.items = [];
  this.amount = 0;
}

ShoppingCart.prototype.constructor = function(cart){
  console.log('items', cart.items);
  this.items = cart.items;
  this.amount = 0;
}

ShoppingCart.prototype.calculateAmount = function(){
  this.amount = this.items.reduce(function(previousValue, item){
    return previousValue + item.amount;
  }, 0);
}

module.exports = ShoppingCart;
