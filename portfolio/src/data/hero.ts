import heroRaw from './hero.json';
import { Hero } from '../components/Hero/types';

// Typed hero data loaded at build time
export const HERO: Hero = heroRaw as Hero;
