import { useEffect, useState } from 'react';

export interface TypewriterOptions {
  typingSpeed?: number; // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseMs?: number; // pause before deleting
}

export function useTypewriter(words: string[], options: TypewriterOptions = {}) {
  const { typingSpeed = 65, deletingSpeed = 35, pauseMs = 250 } = options;
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!words.length) return; // guard
    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
  // Switch to next word (start from 0). We'll render a placeholder space
  // to avoid visual flicker before the first character appears.
  setDeleting(false);
  setIndex(prev => (prev + 1) % words.length);
  setSubIndex(0);
  return;
    }
    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, typingSpeed, deletingSpeed, pauseMs]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Provide a non-breaking space placeholder when at the very start of a new word
  // so layout width doesn't fully collapse causing a flicker.
  const raw = words[index] ?? '';
  const slice = raw.slice(0, subIndex);
  const text = slice === '' ? '\u00A0' : slice; // fictitious space
  return { text, blink };
}
