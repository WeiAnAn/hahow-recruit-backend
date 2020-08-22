import MemoryCache from '../MemoryCache';

jest.useFakeTimers();

describe('cache/MemoryCache', () => {
  test('should set and get cache', async () => {
    const cache = new MemoryCache();
    await cache.set('ha', 'how', 60);
    expect(await cache.get('ha')).toBe('how');
  });

  test('should return null if cache not found', async () => {
    const cache = new MemoryCache();
    expect(await cache.get('ha')).toBe(null);
  });

  test('should return null and remove data if cache expired', async () => {
    const cache = new MemoryCache();
    await cache.set('ha', 'how', 60);
    expect(cache.data.get('ha').getData()).toBe('how');
    jest.runTimersToTime(60 * 1000);
    expect(await cache.get('ha')).toBe(null);
    expect(cache.data.size).toBe(0);
  });

  test('should reset timer when set same key again', async () => {
    const cache = new MemoryCache();
    await cache.set('ha', 'how', 60);
    jest.runTimersToTime(30 * 1000);
    await cache.set('ha', 'how2', 60);
    jest.runTimersToTime(40 * 1000);
    expect(await cache.get('ha')).toBe('how2');
  });
});
