
var redis = require('redis');
var client = redis.createClient('6379','localhost');

client.on("error", function(error) {
    console.log(error);
});
client.on('ready',function(err){
    console.log('ready');
});
module.exports = client;