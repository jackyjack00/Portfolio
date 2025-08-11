import React from 'react';
import { motion } from 'framer-motion';
import './DatePill.css';

interface DatePillProps { range: string; }

export const DatePill: React.FC<DatePillProps> = ({ range }) => (
  <motion.span
    className="EduTimeline-datePill"
    initial={{ opacity: 0, y: -4 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.3, delay: 0.05 }}
  >
    {range}
  </motion.span>
);

export default DatePill;
