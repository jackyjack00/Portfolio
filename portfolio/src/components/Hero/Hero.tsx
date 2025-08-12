import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';
import { HERO } from '../../data/hero';

// Pure presentation of hero identity + typewriter text (no layout / links)
export const Hero: React.FC = () => {
  const { text, blink } = useTypewriter(HERO.roles, { typingSpeed: 65, deletingSpeed: 50, pauseMs: 1000 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="Hero-center"
    >
      <h1 className="Hero-name">{HERO.name}</h1>
      <div className="Hero-roles">
        <span className="Hero-typeText">{text}</span>
        <span className={`Hero-caret ${blink ? 'is-visible' : ''}`} aria-hidden />
      </div>
    </motion.div>
  );
};

export default Hero;
