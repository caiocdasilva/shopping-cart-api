let ShoppingCart = function(){
  this.items = [];
  this.amount = 0;
}

ShoppingCart.prototype.calculateAmount = function(){
  console.log('shoppingCart',this);
  this.amount = this.items.reduce(function(previousValue, item){
    console.log('calculateAmount - previousValue - itemAmount', previousValue, item.amount);
    return previousValue + item.amount;
  }, 0);
}

module.exports = ShoppingCart;
