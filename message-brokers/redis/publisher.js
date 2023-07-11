const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Publish a message every second
setInterval(() => {
  const message = 'Hello, subscribers!';
  client.publish('channel', message);
  console.log(`Published message: ${message}`);
}, 1000);
