import React from 'react';
import EducationTimeline from '../components/EducationTimeline/EducationTimeline';

import './EducationSection.css';

const EducationTimelineSection: React.FC = () => {
  return (
    <section id="formazione" className="EduTimeline-section snap-start">
      <div className="EduTimeline-inner">
        <h2 className="EduTimeline-heading" style={{ fontFamily: 'var(--font-display)' }}>Istruzione &amp; Formazione</h2>
        <p className="EduTimeline-subhead">Percorso accademico e corsi, con focus sui momenti chiave.</p>
        <EducationTimeline />
      </div>
    </section>
  );
};

export default EducationTimelineSection;
