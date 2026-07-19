import { useEffect, useRef } from 'react';
import './CursorEffect.css';

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const hearts = ['❤️', '💕', '✨', '💖', '🌸', '💫', '🩷'];

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current = { x, y };

      if (cursor) {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
      }

      // Spawn trail particle
      if (Math.random() > 0.5) {
        spawnTrail(x, y);
      }
    };

    const spawnTrail = (x, y) => {
      const el = document.createElement('div');
      el.className = 'cursor-trail';
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.fontSize = (Math.random() * 12 + 10) + 'px';
      el.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
      el.style.setProperty('--dy', (Math.random() * -80 - 20) + 'px');
      document.body.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 1000);
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  );
}
