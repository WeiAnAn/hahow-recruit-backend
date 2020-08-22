jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnThis(),
  get: jest.fn(),
  setex: jest.fn(),
}));

import RedisCache from '../RedisCache';

jest.useFakeTimers();

describe('cache/MemoryCache', () => {
  test('should set cache', async () => {
    const cache = new RedisCache();
    const redisSetCache = cache.client.setex as jest.Mock;
    redisSetCache.mockImplementationOnce((key, time, value, cb) => {
      cb(null, 'OK');
    });
    await cache.set('ha', 'how', 60);
    expect(cache.client.setex).toBeCalledWith(
      'ha',
      60,
      'how',
      expect.any(Function)
    );
  });

  test('should turn into json when setting object', async () => {
    const cache = new RedisCache();
    const redisSetCache = cache.client.setex as jest.Mock;
    redisSetCache.mockImplementationOnce((key, time, value, cb) => {
      cb(null, 'OK');
    });
    await cache.set('ha', { value: 'how' }, 60);
    expect(cache.client.setex).toBeCalledWith(
      'ha',
      60,
      JSON.stringify({ value: 'how' }),
      expect.any(Function)
    );
  });

  test('should get cache', async () => {
    const cache = new RedisCache();
    const redisGetMock = cache.client.get as jest.Mock;
    redisGetMock.mockImplementationOnce((key, cb) => {
      cb(null, 'how');
    });
    expect(await cache.get('ha')).toBe('how');
  });

  test('should get cache and parse to object', async () => {
    const cache = new RedisCache();
    const redisGetMock = cache.client.get as jest.Mock;
    redisGetMock.mockImplementationOnce((key, cb) => {
      cb(null, JSON.stringify({ value: 'how' }));
    });
    expect(await cache.get('ha')).toEqual({ value: 'how' });
  });
});
