import Cache from './interface';
import redis, { RedisClient } from 'redis';
import { promisify } from 'util';

type RedisCacheOption = {
  host?: string;
  port?: number;
  url?: string;
};

export default class RedisCache implements Cache {
  client: RedisClient;
  constructor(options: RedisCacheOption = {}) {
    const { host, port, url } = options;
    if (url) {
      this.client = redis.createClient(url);
    } else {
      this.client = redis.createClient({ host, port });
    }
  }
  async get(key: string): Promise<unknown | null> {
    const getAsync = promisify(this.client.get).bind(this.client);
    const data = await getAsync(key);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  async set(key: string, value: unknown, time: number): Promise<void> {
    const setExAsync = promisify(this.client.setex).bind(this.client);
    let data;
    if (typeof value === 'string') {
      data = value;
    } else {
      data = JSON.stringify(value);
    }
    await setExAsync(key, time, data);
  }
}
