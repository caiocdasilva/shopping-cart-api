let mongoose = require('mongoose');

// mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/ShoppingCart');
mongoose.Promise = require('bluebird');

module.exports = mongoose;
