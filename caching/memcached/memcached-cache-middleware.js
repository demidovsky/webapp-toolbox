const memjs = require('memjs');

// Connect to Memcached
const mc = memjs.Client.create('memcached:11211');

// Middleware to cache responses
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  mc.get(key, (err, value) => {
    if (value) {
      console.log('Cache hit!');
      res.send(value.toString());
    } else {
      console.log('Cache miss!');
      res.sendResponse = res.send;
      res.send = (body) => {
        mc.set(key, body, { expires: 60 }, (err) => {
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