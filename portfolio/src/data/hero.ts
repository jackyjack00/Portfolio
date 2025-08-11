import heroRaw from './hero.json';

export interface HeroData {
  name: string;
  roles: string[];
}

const hero: HeroData = heroRaw;
export const HERO_NAME = hero.name;
export const HERO_ROLES = hero.roles;
