let mongoose = require('mongoose');


mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/ShoppingCart');

module.exports = mongoose;
