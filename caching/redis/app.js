const express = require('express');
const cacheMiddleware = require('redis-cache-middleware');

const app = express();
const port = 3000;


// Routes
app.get('/', cacheMiddleware, (req, res) => {
  res.send('Hello, Redis!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
