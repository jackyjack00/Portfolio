import raw from './heroLinks.json';
import { HeroLink } from '../components/Hero/types';
import { ReactComponent as GithubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedinIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';


// Temporary raw shape (without svgIcon)
interface RawHeroLink { href: string; label: string; iconPath: string; }

const iconComponentMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	github: GithubIcon,
	linkedin: LinkedinIcon,
	instagram: InstagramIcon,
};

export const HERO_LINKS: HeroLink[] = (raw as RawHeroLink[]).map(item => {
	// derive key from path or label
	const key = item.iconPath.split('/').pop()?.replace('.svg', '') || item.label.toLowerCase();
	const SvgComp = iconComponentMap[key] || GithubIcon;
	return { ...item, svgIcon: SvgComp } as HeroLink;
});
