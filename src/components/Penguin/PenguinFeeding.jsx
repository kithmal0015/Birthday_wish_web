import { motion } from 'framer-motion';

export default function PenguinFeeding({ size = 140, style = {}, phase = 'idle' }) {
  // phase: 'idle' | 'slice' | 'feed'
  return (
    <motion.div
      style={{ display: 'inline-block', ...style }}
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'backOut', delay: 0.3 }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="70" cy="115" rx="44" ry="52" fill="#1a1a2e" />
        {/* Belly */}
        <ellipse cx="70" cy="122" rx="28" ry="36" fill="white" />
        {/* Face */}
        <circle cx="70" cy="62" r="38" fill="white" />
        {/* Head top */}
        <ellipse cx="70" cy="40" rx="28" ry="24" fill="#1a1a2e" />
        {/* Happy eyes */}
        <path d="M52 60 Q60 54 68 60" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M72 60 Q80 54 88 60" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Star sparkle on eyes */}
        <text x="54" y="57" fontSize="8">⭐</text>
        <text x="74" y="57" fontSize="8">⭐</text>
        {/* Beak */}
        <ellipse cx="70" cy="72" rx="8" ry="6" fill="#FF8C00" />
        {/* Big smile */}
        <path d="M58 80 Q70 90 82 80" stroke="#FF8C00" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <ellipse cx="52" cy="69" rx="8" ry="6" fill="rgba(255,107,157,0.5)" />
        <ellipse cx="88" cy="69" rx="8" ry="6" fill="rgba(255,107,157,0.5)" />
        {/* Wings */}
        <ellipse cx="26" cy="118" rx="14" ry="30" fill="#1a1a2e" transform="rotate(-15 26 118)" />
        {/* Right wing holding cake slice */}
        <motion.g
          animate={phase === 'feed'
            ? { rotate: [-20, 10, -20], x: [0, 15, 0] }
            : { rotate: [0, 15, 0] }
          }
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '115px 100px' }}
        >
          <ellipse cx="115" cy="105" rx="14" ry="30" fill="#1a1a2e" transform="rotate(20 115 105)" />
          {/* Cake slice in wing */}
          {(phase === 'slice' || phase === 'feed') && (
            <g transform="translate(118, 80)">
              <polygon points="0,25 -15,0 15,0" fill="#FF8C00" />
              <polygon points="0,25 -15,0 15,0" fill="url(#cakeSliceGrad)" />
              <rect x="-15" y="-8" width="30" height="8" fill="#FF6B9D" rx="2" />
              <text x="-8" y="-1" fontSize="10">🍓</text>
            </g>
          )}
        </motion.g>
        {/* Feet */}
        <ellipse cx="56" cy="166" rx="15" ry="7" fill="#FF8C00" />
        <ellipse cx="84" cy="166" rx="15" ry="7" fill="#FF8C00" />
        <defs>
          <linearGradient id="cakeSliceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        {/* Floating hearts */}
        <motion.text x="115" y="40" fontSize="16"
          animate={{ y: [40, 10, 40], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>❤️</motion.text>
        <motion.text x="5" y="50" fontSize="14"
          animate={{ y: [50, 20, 50], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.7 }}>✨</motion.text>
      </svg>
    </motion.div>
  );
}
