import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EducationCard.css';
import { ToggleableCardProps } from '../types';
import { markdownToHtml } from '../../../utils/utils';

// A single education card with expandable extra content.
export const EducationCard: React.FC<ToggleableCardProps> = ({ item, index, openIndex, onToggle }) => {
  const expanded = openIndex === index;
  const extraHtml = useMemo(() => markdownToHtml(item.extra || ''), [item.extra]);

  return (
    <button
      type="button"
      onClick={() => onToggle(index)}
      aria-expanded={expanded}
      aria-controls={`edu-${index}`}
      className="EduTimeline-card"
    >
      <h3 className="EduTimeline-cardTitle">{item.title}</h3>
      <p className="EduTimeline-cardSchool">{item.school}</p>
      <p className="EduTimeline-cardDetails">{item.details}</p>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`edu-${index}`}
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="EduTimeline-cardExtra"
          >
            <div className="EduTimeline-divider" />
            <div
              className="EduTimeline-cardExtraContent"
              // Markdown already converted to HTML; ensure source is trusted or sanitize beforehand.
              dangerouslySetInnerHTML={{ __html: extraHtml }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default EducationCard;
