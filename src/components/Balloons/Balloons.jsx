import { motion } from 'framer-motion';
import './Balloons.css';

const BALLOON_CONFIGS = [
  { color: '#FF6B9D', x: '8%', delay: 0, size: 55 },
  { color: '#A855F7', x: '18%', delay: 0.8, size: 65 },
  { color: '#FFD700', x: '80%', delay: 0.3, size: 58 },
  { color: '#FF8C00', x: '90%', delay: 1.2, size: 52 },
  { color: '#C44569', x: '35%', delay: 0.6, size: 60 },
  { color: '#6C3483', x: '70%', delay: 1.5, size: 56 },
];

function Balloon({ color, x, delay, size }) {
  return (
    <motion.div
      className="balloon-wrapper"
      style={{ left: x }}
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ y: ['-10vh', '-20vh', '-10vh'], opacity: 1 }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        },
      }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 60 80" fill="none">
        {/* Balloon body */}
        <ellipse cx="30" cy="28" rx="26" ry="28" fill={color} />
        {/* Shine */}
        <ellipse cx="20" cy="18" rx="8" ry="10" fill="rgba(255,255,255,0.25)" />
        {/* Knot */}
        <polygon points="30,56 26,60 34,60" fill={color} />
        {/* String */}
        <path d="M30 60 Q35 68 28 76" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

export default function Balloons({ count = 6 }) {
  const configs = BALLOON_CONFIGS.slice(0, count);
  return (
    <div className="balloons-container">
      {configs.map((cfg, i) => (
        <Balloon key={i} {...cfg} />
      ))}
    </div>
  );
}
