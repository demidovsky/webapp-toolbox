const redis = require('redis');

// Connect to Redis
const client = redis.createClient({
  host: 'redis',
  port: 6379,
});

// Middleware to cache responses
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  client.get(key, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (data !== null) {
      console.log('Cache hit!');
      res.send(data);
    } else {
      console.log('Cache miss!');
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, body, 'EX', 60, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Cached!');
          }
        });
        res.sendResponse(body);
      };
      next();
    }
  });
};

module.exports = cacheMiddleware;
