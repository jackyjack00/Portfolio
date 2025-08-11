import React from 'react';
import './global.css';
import './App.css';
import Hero from './components/Hero/Hero';
import EducationTimeline from './components/EducationTimeline/EducationTimeline';

const App: React.FC = () => {
  return (
  <div className="AppRoot">
      <Hero />
      <div className="AppBelow">
        <EducationTimeline />
        <footer className="AppFooter">© {new Date().getFullYear()} • Giacomo Rosso</footer>
      </div>
    </div>
  );
};

export default App;
