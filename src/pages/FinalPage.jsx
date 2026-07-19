import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import PenguinDancing from '../components/Penguin/PenguinDancing';
import PenguinWaving from '../components/Penguin/PenguinWaving';
import Balloons from '../components/Balloons/Balloons';
import { triggerContinuousConfetti } from '../components/Confetti/ConfettiEffect';
import LoveCounter from '../components/LoveCounter/LoveCounter';
import './FinalPage.css';

const DANCE_CONFIGS = [
  { danceStyle: 'jump', color: '#FF6B9D', label: '💃' },
  { danceStyle: 'wave', color: '#FFD700', label: '👋' },
  { danceStyle: 'wiggle', color: '#FF8C00', label: '🎵' },
];

export default function FinalPage() {
  const [byePhase, setByePhase] = useState('idle'); // idle | waving | hearts | seeYouSoon | fadeout | done
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    // Continuous confetti on mount
    triggerContinuousConfetti(6000);
  }, []);

  const handleBye = () => {
    if (byePhase !== 'idle') return;

    setByePhase('waving');
    setTimeout(() => setByePhase('hearts'), 2000);
    setTimeout(() => setByePhase('seeYouSoon'), 3500);
    setTimeout(() => setByePhase('fadeout'), 5500);
    setTimeout(() => setShowFinal(true), 6500);
  };

  if (showFinal) {
    return (
      <motion.div
        className="final-goodbye"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Video background */}
        <video
          className="final-goodbye-video"
          src={`${import.meta.env.BASE_URL}videos/nethu.mp4`}
          autoPlay
          loop
          muted={false}
          playsInline
        />
        {/* Dark overlay so text is readable */}
        <div className="final-goodbye-overlay" />

        <motion.div
          className="final-goodbye-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: 'backOut' }}
        >
          <motion.div
            className="final-heart"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️
          </motion.div>
          <h2 className="final-goodbye-title">See you soon, Nethu!</h2>
          <p className="final-goodbye-sub">Always in my heart 💕</p>
          <LoveCounter />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <PageTransition>
      <motion.div
        className="final-page"
        animate={{ opacity: byePhase === 'fadeout' ? 0 : 1 }}
        transition={{ duration: 1, delay: byePhase === 'fadeout' ? 0 : 0 }}
      >
        <div className="final-bg" />
        <Balloons count={6} />

        {/* Confetti particles overlay */}
        <div className="final-sparkles">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="final-sparkle"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 90}%`,
                fontSize: `${Math.random() * 16 + 8}px`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {['✨', '💕', '🌸', '⭐', '💫', '🎊', '🎉'][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </div>

        <div className="final-content">
          {/* Title */}
          <motion.h2
            className="final-title"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            🎉 Happy Birthday, Nethu! 🎉
          </motion.h2>

          {/* Dancing penguins */}
          <motion.div
            className="final-penguins"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, staggerChildren: 0.2 }}
          >
            {byePhase === 'waving' || byePhase === 'hearts' || byePhase === 'seeYouSoon' || byePhase === 'fadeout' ? (
              // Switch to waving penguins
              [0, 1, 2].map((i) => (
                <motion.div key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                >
                  <PenguinWaving size={90} />
                </motion.div>
              ))
            ) : (
              DANCE_CONFIGS.map((cfg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <PenguinDancing
                    size={90}
                    danceStyle={cfg.danceStyle}
                    color={cfg.color}
                  />
                  <div className="final-penguin-label">{cfg.label}</div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Flying hearts during bye */}
          <AnimatePresence>
            {(byePhase === 'hearts' || byePhase === 'seeYouSoon') && (
              <motion.div className="final-hearts-fly">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    style={{ left: `${Math.random() * 100}%` }}
                    className="final-fly-heart"
                    initial={{ y: '100vh', opacity: 1 }}
                    animate={{ y: '-20vh', opacity: 0 }}
                    transition={{ duration: 2, delay: Math.random() * 0.5 }}
                  >
                    {['❤️', '💕', '🩷', '💖'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* "See you soon" overlay */}
          <AnimatePresence>
            {byePhase === 'seeYouSoon' && (
              <motion.div
                className="final-see-you"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
              >
                <h2>See you soon ❤️</h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <motion.div
            className="final-messages glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.p
              className="final-msg-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              🎁 I have another surprise for you, but you'll have to wait a little longer.
            </motion.p>
            <motion.p
              className="final-msg-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              💖 I wish you to always be happy and take care.
            </motion.p>
          </motion.div>

          <LoveCounter />

          {/* BYEEE Button */}
          <motion.button
            className="btn-primary final-bye-btn"
            onClick={handleBye}
            disabled={byePhase !== 'idle'}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: byePhase === 'idle' ? 1.08 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {byePhase === 'idle' ? '👋 BYEEE!' :
             byePhase === 'waving' ? '🐧 Waving goodbye...' :
             byePhase === 'hearts' ? '❤️ Sending love...' :
             '💕 See you soon!'}
          </motion.button>
        </div>
      </motion.div>
    </PageTransition>
  );
}
