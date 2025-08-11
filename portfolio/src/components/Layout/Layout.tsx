import React from 'react';
import RegalBackground from '../RegalBackground/RegalBackground';
import Hero from '../Hero/Hero';
import EducationTimeline from '../EducationTimeline/EducationTimeline';
import './Layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="AppRoot">
      <RegalBackground />
      <Hero />
      <div className="AppBelow">
        <EducationTimeline />
        <footer className="AppFooter">© {new Date().getFullYear()} • Giacomo Rosso</footer>
      </div>
    </div>
  );
};

export default Layout;
