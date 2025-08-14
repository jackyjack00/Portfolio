import React from 'react';
import Hero from '../components/Hero/Hero';
import HeroLinks from '../components/Hero/HeroLinks';
import { HERO_LINKS } from '../data/heroLinks';

import './HeroSection.css'
import HeroBackground from '../components/Hero/HeroBackground';

const HeroSection: React.FC = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('formazione');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="Hero HeroSection-root snap-start">
      <HeroBackground />
      <div className="HeroSection-links">
        <HeroLinks links={HERO_LINKS} />
      </div>
      <div className="HeroSection-center">
        <Hero />
      </div>
      <div className="HeroSection-scrollCue">
        <a
          href="#formazione"
          onClick={handleScrollClick}
          className="HeroSection-scrollLink"
          aria-label="Scroll to the next section"
        >
          <svg className="HeroSection-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="currentColor" />
          </svg>
          <span className="HeroSection-scrollText">About Me</span>
          <svg className="HeroSection-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
