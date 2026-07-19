import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import PenguinWaving from '../components/Penguin/PenguinWaving';
import FallingPetals from '../components/Particles/FallingPetals';
import Balloons from '../components/Balloons/Balloons';
import LoveCounter from '../components/LoveCounter/LoveCounter';
import './HappyBirthday.css';

const letterVariants = {
  initial: { opacity: 0, y: 50, rotateX: -90 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
};

const TITLE = 'Happy Birthday Beautiful!';

export default function HappyBirthday({ onNext }) {
  return (
    <PageTransition>
      <div className="hb-page">
        {/* Animated background */}
        <div className="hb-bg" />

        <FallingPetals count={25} />
        <Balloons count={6} />

        {/* Stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="hb-star"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 85}%`,
              fontSize: `${Math.random() * 12 + 8}px`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 3 }}
          >
            ✨
          </motion.div>
        ))}

        <div className="hb-content">
          {/* Penguins */}
          <div className="hb-penguins">
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: 'backOut' }}
            >
              <PenguinWaving size={100} />
            </motion.div>

            <div className="hb-title-wrap">
              {/* Sparkles above */}
              <motion.div
                className="hb-sparkles"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.div>

              {/* Animated letter-by-letter title */}
              <motion.h1 className="hb-title">
                {TITLE.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                      delay: i * 0.05 + 0.3,
                      duration: 0.5,
                      ease: 'backOut',
                    }}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="hb-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                Today is all about you, Nethu 💖
              </motion.p>
            </div>

          </div>

          {/* CTA Glass Card */}
          <motion.div
            className="hb-card glass-card"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2, duration: 0.7, ease: 'backOut' }}
          >
            <div className="hb-emoji-row">
              {['🎂', '🎁', '🎊', '🎉', '🎈'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem' }}
                >
                  {e}
                </motion.span>
              ))}
            </div>

            <p className="hb-card-text">
              I made something special just for you. <br />
              Ready to see your surprise?
            </p>

            <motion.button
              className="btn-primary hb-btn"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{ boxShadow: ['0 4px 20px rgba(255,107,157,0.4)', '0 8px 40px rgba(255,107,157,0.8)', '0 4px 20px rgba(255,107,157,0.4)'] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            >
              🎁 Click for Your Surprise!
            </motion.button>
          </motion.div>

          {/* Love counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="hb-footer"
          >
            <LoveCounter />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
