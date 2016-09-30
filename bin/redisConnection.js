let redis = require('redis');
let client = redis.createClient();

// redis.debug_mode = true;
client.on('error', function(err) {
  console.log('Error', err);
});

module.exports = client;
