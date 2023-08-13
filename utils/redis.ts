import { createClient } from 'redis'

export async function connectRedis() {
  const client = createClient()
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()
  return client
}


export function attachRedisClient(req, res, next) {
  connectRedis()
    .then((client) => {
      req.redisClient = client;
      next();
    })
    .catch((err) => {
      console.error('Error connecting to Redis:', err);
      next(err);
    });
}
