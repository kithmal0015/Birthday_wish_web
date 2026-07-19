import { useEffect, useRef } from 'react';
import './FallingPetals.css';

const PETALS = ['🌸', '🩷', '❤️', '💕', '✨', '🌹', '💖'];

export default function FallingPetals({ count = 20 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createPetal = () => {
      const el = document.createElement('div');
      el.className = 'petal';
      el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-50px';
      el.style.fontSize = (Math.random() * 16 + 10) + 'px';
      el.style.animationDuration = (Math.random() * 6 + 6) + 's';
      el.style.animationDelay = Math.random() * 5 + 's';
      el.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
      container.appendChild(el);

      el.addEventListener('animationend', () => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };

    // Create initial petals
    for (let i = 0; i < count; i++) {
      setTimeout(createPetal, Math.random() * 5000);
    }

    // Keep spawning
    const interval = setInterval(createPetal, 800);
    return () => {
      clearInterval(interval);
      if (container) container.innerHTML = '';
    };
  }, [count]);

  return <div ref={containerRef} className="falling-petals-container" />;
}
