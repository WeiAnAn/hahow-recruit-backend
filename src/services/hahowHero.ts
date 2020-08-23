import axios, { AxiosError } from 'axios';
import { HeroData, HeroProfile } from '../models/Hero';

const HAHOW_HOST = 'https://hahow-recruit.herokuapp.com/';
const request = axios.create({
  baseURL: HAHOW_HOST,
});

export async function listHeroes(): Promise<HeroData[]> {
  const res = await request.get('/heroes');
  if (!res.data?.every?.(checkHeroData)) {
    throw new HahowHeroDataError(res.data);
  }
  return res.data;
}

export async function getHero(heroId: string): Promise<HeroData> {
  try {
    const res = await request.get(`/heroes/${heroId}`);
    if (!checkHeroData(res.data)) {
      throw new HahowHeroDataError(res.data);
    }
    return res.data;
  } catch (e) {
    checkNotFound(e, heroId);
    throw e;
  }
}

export async function getHeroProfile(heroId: string): Promise<HeroProfile> {
  try {
    const res = await request.get(`/heroes/${heroId}/profile`);
    return res.data;
  } catch (e) {
    checkNotFound(e, heroId);
    throw e;
  }
}

export class HahowHeroNotFoundError extends Error {
  constructor(heroId: string) {
    super();
    this.message = `hero(id = ${heroId}) not found`;
    this.name = 'HahowHeroNotFoundError';
  }
}

export class HahowHeroDataError extends Error {
  data: Record<string, unknown>;
  constructor(data: unknown) {
    super();
    this.message = `Hahow backend error, data=${JSON.stringify(data)}`;
    this.data = data as Record<string, unknown>;
    this.name = 'HahowHeroDataError';
  }
}

function checkNotFound(e: AxiosError, heroId: string) {
  if (e.isAxiosError) {
    if (e.response?.status === 404) {
      throw new HahowHeroNotFoundError(heroId);
    }
  }
}

function checkHeroData(hero: HeroData): boolean {
  return (
    hero &&
    hero.name !== undefined &&
    hero.id !== undefined &&
    hero.image !== undefined
  );
}
