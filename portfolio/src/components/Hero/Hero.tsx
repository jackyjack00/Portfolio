import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';
import { HERO_NAME, HERO_ROLES } from '../../data/hero';

export const Hero: React.FC = () => {
  const { text, blink } = useTypewriter(HERO_ROLES, { typingSpeed: 65, deletingSpeed: 35, pauseMs: 250 });

  return (
    <main className="Hero snap-start">
      <div className="Hero-links">
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="Hero-socialBtn"
        >
          <Github className="Hero-icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/your-username"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="Hero-socialBtn"
        >
          <Linkedin className="Hero-icon" />
        </a>
      </div>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="Hero-center"
      >
      <h1 className="Hero-name">{HERO_NAME}</h1>
      <div className="Hero-roles">
        <span className="Hero-typeText">{text}</span>
        <span
          className={`Hero-caret ${blink ? 'is-visible' : ''}`}
          aria-hidden
        />
      </div>
      </motion.section>
    </main>
  );
};

export default Hero;
