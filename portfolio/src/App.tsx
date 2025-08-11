import React from 'react';
import './global.css';
import './App.css';
import Hero from './components/Hero/Hero';
import {HERO} from './data/hero';
import EducationTimeline from './components/EducationTimeline/EducationTimeline';

const App: React.FC = () => {
  return (
  <div className="AppRoot">
      <Hero />
      <div className="AppBelow">
        <EducationTimeline />
        <footer className="AppFooter">
          © {new Date().getFullYear()} • {HERO.name}
        </footer>
      </div>
    </div>
  );
};

export default App;
