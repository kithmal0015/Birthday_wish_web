import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PenguinWalking from '../components/Penguin/PenguinWalking';
import './LoadingScreen.css';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 16 + 8,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 3,
  icon: ['✨', '💕', '🌸', '⭐', '💫', '🩷', '❄️'][Math.floor(Math.random() * 7)],
}));

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);

    // Progress
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 1.5;
      });
    }, 40);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Animated gradient background */}
      <div className="loading-bg" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="loading-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.icon}
        </motion.div>
      ))}

      {/* Center content */}
      <div className="loading-content">
        {/* Penguin walking */}
        <motion.div
          className="loading-penguin-wrap"
          animate={{ x: [-80, 80, -80] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PenguinWalking size={110} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="loading-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          🎂 Happy Birthday
          <span className="loading-name"> Nethu</span> 🎂
        </motion.h1>

        <motion.p
          className="loading-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Preparing your surprise{dots}
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="loading-bar-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="loading-bar">
            <motion.div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="loading-percent">{Math.round(progress)}%</span>
        </motion.div>

        {/* Hearts row */}
        <motion.div
          className="loading-hearts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {['❤️', '💕', '🩷', '💖', '🫀'].map((h, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              style={{ fontSize: '1.5rem' }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
