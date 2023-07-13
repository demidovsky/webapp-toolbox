const express = require('express');
const cacheMiddleware = require('./middleware/redis-cache');

const app = express();
const port = 3000;


app.get('/', cacheMiddleware('1m'), (req, res) => {
  console.log('Retrieving data...')
  setTimeout(() => {
    console.log('Sending...')
    res.json({ hello: true });
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;