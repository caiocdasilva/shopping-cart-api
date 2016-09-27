let ShoppingCart = function(){
  this.items = [];
}

ShoppingCart.prototype.setAmount = function(){
  let initialValue = 0;
  this.amount = this.items.reduce(function(item, initialValue){
    return item.amount + initialValue;
  });
}

module.exports = ShoppingCart;
