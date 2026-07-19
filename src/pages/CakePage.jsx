import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import PenguinFeeding from '../components/Penguin/PenguinFeeding';
import FallingPetals from '../components/Particles/FallingPetals';
import { triggerConfetti, triggerFireworks } from '../components/Confetti/ConfettiEffect';
import LoveCounter from '../components/LoveCounter/LoveCounter';
import './CakePage.css';

const TYPEWRITER_TEXT = 'Wish Your Happy Birthday Beautiful...! 🎂';

function Candle({ x, color, blown }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Candle body */}
      <rect x="-5" y="-50" width="10" height="40" rx="4" fill={color} />
      {/* Wax drip */}
      <ellipse cx="0" cy="-12" rx="6" ry="4" fill={color} opacity="0.7" />
      {/* Wick */}
      <line x1="0" y1="-50" x2="0" y2="-58" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      {/* Flame - only if not blown */}
      {!blown && (
        <g>
          <motion.ellipse
            cx="0" cy="-65"
            rx="6" ry="10"
            fill="#FFD700"
            animate={{
              cx: [-1, 1, -1],
              ry: [10, 12, 10],
              opacity: [1, 0.8, 1],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.ellipse
            cx="0" cy="-68"
            rx="3" ry="7"
            fill="#FFA500"
            animate={{ cx: [0, -1, 0], ry: [7, 9, 7] }}
            transition={{ duration: 0.25, repeat: Infinity }}
          />
          <motion.ellipse
            cx="0" cy="-70"
            rx="1.5" ry="4"
            fill="white"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
          {/* Glow */}
          <ellipse cx="0" cy="-65" rx="12" ry="12" fill="rgba(255,220,0,0.15)" />
        </g>
      )}
      {/* Smoke when blown */}
      {blown && (
        <>
          <motion.ellipse cx="0" cy="-60" rx="3" ry="5" fill="rgba(200,200,200,0.6)"
            animate={{ cy: [-60, -80, -100], opacity: [0.6, 0.3, 0], ry: [5, 8, 3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.ellipse cx="-3" cy="-65" rx="2" ry="4" fill="rgba(180,180,180,0.4)"
            animate={{ cy: [-65, -90, -110], opacity: [0.4, 0.2, 0], cx: [-3, -8, -12] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}
    </g>
  );
}

function BirthdayCake({ blown, cut, sliceGone }) {
  const candleColors = ['#FF6B9D', '#A855F7', '#FFD700', '#FF8C00', '#C44569'];
  const candlePositions = [-80, -40, 0, 40, 80];

  return (
    <svg width="280" height="260" viewBox="-140 -100 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Candles */}
      {candlePositions.map((x, i) => (
        <Candle key={i} x={x} color={candleColors[i]} blown={blown} />
      ))}

      {/* Top tier */}
      <ellipse cx="0" cy="-10" rx="70" ry="18" fill="#FF6B9D" />
      <rect x="-70" y="-28" width="140" height="20" fill="url(#topTier)" />
      <ellipse cx="0" cy="-28" rx="70" ry="18" fill="url(#topEllipse)" />
      {/* Top tier frosting drips */}
      {[-50, -25, 0, 25, 50].map((x, i) => (
        <ellipse key={i} cx={x} cy="-12" rx="8" ry="10" fill="white" opacity="0.85" />
      ))}

      {/* Middle tier */}
      <ellipse cx="0" cy="30" rx="100" ry="22" fill="#C44569" />
      <rect x="-100" y="5" width="200" height="27" fill="url(#midTier)" />
      <ellipse cx="0" cy="5" rx="100" ry="22" fill="url(#midEllipse)" />
      {/* Frosting drips */}
      {[-70, -40, -10, 20, 50, 80].map((x, i) => (
        <ellipse key={i} cx={x} cy="16" rx="10" ry="12" fill="white" opacity="0.8" />
      ))}

      {/* Bottom tier */}
      <ellipse cx="0" cy="78" rx="130" ry="25" fill="#A855F7" />
      <rect x="-130" y="48" width="260" height="32" fill="url(#botTier)" />
      <ellipse cx="0" cy="48" rx="130" ry="25" fill="url(#botEllipse)" />
      {/* Frosting drips */}
      {[-100, -65, -30, 5, 40, 75, 105].map((x, i) => (
        <ellipse key={i} cx={x} cy="62" rx="12" ry="14" fill="white" opacity="0.75" />
      ))}

      {/* Plate */}
      <ellipse cx="0" cy="103" rx="140" ry="20" fill="rgba(255,255,255,0.15)" />

      {/* Decorations */}
      <text x="-18" y="25" fontSize="18">🍓</text>
      <text x="-15" y="70" fontSize="22">🎂</text>
      <text x="40" y="70" fontSize="18">🍰</text>
      <text x="-60" y="70" fontSize="18">🍓</text>

      {/* Cut line */}
      {cut && !sliceGone && (
        <motion.line
          x1="0" y1="-30"
          x2="40" y2="103"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Missing slice */}
      {sliceGone && (
        <motion.polygon
          points="0,-30 40,103 0,103"
          fill="rgba(0,0,0,0.5)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Sparkles on cake */}
      {!blown && (
        <>
          <motion.text x="-120" y="-5" fontSize="14"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}>✨</motion.text>
          <motion.text x="100" y="-10" fontSize="12"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>⭐</motion.text>
        </>
      )}

      <defs>
        <linearGradient id="topTier" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#C44569" />
        </linearGradient>
        <linearGradient id="topEllipse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8BB8" />
          <stop offset="100%" stopColor="#FF6B9D" />
        </linearGradient>
        <linearGradient id="midTier" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C44569" />
          <stop offset="100%" stopColor="#8B1A6B" />
        </linearGradient>
        <linearGradient id="midEllipse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d45a7a" />
          <stop offset="100%" stopColor="#C44569" />
        </linearGradient>
        <linearGradient id="botTier" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6C3483" />
        </linearGradient>
        <linearGradient id="botEllipse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BC75FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function CakePage({ onNext, onPrev }) {
  const [displayedText, setDisplayedText] = useState('');
  const [blown, setBlown] = useState(false);
  const [cut, setCut] = useState(false);
  const [sliceGone, setSliceGone] = useState(false);
  const [showPenguin, setShowPenguin] = useState(false);
  const [penguinPhase, setPenguinPhase] = useState('idle');
  const [started, setStarted] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= TYPEWRITER_TEXT.length) {
        setDisplayedText(TYPEWRITER_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  const handleBlowCut = () => {
    if (started) return;
    setStarted(true);

    // 1. Blow candles
    setTimeout(() => setBlown(true), 400);
    // 2. Cut cake
    setTimeout(() => setCut(true), 1600);
    // 3. Slice gone
    setTimeout(() => setSliceGone(true), 2600);
    // 4. Penguin appears
    setTimeout(() => { setShowPenguin(true); setPenguinPhase('slice'); }, 3200);
    // 5. Penguin feeds
    setTimeout(() => setPenguinPhase('feed'), 4500);
    // 6. Confetti
    setTimeout(() => {
      triggerConfetti({ particleCount: 100, spread: 80 });
      triggerFireworks();
    }, 4800);
    // 7. Navigate
    setTimeout(() => onNext(), 7500);
  };

  return (
    <PageTransition>
      <div className="cake-page">
        <div className="cake-bg" />
        <FallingPetals count={15} />

        <div className="cake-content">
          {/* Typewriter text */}
          <motion.div
            className="cake-typewriter glass-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="cake-typewriter-text">{displayedText}</span>
            <motion.span
              className="cake-cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >|</motion.span>
          </motion.div>

          {/* Cake + Penguin */}
          <div className="cake-scene">
            <motion.div
              className="cake-svg-wrap"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: 'backOut' }}
            >
              <BirthdayCake blown={blown} cut={cut} sliceGone={sliceGone} />

              {/* Glow under cake */}
              <div className="cake-glow" />
            </motion.div>

            {/* Penguin slides in */}
            <AnimatePresence>
              {showPenguin && (
                <motion.div
                  className="cake-penguin"
                  initial={{ x: 150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'backOut' }}
                >
                  <PenguinFeeding size={120} phase={penguinPhase} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wind animation */}
          {started && !blown && (
            <motion.div
              className="cake-wind"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: [0, 1, 0], x: [-50, 150] }}
              transition={{ duration: 0.6 }}
            >
              💨💨💨
            </motion.div>
          )}

          {/* Button */}
          <AnimatePresence>
            {!started && (
              <motion.button
                className="btn-primary cake-btn"
                onClick={handleBlowCut}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                🕯️ Let's blow out the candles and cut the cake!
              </motion.button>
            )}
          </AnimatePresence>

          {/* Status message */}
          <AnimatePresence>
            {started && (
              <motion.p
                className="cake-status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={penguinPhase}
              >
                {!blown ? '💨 Blowing out the candles...' :
                 !cut ? '🔪 Cutting the cake...' :
                 !showPenguin ? '🍰 Taking a slice...' :
                 penguinPhase === 'slice' ? '🐧 Penguin grabbed a slice!' :
                 '🐧 Feeding you some cake! 😋'}
              </motion.p>
            )}
          </AnimatePresence>

          <LoveCounter />

          {/* Nav */}
          <div className="nav-bar">
            <button className="btn-nav" onClick={onPrev} disabled={started}>← Previous</button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
