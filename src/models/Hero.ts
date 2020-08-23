import * as cache from '../cache/hero';
import * as hahowService from '../services/hahowHero';

export interface HeroProfile {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export type HeroData = {
  id: string;
  name: string;
  image: string;
  profile?: HeroProfile;
};

export class Hero {
  id: string;
  name: string;
  image: string;
  profile?: HeroProfile;
  constructor(id: string, name: string, image: string, profile?: HeroProfile) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.profile = profile;
  }

  static async getHeroById(id: string): Promise<Hero> {
    let heroData = await cache.getHeroById(id);
    if (!heroData) {
      heroData = await hahowService.getHero(id);
      await cache.setHeroById(id, heroData);
    }
    const hero = new Hero(heroData.id, heroData.name, heroData.image);
    return hero;
  }

  static async getHeroes(): Promise<Hero[]> {
    let heroesData = await cache.listHeroes();
    if (!heroesData) {
      heroesData = await hahowService.listHeroes();
      await cache.setHeroes(heroesData);
    }
    const heroes = heroesData.map(
      (heroData) => new Hero(heroData.id, heroData.name, heroData.image)
    );
    return heroes;
  }

  async getProfile(): Promise<HeroProfile> {
    let profile = await cache.getHeroProfileById(this.id);
    if (!profile) {
      profile = await hahowService.getHeroProfile(this.id);
      await cache.setHeroProfileById(this.id, profile);
    }
    this.profile = profile;
    return profile;
  }
}
