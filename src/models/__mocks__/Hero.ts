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

  async getProfile(): Promise<HeroProfile> {
    const profile = {
      str: parseInt(this.id),
      int: parseInt(this.id),
      agi: parseInt(this.id),
      luk: parseInt(this.id),
    };
    this.profile = profile;
    return profile;
  }
}

//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
Hero.getHeroes = jest.fn();
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
Hero.getHeroById = jest.fn();
