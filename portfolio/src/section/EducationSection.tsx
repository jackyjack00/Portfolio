import React from 'react';
import EducationTimeline from '../components/EducationTimeline/EducationTimeline';
import { EDUCATION_SUBHEAD } from '../data/educationSubhead';
import { markdownToHtml } from '../utils/utils';

import './EducationSection.css';

const EducationTimelineSection: React.FC = () => {
  return (
    <section id="formazione" className="EduTimeline-section snap-start">
      <div className="EduTimeline-inner">
        <h2 className="EduTimeline-heading">Istruzione &amp; Formazione</h2>
        <p className="EduTimeline-subhead" dangerouslySetInnerHTML={{ __html: markdownToHtml(EDUCATION_SUBHEAD.text) }}></p>
        <EducationTimeline />
      </div>
    </section>
  );
};

export default EducationTimelineSection;
