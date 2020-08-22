import Cache from './interface';
import MemoryCache from './MemoryCache';
import RedisCache from './RedisCache';

const REDIS_DEFAULT_HOST = '127.0.0.1';
const REDIS_DEFAULT_PORT = '6379';

let cache: Cache;

if (process.env.CACHE_DRIVER === 'redis') {
  const host = process.env.REDIS_HOST || REDIS_DEFAULT_HOST;
  const strPort = process.env.REDIS_PORT || REDIS_DEFAULT_PORT;
  const port = parseInt(strPort, 10);
  cache = new RedisCache({ host, port });
} else {
  cache = new MemoryCache();
}

export default cache;
