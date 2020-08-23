import { Request, Response, NextFunction } from 'express';
import { Hero } from '../models/Hero';

export async function getHeroById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const heroId = req.params.id;
    const hero = await Hero.getHeroById(heroId);
    if (!res.locals.authenticated) {
      return res.json(hero);
    }
    await hero.getProfile();
    return res.json(hero);
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
    const heroes = await Hero.getHeroes();

    if (!res.locals.authenticated) {
      return res.json({ heroes });
    }

    await Promise.all(heroes.map((hero) => hero.getProfile()));
    return res.json({ heroes });
  } catch (e) {
    return next(e);
  }
}
