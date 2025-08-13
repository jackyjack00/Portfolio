import React from 'react';
import { motion } from 'framer-motion';
import './DatePill.css';
import { markdownToHtml } from '../../../utils/utils';

interface DatePillProps { range: string; }

export const DatePill: React.FC<DatePillProps> = ({ range }) => (
  <motion.span
    className="EduTimeline-datePill"
    initial={{ opacity: 0, y: -4 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.3, delay: 0.05 }}
    dangerouslySetInnerHTML={{ __html: markdownToHtml(range) }}
  >
  </motion.span>
);

export default DatePill;
