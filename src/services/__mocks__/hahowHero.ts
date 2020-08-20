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
  data: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  constructor(data: any) {
    super();
    this.message = `Hahow backend error, data=${JSON.stringify(data)}`;
    this.data = data;
    this.name = 'HahowHeroDataError';
  }
}
