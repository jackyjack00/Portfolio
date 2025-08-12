export interface Hero {
  name: string;
  roles: string[];
}

export interface HeroLink {
  href: string;
  label: string;
  icon: 'github' | 'linkedin';
}
