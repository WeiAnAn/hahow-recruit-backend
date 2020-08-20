jest.mock('axios', () => ({
  create: jest.fn().mockReturnThis(),
  get: jest.fn(),
}));

import {
  listHeroes,
  getHero,
  getHeroProfile,
  HahowHeroNotFoundError,
  HahowHeroDataError,
} from '../hahowHero';
import axios from 'axios';

describe('listHeroes', () => {
  test('should get heroes', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => ({
      data: [
        {
          id: '1',
          name: 'Daredevil',
          image:
            'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        },
        {
          id: '2',
          name: 'Thor',
          image:
            'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
        },
        {
          id: '3',
          name: 'Iron Man',
          image:
            'http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg',
        },
        {
          id: '4',
          name: 'Hulk',
          image:
            'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg',
        },
      ],
    }));
    expect(await listHeroes()).toEqual([
      {
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      },
      {
        id: '2',
        name: 'Thor',
        image:
          'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
      },
      {
        id: '3',
        name: 'Iron Man',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg',
      },
      {
        id: '4',
        name: 'Hulk',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg',
      },
    ]);
    expect(axios.get).toBeCalledWith('/heroes');
  });
  test('should throw error when response is not hero array', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => ({
      data: {
        code: 1000,
        message: 'Backend error',
      },
    }));
    try {
      await listHeroes();
    } catch (e) {
      expect(e).toBeInstanceOf(HahowHeroDataError);
    }
  });
  test('should throw error when response hero array contain invalid hero', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => ({
      data: [
        {
          id: '1',
          name: 'Daredevil',
          image:
            'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        },
        {
          id: '2',
          name: 'Thor',
          image:
            'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
        },
        {
          code: 1000,
        },
      ],
    }));
    try {
      await listHeroes();
    } catch (e) {
      expect(e).toBeInstanceOf(HahowHeroDataError);
    }
  });
});

describe('getHero', () => {
  test('should get hero', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => ({
      data: {
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      },
    }));
    expect(await getHero('1')).toEqual({
      id: '1',
      name: 'Daredevil',
      image:
        'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
    });
  });

  test('should throw error when hero not found', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => {
      throw new HahowHeroNotFoundError('4');
    });
    try {
      await getHero('4');
    } catch (e) {
      expect(e).toBeInstanceOf(HahowHeroNotFoundError);
    }
  });

  test('should throw error when response is not hero', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => ({
      data: {
        code: 1000,
        message: 'Backend error',
      },
    }));
    try {
      await getHero('4');
    } catch (e) {
      expect(e).toBeInstanceOf(HahowHeroDataError);
    }
  });
});

describe('getHeroProfile', () => {
  test('should get hero profile', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => ({
      data: {
        str: 2,
        int: 7,
        agi: 9,
        luk: 7,
      },
    }));
    expect(await getHeroProfile('1')).toEqual({
      str: 2,
      int: 7,
      agi: 9,
      luk: 7,
    });
  });

  test('should return error when hero not found', async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockImplementation(() => {
      throw new HahowHeroNotFoundError('4');
    });
    try {
      await getHeroProfile('4');
    } catch (e) {
      expect(e).toBeInstanceOf(HahowHeroNotFoundError);
    }
  });
});
