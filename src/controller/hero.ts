import { Request, Response, NextFunction } from 'express';
import { getHero, listHeroes, getHeroProfile } from '../services/hahowHero';

export async function getHeroById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const heroId = req.params.id;
    const hero = await getHero(heroId);
    if (!res.locals.authenticated) {
      return res.json(hero);
    }
    const profile = await getHeroProfile(hero.id);
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
    const heroes = await listHeroes();
    if (!res.locals.authenticated) {
      return res.json({ heroes });
    }
    const herosWithProfile = await Promise.all(
      heroes.map(async (hero) => ({
        ...hero,
        profile: await getHeroProfile(hero.id),
      }))
    );
    return res.json({ heroes: herosWithProfile });
  } catch (e) {
    return next(e);
  }
}
