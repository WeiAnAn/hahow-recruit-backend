import Cache from './interface';

const SECOND = 1000;

class MemoryCache implements Cache {
  data: Map<string, CacheData>;
  constructor() {
    this.data = new Map();
  }
  get(key: string): Promise<unknown | null> {
    const data = this.data.get(key);
    if (!data) {
      return Promise.resolve(null);
    }
    if (data.isExpired()) {
      this.data.delete(key);
      return Promise.resolve(null);
    }
    return Promise.resolve(data.getData());
  }
  set(key: string, value: unknown, time: number): Promise<boolean> {
    const cacheData = new CacheData(value, time);
    const oldCacheData = this.data.get(key);
    if (oldCacheData) {
      oldCacheData.setData(value, time);
    } else {
      this.data.set(key, cacheData);
    }
    return Promise.resolve(true);
  }
}

class CacheData {
  data: unknown;
  timer: NodeJS.Timeout | null;
  constructor(data: unknown, time: number) {
    this.timer = setTimeout(() => this.clearData(), time * SECOND).unref();
    this.data = data;
  }

  clearData() {
    this.data = null;
  }

  resetTimeout(time: number) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.clearData();
    }, time * SECOND).unref();
  }

  setData(data: unknown, time: number) {
    this.data = data;
    this.resetTimeout(time);
  }

  isExpired() {
    return this.data === null;
  }

  getData() {
    return this.data;
  }
}

export default MemoryCache;
