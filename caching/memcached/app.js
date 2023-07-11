const express = require('express');
const cacheMiddleware = require('memcached-cache-middleware');

const app = express();
const port = 3000;


// Routes
app.get('/', cacheMiddleware, (req, res) => {
  res.send('Hello, Memcached!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
