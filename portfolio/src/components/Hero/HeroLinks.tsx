import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { HeroLink } from './types';
import './HeroLinks.css';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="HeroLinks-icon" />,
  linkedin: <Linkedin className="HeroLinks-icon" />
};

interface HeroLinksProps { links: HeroLink[]; }

// Social / external links for the Hero section, sourced from data file.
export const HeroLinks: React.FC<HeroLinksProps> = ({ links }) => {
  return (
    <div className="HeroLinks-root">
      {links.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="HeroLinks-btn"
        >
          {iconMap[link.icon] ?? iconMap.github}
        </a>
      ))}
    </div>
  );
};

export default HeroLinks;
