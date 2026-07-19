import { motion } from 'framer-motion';

// 4 distinct dance styles
const dances = {
  jump: {
    animate: { y: [0, -40, 0, -25, 0], rotate: [0, 0, 0, 0, 0], scale: [1, 1.1, 1, 1.05, 1] },
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeOut' },
  },
  spin: {
    animate: { rotate: [0, 360], scale: [1, 1.05, 1] },
    transition: { duration: 1.2, repeat: Infinity, ease: 'linear' },
  },
  wave: {
    animate: { x: [0, 8, -8, 8, 0], y: [0, -5, 0, -5, 0] },
    transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
  },
  wiggle: {
    animate: { rotate: [-10, 10, -10, 10, 0], x: [-5, 5, -5, 5, 0] },
    transition: { duration: 0.7, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function PenguinDancing({ size = 110, danceStyle = 'jump', color = '#FF6B9D', style = {} }) {
  const dance = dances[danceStyle] || dances.jump;

  return (
    <motion.div
      style={{ display: 'inline-block', ...style }}
      animate={dance.animate}
      transition={dance.transition}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="60" cy="90" rx="38" ry="44" fill="#1a1a2e" />
        {/* Belly */}
        <ellipse cx="60" cy="95" rx="24" ry="30" fill="white" />
        {/* Face */}
        <circle cx="60" cy="52" r="32" fill="white" />
        {/* Head top */}
        <ellipse cx="60" cy="34" rx="24" ry="20" fill="#1a1a2e" />
        {/* Eyes - happy */}
        <path d="M44 50 Q50 44 56 50" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M64 50 Q70 44 76 50" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Beak */}
        <ellipse cx="60" cy="60" rx="7" ry="5" fill="#FF8C00" />
        {/* Big smile */}
        <path d="M50 66 Q60 75 70 66" stroke="#FF8C00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <ellipse cx="43" cy="57" rx="7" ry="5" fill="rgba(255,107,157,0.5)" />
        <ellipse cx="77" cy="57" rx="7" ry="5" fill="rgba(255,107,157,0.5)" />
        {/* Party hat */}
        <polygon points="60,8 44,34 76,34" fill="url(#danceHat)" />
        <defs>
          <linearGradient id="danceHat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#6C3483" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="34" rx="16" ry="5" fill="#FFD700" />
        <circle cx="60" cy="8" r="5" fill="#FFD700" />
        {/* Tiny stars on hat */}
        <text x="52" y="28" fontSize="8">⭐</text>
        {/* Wings dancing */}
        <motion.g
          animate={{ rotate: danceStyle === 'wave' ? [0, -50, 0, -50, 0] : [0, -20, 0, 20, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ transformOrigin: '22px 85px' }}
        >
          <ellipse cx="22" cy="88" rx="12" ry="26" fill="#1a1a2e" transform="rotate(-15 22 88)" />
        </motion.g>
        <motion.g
          animate={{ rotate: danceStyle === 'wave' ? [0, 50, 0, 50, 0] : [0, 20, 0, -20, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          style={{ transformOrigin: '98px 85px' }}
        >
          <ellipse cx="98" cy="88" rx="12" ry="26" fill="#1a1a2e" transform="rotate(15 98 88)" />
        </motion.g>
        {/* Feet */}
        <ellipse cx="47" cy="133" rx="13" ry="6" fill="#FF8C00" />
        <ellipse cx="73" cy="133" rx="13" ry="6" fill="#FF8C00" />
        {/* Floating hearts */}
        <motion.text
          x="95" y="30" fontSize="14"
          animate={{ y: [30, 0, 30], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
        >❤️</motion.text>
        <motion.text
          x="2" y="35" fontSize="12"
          animate={{ y: [35, 5, 35], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >✨</motion.text>
      </svg>
    </motion.div>
  );
}
