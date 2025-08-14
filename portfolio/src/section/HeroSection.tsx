import React from 'react';
import Hero from '../components/Hero/Hero';
import HeroLinks from '../components/Hero/HeroLinks';
import { HERO_LINKS } from '../data/heroLinks';

import './HeroSection.css'

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="Hero HeroSection-root snap-start">
      <div className="HeroSection-links">
        <HeroLinks links={HERO_LINKS} />
      </div>
      <Hero />
    </section>
  );
};

export default HeroSection;
