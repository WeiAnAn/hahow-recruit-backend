export const listHeroes = jest.fn();
export const getHero = jest.fn();
export const getHeroProfile = jest.fn();

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
