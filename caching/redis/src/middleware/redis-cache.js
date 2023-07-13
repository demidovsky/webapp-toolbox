const redis = require('redis');
const SEC = 1000;


// Connect to Redis
const redisClient = redis.createClient({
    url: 'redis://localhost:6378',
    socket: {
        reconnectStrategy: retries => {
            const delay = (retries + 1) * SEC;
            console.log('Redis will try to reconnect in ', delay);
            return Math.min(delay, 60 * SEC);
        }
    }
});

redisClient.on("connect", () => console.log(`Redis connected`));
redisClient.on("reconnecting", () => console.log(`Redis reconnecting`));
redisClient.on("error", (error) => console.error(`Redis error : ${error}`));
redisClient.connect();

function createCacheMiddleware(expiration) {
    const cacheMiddleware = async (req, res, next) => {
        const key = `${req.user_id || ''}:${req.originalUrl}`;

        let data = null;
        try {
            console.log(`Searching for "${key}" in cache...`);
            data = JSON.parse(await redisClient.get(key));
            console.log('Found: ', data);
        } catch (err) {
            console.error(err);
            next();
            return;
        }

        if (data !== null) {
            console.log('Got cache:', data, typeof data);
            res.send(data);
        } else {
            console.log('No cache');
            res.sendResponse = res.send;
            res.send = (body) => {
                try {
                    let expireSeconds;
                    switch (expiration) {
                        case '1d': expireSeconds = 24 * 60 * 60; break;
                        case '1h': expireSeconds = 60 * 60; break;
                        case '1m': expireSeconds = 60; break;
                        default: expireSeconds = expiration;
                    }
                    console.log('cache for', expireSeconds, 'sec');
                    redisClient.set(key, body, { EX: expireSeconds });
                } catch (err) {
                    console.error('Cannot cache: ', err);
                    return;
                }
                console.log('Cached: ', key);
                res.sendResponse(body);
            };
            next();
        }
    };

    return cacheMiddleware;
}

module.exports = createCacheMiddleware;
