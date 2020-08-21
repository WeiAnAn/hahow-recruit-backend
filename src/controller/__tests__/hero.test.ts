jest.mock('../../services/hahowHero.ts');
import { getHeroes, getHeroById } from '../hero';
import { getHero, listHeroes, getHeroProfile } from '../../services/hahowHero';

const getHeroProfileMock = getHeroProfile as jest.Mock;
getHeroProfileMock.mockImplementation((heroId) => ({
  str: parseInt(heroId),
  int: parseInt(heroId),
  agi: parseInt(heroId),
  luk: parseInt(heroId),
}));

describe('controller/hero', () => {
  let res, req;
  const next: jest.Mock = jest.fn();
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: { authenticated: false },
    };
    req = {};
  });
  describe('getHeroes', () => {
    test('should response heroes', async () => {
      const listHeroesMock = listHeroes as jest.Mock;
      listHeroesMock.mockImplementation(() => [
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
      await getHeroes(req, res, next);
      expect(res.json).toBeCalledWith({
        heroes: [
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
      });
      expect(next).not.toBeCalled();
      expect(listHeroesMock).toBeCalled();
    });
    test('should response authenticated heroes', async () => {
      const listHeroesMock = listHeroes as jest.Mock;
      res.locals.authenticated = true;
      listHeroesMock.mockImplementation(() => [
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

      await getHeroes(req, res, next);
      expect(res.json).toBeCalledWith({
        heroes: [
          {
            id: '1',
            name: 'Daredevil',
            image:
              'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
            profile: {
              str: 1,
              int: 1,
              agi: 1,
              luk: 1,
            },
          },
          {
            id: '2',
            name: 'Thor',
            image:
              'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
            profile: {
              str: 2,
              int: 2,
              agi: 2,
              luk: 2,
            },
          },
          {
            id: '3',
            name: 'Iron Man',
            image:
              'http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg',
            profile: {
              str: 3,
              int: 3,
              agi: 3,
              luk: 3,
            },
          },
          {
            id: '4',
            name: 'Hulk',
            image:
              'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg',
            profile: {
              str: 4,
              int: 4,
              agi: 4,
              luk: 4,
            },
          },
        ],
      });
      expect(getHeroProfileMock).toBeCalledTimes(4);
    });
    test('should called next if error occur', async () => {
      const listHeroesMock = listHeroes as jest.Mock;
      listHeroesMock.mockImplementation(() => {
        throw new Error();
      });
      await getHeroes(req, res, next);
      expect(next).toBeCalledWith(new Error());
      expect(listHeroesMock).toBeCalled();
    });
  });

  describe('getHeroById', () => {
    test('should response hero', async () => {
      const getHeroMock = getHero as jest.Mock;
      getHeroMock.mockImplementation(() => ({
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      }));
      req.params = { id: '1' };
      await getHeroById(req, res, next);
      expect(res.json).toBeCalledWith({
        id: '1',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        name: 'Daredevil',
      });
      expect(next).not.toBeCalled();
      expect(getHeroMock).toBeCalledWith('1');
    });
    test('should response authenticated hero', async () => {
      const getHeroMock = getHero as jest.Mock;
      getHeroMock.mockImplementation(() => ({
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      }));
      req.params = { id: '1' };
      res.locals.authenticated = true;
      await getHeroById(req, res, next);
      expect(res.json).toBeCalledWith({
        id: '1',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        name: 'Daredevil',
        profile: {
          str: 1,
          int: 1,
          agi: 1,
          luk: 1,
        },
      });
      expect(next).not.toBeCalled();
      expect(getHeroMock).toBeCalledWith('1');
      expect(getHeroProfileMock).toBeCalledWith('1');
    });
    test('should called next if error occur', async () => {
      const getHeroMock = getHero as jest.Mock;
      getHeroMock.mockImplementation(() => {
        throw new Error();
      });
      req.params = { id: '1' };
      await getHeroById(req, res, next);
      expect(next).toBeCalledWith(new Error());
      expect(getHeroMock).toBeCalledWith('1');
    });
  });
});
