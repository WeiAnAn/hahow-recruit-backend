import cache from './drivers';
import { Hero, HeroProfile } from '../models/Heroes';

const TWO_HOUR_SECOND = 2 * 60 * 60;

function getHeroKey(heroId: string) {
  return `hero:${heroId}`;
}

function getHeroesKey() {
  return 'heroes';
}

function getHeroProfileKey(heroId: string) {
  return `heroProfile:${heroId}`;
}

export function getHeroById(id: string): Promise<Hero | null> {
  return cache.get(getHeroKey(id)) as Promise<Hero>;
}

export function listHeroes(): Promise<Hero[] | null> {
  return cache.get(getHeroesKey()) as Promise<Hero[]>;
}

export function getHeroProfileById(id: string): Promise<HeroProfile | null> {
  return cache.get(getHeroProfileKey(id)) as Promise<HeroProfile>;
}

export function setHeroById(id: string, hero: Hero): Promise<boolean> {
  return cache.set(getHeroKey(id), hero, TWO_HOUR_SECOND);
}

export function setHeroes(heroes: Hero[]): Promise<boolean> {
  return cache.set(getHeroesKey(), heroes, TWO_HOUR_SECOND);
}

export function setHeroProfileById(
  id: string,
  profile: HeroProfile
): Promise<boolean> {
  return cache.set(getHeroProfileKey(id), profile, TWO_HOUR_SECOND);
}
