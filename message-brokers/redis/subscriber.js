const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Subscribe to the channel
client.subscribe('channel');

// Listen for messages
client.on('message', (channel, message) => {
  console.log(`Received message from channel '${channel}': ${message}`);
});
