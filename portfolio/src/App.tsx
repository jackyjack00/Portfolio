import React from 'react';
import './global.css';
import './App.css';
import HeroSection from './section/HeroSection';
import EducationTimelineSection from './section/EducationTimelineSection';
import FooterSection from './section/FooterSection';

const App: React.FC = () => {
  return (
  <div className="AppRoot">
      <HeroSection />
      <div className="AppBelow">
        <EducationTimelineSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default App;
