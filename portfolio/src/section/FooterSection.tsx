import React from 'react';
import { HERO } from '../data/hero';

const FooterSection: React.FC = () => {
  return (
    <footer className="AppFooter" id="footer">
      © {new Date().getFullYear()} • {HERO.name}
    </footer>
  );
};

export default FooterSection;
