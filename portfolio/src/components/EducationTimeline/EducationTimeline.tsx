import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EducationTimeline.css';

interface EducationItem {
  range: string;
  title: string;
  school: string;
  details: string;
  extra: string;
}

const EDUCATION: EducationItem[] = [
  {
    range: '2017–2020',
    title: 'Diploma / Formazione iniziale (da definire)',
    school: 'Scuola / Ente',
    details: 'Fondamenti di programmazione e matematica.',
    extra: 'Competenze: basi di Java/Python, matematica discreta, prime esperienze su progetti personali.'
  },
  {
    range: '2020–2023',
    title: 'Laurea / Programma (da definire)',
    school: 'Istituto / Università',
    details: 'Algoritmi, backend engineering, MLOps di base.',
    extra: 'Esami chiave: Strutture dati, Sistemi Operativi, Reti, Basi di Dati, Ingegneria del Software. Tesi su ottimizzazione pipeline dati.'
  },
  {
    range: '2023–2024',
    title: 'Master / Corso avanzato (da definire)',
    school: 'Istituto / Università',
    details: 'Focus su AI/ML, sistemi distribuiti e data-intensive apps.',
    extra: 'Programma: Deep Learning, NLP, sistemi distribuiti, laboratorio su microservizi e MLOps. Progetto finale su RAG e valutazione automatica.'
  }
];

const DatePill: React.FC<{ range: string }> = ({ range }) => (
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

interface CardBodyProps { item: EducationItem; i: number; open: number | null; toggle: (i: number) => void; }

const CardBody: React.FC<CardBodyProps> = ({ item, i, open, toggle }) => {
  const expanded = open === i;
  return (
    <button
      type="button"
      onClick={() => toggle(i)}
      aria-expanded={expanded}
      aria-controls={`edu-${i}`}
      className="EduTimeline-card"
    >
      <h3 className="EduTimeline-cardTitle">{item.title}</h3>
      <p className="EduTimeline-cardSchool">{item.school}</p>
      <p className="EduTimeline-cardDetails">{item.details}</p>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`edu-${i}`}
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="EduTimeline-cardExtra"
          >
            <div className="EduTimeline-divider" />
            <p>{item.extra}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const EducationTimeline: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i));

  return (
    <section id="formazione" className="EduTimeline-section snap-start">
      <div className="EduTimeline-inner">
        <h2 className="EduTimeline-heading" style={{ fontFamily: 'var(--font-display)' }}>Istruzione & Formazione</h2>
        <p className="EduTimeline-subhead">Percorso accademico e corsi, con focus sui momenti chiave.</p>
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
                    {left ? <CardBody item={item} i={idx} open={open} toggle={toggle} /> : <DatePill range={item.range} />}
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
                    {!left ? <CardBody item={item} i={idx} open={open} toggle={toggle} /> : <DatePill range={item.range} />}
                  </div>
                  <div className="EduTimeline-card-mobile">
                    <CardBody item={item} i={idx} open={open} toggle={toggle} />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
