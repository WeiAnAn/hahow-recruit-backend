jest.mock('../../services/hahowHero.ts');
jest.mock('../../cache/hero.ts');
import { Hero } from '../Hero';
import { getHero, listHeroes, getHeroProfile } from '../../services/hahowHero';
import * as cache from '../../cache/hero';

const getHeroProfileMockFunction = (heroId) => ({
  str: parseInt(heroId),
  int: parseInt(heroId),
  agi: parseInt(heroId),
  luk: parseInt(heroId),
});
const getHeroProfileMock = getHeroProfile as jest.Mock;
getHeroProfileMock.mockImplementation(getHeroProfileMockFunction);

describe('controller/hero', () => {
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
      expect(await Hero.getHeroes()).toEqual([
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
      expect(listHeroesMock).toBeCalled();
      expect(cache.setHeroes).toBeCalledWith([
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
    });
    test('should response heroes and get heroes data from cache', async () => {
      const listHeroesMock = listHeroes as jest.Mock;
      const cacheListHeroes = cache.listHeroes as jest.Mock;
      cacheListHeroes.mockImplementationOnce(() => [
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
      expect(await Hero.getHeroes()).toEqual([
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
      expect(listHeroesMock).not.toBeCalled();
      expect(cacheListHeroes).toBeCalled();
    });
    test('should response authenticated heroes', async () => {
      const listHeroesMock = listHeroes as jest.Mock;
      listHeroesMock.mockImplementationOnce(() => [
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

      const heroes = await Hero.getHeroes();
      await Promise.all(heroes.map((hero) => hero.getProfile()));

      expect(heroes).toEqual([
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
      ]);
      expect(getHeroProfileMock).toBeCalledTimes(4);
      expect(cache.setHeroProfileById).toBeCalledTimes(4);
    });
    test('should response authenticated heroes data from cache', async () => {
      const listHeroesMock = listHeroes as jest.Mock;
      listHeroesMock.mockImplementationOnce(() => [
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
      const cacheGetProfile = cache.getHeroProfileById as jest.Mock;
      cacheGetProfile
        .mockImplementationOnce(getHeroProfileMockFunction)
        .mockImplementationOnce(getHeroProfileMockFunction)
        .mockImplementationOnce(getHeroProfileMockFunction)
        .mockImplementationOnce(getHeroProfileMockFunction);

      const heroes = await Hero.getHeroes();
      await Promise.all(heroes.map((hero) => hero.getProfile()));
      expect(heroes).toEqual([
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
      ]);
      expect(getHeroProfileMock).toBeCalledTimes(0);
      expect(cacheGetProfile).toBeCalledTimes(4);
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

      expect(await Hero.getHeroById('1')).toEqual({
        id: '1',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        name: 'Daredevil',
      });
      expect(getHeroMock).toBeCalledWith('1');
      expect(cache.setHeroById).toBeCalledWith('1', {
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      });
    });

    test('should response hero from cache', async () => {
      const cacheGetHero = cache.getHeroById as jest.Mock;
      cacheGetHero.mockImplementationOnce(() => ({
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      }));
      expect(await Hero.getHeroById('1')).toEqual({
        id: '1',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
        name: 'Daredevil',
      });
      expect(cacheGetHero).toBeCalledWith('1');
      expect(getHero).not.toBeCalled();
    });

    test('should response authenticated hero', async () => {
      const getHeroMock = getHero as jest.Mock;
      getHeroMock.mockImplementation(() => ({
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      }));
      const hero = await Hero.getHeroById('1');
      await hero.getProfile();
      expect(hero).toEqual({
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
      expect(getHeroMock).toBeCalledWith('1');
      expect(getHeroProfileMock).toBeCalledWith('1');
      expect(cache.setHeroProfileById).toBeCalledWith('1', {
        str: 1,
        int: 1,
        agi: 1,
        luk: 1,
      });
    });
    test('should response authenticated hero from cache', async () => {
      const getHeroMock = getHero as jest.Mock;
      getHeroMock.mockImplementation(() => ({
        id: '1',
        name: 'Daredevil',
        image:
          'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
      }));
      const cacheGetHeroProfileMock = cache.getHeroProfileById as jest.Mock;
      cacheGetHeroProfileMock.mockImplementationOnce(() => ({
        str: 1,
        int: 1,
        agi: 1,
        luk: 1,
      }));
      const hero = await Hero.getHeroById('1');
      await hero.getProfile();
      expect(hero).toEqual({
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
      expect(getHeroMock).toBeCalledWith('1');
      expect(getHeroProfileMock).not.toBeCalled();
      expect(cacheGetHeroProfileMock).toBeCalledWith('1');
    });
  });
});
