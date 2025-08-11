import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './EducationTimeline.css';
import { EducationCard } from './EducationCard/EducationCard';
import { DatePill } from './DatePill/DatePill';
import { EDUCATION } from '../../data/education';

// Timeline now focuses solely on layout & state; card & date pill are separate components.

export const EducationTimeline: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i));

  return (
    <div className="EduTimeline-contentWrapper">
      <div className="EduTimeline-axis" aria-hidden />
      <ul className="EduTimeline-list">
        {EDUCATION.map((item, idx) => {
          const left = idx % 2 === 0;
          return (
            <motion.li
              key={item.range}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'tween', duration: 0.9, ease: 'easeOut' }}
              className="EduTimeline-row"
            >
              <div className="EduTimeline-col-left">
                {left ? (
                  <EducationCard item={item} index={idx} openIndex={open} onToggle={toggle} />
                ) : (
                  <DatePill range={item.range} />
                )}
              </div>
              <div className="EduTimeline-dotCol">
                <motion.span
                  className="EduTimeline-dotWrapper"
                  initial={{ scale: 0.6, opacity: 0.6 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={open === idx}
                    aria-controls={`edu-${idx}`}
                    title="Apri dettagli"
                    className="EduTimeline-dotButton"
                  />
                </motion.span>
                <span className="EduTimeline-date-mobile">{item.range}</span>
              </div>
              <div className="EduTimeline-col-right">
                {!left ? (
                  <EducationCard item={item} index={idx} openIndex={open} onToggle={toggle} />
                ) : (
                  <DatePill range={item.range} />
                )}
              </div>
              <div className="EduTimeline-card-mobile">
                <EducationCard item={item} index={idx} openIndex={open} onToggle={toggle} />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default EducationTimeline;
