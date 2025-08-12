import React from 'react';
import { HeroLink } from './types';
import './HeroLinks.css';

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
          <link.svgIcon className="HeroLinks-icon" aria-hidden />
        </a>
      ))}
    </div>
  );
};

export default HeroLinks;
