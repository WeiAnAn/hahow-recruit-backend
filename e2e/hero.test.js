const axios = require('axios');
const { default: app } = require('../build/app');

//increase test timeout, because some api may take long time to response or retry
jest.setTimeout(10000);

const request = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: () => true,
});

const authenticatedHeaders = {
  name: 'hahow',
  password: 'rocks',
};

/**
 * Only care about the response data structure instead of value.
 * Because third party api response value may change
 */
function assertHero(hero) {
  expect(hero).toEqual({
    id: expect.any(String),
    name: expect.any(String),
    image: expect.stringMatching(/https?:\/\/.+/),
  });
}

/**
 * Only care about the response data structure instead of value.
 * Because third party api response value may change
 */
function assertHeroWithProfile(hero) {
  expect(hero).toEqual({
    id: expect.any(String),
    name: expect.any(String),
    image: expect.stringMatching(/https?:\/\/.+/),
    profile: {
      str: expect.any(Number),
      int: expect.any(Number),
      agi: expect.any(Number),
      luk: expect.any(Number),
    },
  });
}

describe('hero api', () => {
  let server;
  beforeAll((done) => {
    server = app.listen(3000, done);
  });
  afterAll((done) => {
    server.close(done);
  });
  describe('GET /heroes', () => {
    test('should get heroes', async () => {
      const res = await request.get('/heroes');
      expect(res.status).toBe(200);
      res.data.heroes.forEach((hero) => assertHero(hero));
    });
    test('should get authenticated heroes', async () => {
      const res = await request.get('/heroes', {
        headers: authenticatedHeaders,
      });
      expect(res.status).toBe(200);
      res.data.heroes.forEach((hero) => assertHeroWithProfile(hero));
    });
    test('should response 400 when auth info is invalid', async () => {
      const res = await request.get('/heroes', {
        headers: { name: 'test' },
      });
      expect(res.status).toBe(400);
      expect(res.data).toEqual({ message: 'auth validation error' });
    });
    test('should response 401 when auth failed', async () => {
      const res = await request.get('/heroes', {
        headers: { name: 'hahow', password: 'rockssss' },
      });
      expect(res.status).toBe(401);
      expect(res.data).toEqual({ message: 'authentication error' });
    });
  });

  describe('GET /heroes/:id', () => {
    // In sometimes, hero api will response internal error,
    // should retry to get correct request
    async function retry(req) {
      let times = 0,
        res;
      while (times < 3 && (!res || res.status !== 200)) {
        res = await req();
        if (res.status !== 200) {
          expect(res.status).toBe(500);
        }
        times++;
      }
      return res;
    }
    test('should get hero', async () => {
      const res = await retry(() => request.get('/heroes/1'));
      expect(res.status).toBe(200);
      assertHero(res.data);
    });
    test('should get authenticated hero', async () => {
      const res = await retry(() =>
        request.get('/heroes/1', {
          headers: authenticatedHeaders,
        })
      );
      expect(res.status).toBe(200);
      assertHeroWithProfile(res.data);
    });
    test('should response 400 when auth info is invalid', async () => {
      const res = await request.get('/heroes/1', {
        headers: { name: 'hahow' },
      });
      expect(res.status).toBe(400);
      expect(res.data).toEqual({ message: 'auth validation error' });
    });
    test('should response 401 when auth failed', async () => {
      const res = await request.get('/heroes/1', {
        headers: { name: 'hahow', password: 'rockssss' },
      });
      expect(res.status).toBe(401);
      expect(res.data).toEqual({ message: 'authentication error' });
    });
    test('should response 404 when hero not found', async () => {
      const res = await request.get('/heroes/99999');
      expect(res.status).toBe(404);
      expect(res.data).toEqual({
        message: 'hero(id = 99999) not found',
      });
    });
  });
});
