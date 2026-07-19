import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EasterEgg.css';

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handler = (e) => {
      const el = e.target;
      // Trigger on floating hearts/petals
      if (el.classList.contains('petal') || el.classList.contains('cursor-trail')) {
        setPos({ x: e.clientX + 'px', y: e.clientY + 'px' });
        setShow(true);
        setTimeout(() => setShow(false), 2500);
      }
    };

    // Also trigger on 'i' key press
    const keyHandler = (e) => {
      if (e.key === 'i' || e.key === 'I') {
        setPos({ x: '50%', y: '50%' });
        setShow(true);
        setTimeout(() => setShow(false), 2500);
      }
    };

    document.addEventListener('click', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="easter-egg-popup glass-card"
          style={{ left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'backOut' }}
        >
          <span className="easter-heart">❤️</span>
          <span className="easter-text">I love you, Nethu!</span>
          <span className="easter-heart">❤️</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
