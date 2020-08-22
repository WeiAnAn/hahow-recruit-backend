import { Request, Response, NextFunction } from 'express';
import { getHero, listHeroes, getHeroProfile } from '../services/hahowHero';
import * as cache from '../cache/hero';

export async function getHeroById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const heroId = req.params.id;
    let hero = await cache.getHeroById(heroId);
    if (!hero) {
      hero = await getHero(heroId);
      await cache.setHeroById(heroId, hero);
    }
    if (!res.locals.authenticated) {
      return res.json(hero);
    }
    const profile = await getProfile(heroId);
    return res.json({ ...hero, profile });
  } catch (e) {
    return next(e);
  }
}

export async function getHeroes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    let heroes = await cache.listHeroes();
    if (!heroes) {
      heroes = await listHeroes();
      await cache.setHeroes(heroes);
    }

    if (!res.locals.authenticated) {
      return res.json({ heroes });
    }

    const herosWithProfile = await Promise.all(
      heroes.map(async (hero) => {
        const profile = await getProfile(hero.id);
        return {
          ...hero,
          profile,
        };
      })
    );
    return res.json({ heroes: herosWithProfile });
  } catch (e) {
    return next(e);
  }
}

async function getProfile(heroId: string) {
  let profile = await cache.getHeroProfileById(heroId);
  if (!profile) {
    profile = await getHeroProfile(heroId);
    await cache.setHeroProfileById(heroId, profile);
  }
  return profile;
}
