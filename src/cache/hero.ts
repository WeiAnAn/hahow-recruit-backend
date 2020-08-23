import cache from './drivers';
import { HeroData, HeroProfile } from '../models/Hero';

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

export function getHeroById(id: string): Promise<HeroData | null> {
  return cache.get(getHeroKey(id)) as Promise<HeroData>;
}

export function listHeroes(): Promise<HeroData[] | null> {
  return cache.get(getHeroesKey()) as Promise<HeroData[]>;
}

export function getHeroProfileById(id: string): Promise<HeroProfile | null> {
  return cache.get(getHeroProfileKey(id)) as Promise<HeroProfile>;
}

export function setHeroById(id: string, hero: HeroData): Promise<void> {
  return cache.set(getHeroKey(id), hero, TWO_HOUR_SECOND);
}

export function setHeroes(heroes: HeroData[]): Promise<void> {
  return cache.set(getHeroesKey(), heroes, TWO_HOUR_SECOND);
}

export function setHeroProfileById(
  id: string,
  profile: HeroProfile
): Promise<void> {
  return cache.set(getHeroProfileKey(id), profile, TWO_HOUR_SECOND);
}
