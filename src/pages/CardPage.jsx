import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import PenguinCrying from '../components/Penguin/PenguinCrying';
import FallingPetals from '../components/Particles/FallingPetals';
import { triggerFireworks, triggerConfetti } from '../components/Confetti/ConfettiEffect';
import LoveCounter from '../components/LoveCounter/LoveCounter';
import NextButton from '../components/NextButton/NextButton';
import './CardPage.css';

const cardMessage = [
  { line: 'Happy Birthday, My Love! ❤️🎉', bold: true },
  { line: 'Today is one of the most special days of my life because it\'s the birthday of the most precious person I\'ve ever met. ❤️' },
  { line: 'From the moment you came into my life, everything became brighter and more meaningful.', italic: true },
  { line: 'You make my happiest moments even happier, and you make the difficult days easier just by being there.', italic: true },
  { line: 'Your love, kindness, and the way you care for me mean more than words could ever express.' },
  { line: 'Thank you for being my safe place, my biggest support, and the reason behind so many of my smiles.' },
  { line: 'I feel incredibly lucky and grateful to have you in my life.' },
  { line: 'On your special day, I pray that all your dreams come true, that your heart is always filled with happiness, and that this new chapter of your life brings you endless blessings, success, and beautiful memories.', italic: true },
  { line: 'No matter what life brings, I promise to stand by your side, support you, and love you with all my heart.' },
  { line: 'I hope I get to celebrate not just this birthday, but every birthday with you.' },
  { line: 'You are truly the most precious person I have ever met, and I thank God every day for bringing you into my life.' },
  { line: 'Happy Birthday once again, my beautiful girl. ❤️ May your day be as amazing, beautiful, and unforgettable as you are.', bold: true },
  { line: 'I love you more than words can ever say. Happy Birthday, my forever. ❤️🎂✨', bold: true, align: 'center' },
];

export default function CardPage({ onNext, onPrev }) {
  const [state, setState] = useState('closed'); // closed | no | opening | open

  const handleYes = () => {
    setState('opening');
    setTimeout(() => {
      setState('open');
      triggerFireworks();
      triggerConfetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    }, 1200);
  };

  const handleNo = () => setState('no');
  const handleTryAgain = () => setState('closed');

  return (
    <PageTransition>
      <div className="card-page">
        <div className="card-page-bg" />
        <FallingPetals count={15} />

        <div className="card-page-content">
          <motion.h2
            className="card-page-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            💌 A Letter for You
          </motion.h2>

          {/* THE CARD */}
          <AnimatePresence mode="wait">
            {state === 'closed' && (
              <motion.div key="closed" className="card-scene">
                {/* Closed card */}
                <motion.div
                  className="birthday-card closed glass-card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    scale: { duration: 0.6, ease: 'backOut' },
                    opacity: { duration: 0.6 },
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                  }}
                >
                  <div className="card-front-design">
                    <div className="card-front-hearts">
                      {['💖', '🌸', '✨', '💕', '🎂'].map((e, i) => (
                        <motion.span
                          key={i}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          style={{ fontSize: '1.8rem' }}
                        >
                          {e}
                        </motion.span>
                      ))}
                    </div>
                    <h3 className="card-front-title">For You,<br />Nethu</h3>
                    <p className="card-front-sub">with all my love ❤️</p>
                    <div className="card-ribbon" />
                    <div className="card-bow">🎀</div>
                  </div>
                </motion.div>

                <motion.p
                  className="card-question"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Do you want to open me?
                </motion.p>

                <div className="card-buttons">
                  <motion.button
                    className="btn-primary card-yes-btn"
                    onClick={handleYes}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    💌 Yes!
                  </motion.button>
                  <motion.button
                    className="btn-secondary card-no-btn"
                    onClick={handleNo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    No
                  </motion.button>
                </div>
              </motion.div>
            )}

            {state === 'no' && (
              <motion.div
                key="no"
                className="card-no-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PenguinCrying size={140} />
                <motion.h3
                  className="card-no-text"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Why did you click No! 😭
                </motion.h3>
                <motion.p className="card-no-sub">
                  The penguin is devastated... 🐧💧
                </motion.p>
                <motion.button
                  className="btn-primary"
                  onClick={handleTryAgain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  🔄 Try Again
                </motion.button>
              </motion.div>
            )}

            {state === 'opening' && (
              <motion.div
                key="opening"
                className="card-opening"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="birthday-card opening glass-card"
                  animate={{
                    rotateY: [0, -90],
                    scaleX: [1, 0.05],
                  }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  <div className="card-front-design">
                    <div className="card-opening-stars">
                      {['✨', '💖', '🌸', '💫', '⭐'].map((e, i) => (
                        <motion.span key={i} style={{ fontSize: '2rem' }}
                          animate={{ scale: [1, 2, 0], opacity: [1, 1, 0] }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        >{e}</motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {state === 'open' && (
              <motion.div
                key="open"
                className="card-open-scene"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'backOut' }}
              >
                {/* Floating hearts burst */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="card-burst-heart"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 60}%`,
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: [-20, -80] }}
                    transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
                  >
                    {['❤️', '💕', '🩷', '💖'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}

                <div className="card-open-content glass-card">
                  <div className="card-open-header">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      style={{ fontSize: '2rem' }}
                    >
                      💌
                    </motion.div>
                    <h3 className="card-open-title">A Birthday Letter</h3>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      style={{ fontSize: '2rem' }}
                    >
                      💌
                    </motion.div>
                  </div>

                  <div className="card-message">
                    {cardMessage.map((item, i) => (
                      <motion.p
                        key={i}
                        className={`card-line ${item.bold ? 'card-line-bold' : ''} ${item.italic ? 'card-line-italic' : ''}`}
                        style={{ textAlign: item.align || 'center' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                      >
                        {item.line}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    className="card-open-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    <LoveCounter />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {(state === 'open') && (
            <motion.div
              className="nav-bar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="btn-nav" onClick={onPrev}>← Previous</button>
              <NextButton onClick={onNext} />
            </motion.div>
          )}
          {state === 'closed' && (
            <div className="nav-bar">
              <button className="btn-nav" onClick={onPrev}>← Previous</button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
