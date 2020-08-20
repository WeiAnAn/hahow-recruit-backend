import { Request, Response, NextFunction } from 'express';
import { getHero, listHeroes } from '../services/hahowHero';

export async function getHeroById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const heroId = req.params.id;
    const hero = await getHero(heroId);
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
    const heros = await listHeroes();
    return res.json({ heros });
  } catch (e) {
    return next(e);
  }
}
