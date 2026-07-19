import { motion } from 'framer-motion';

export default function PenguinWaving({ size = 120, style = {}, flip = false }) {
  return (
    <motion.div
      style={{ display: 'inline-block', transform: flip ? 'scaleX(-1)' : 'none', ...style }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="60" cy="90" rx="38" ry="44" fill="#1a1a2e" />
        {/* Belly */}
        <ellipse cx="60" cy="95" rx="24" ry="30" fill="white" />
        {/* Face */}
        <circle cx="60" cy="52" r="32" fill="white" />
        {/* Head top */}
        <ellipse cx="60" cy="34" rx="24" ry="20" fill="#1a1a2e" />
        {/* Eyes - happy squint */}
        <path d="M44 50 Q50 45 56 50" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M64 50 Q70 45 76 50" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Beak */}
        <ellipse cx="60" cy="60" rx="7" ry="5" fill="#FF8C00" />
        {/* Smile */}
        <path d="M52 65 Q60 72 68 65" stroke="#FF8C00" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <ellipse cx="44" cy="57" rx="6" ry="4" fill="rgba(255,150,150,0.4)" />
        <ellipse cx="76" cy="57" rx="6" ry="4" fill="rgba(255,150,150,0.4)" />
        {/* Left wing static */}
        <ellipse cx="22" cy="95" rx="12" ry="24" fill="#1a1a2e" transform="rotate(-15 22 95)" />
        {/* Right wing waving */}
        <motion.g
          animate={{ rotate: [0, -40, 0, -40, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '90px 75px' }}
        >
          <ellipse cx="100" cy="72" rx="12" ry="26" fill="#1a1a2e" transform="rotate(20 100 72)" />
        </motion.g>
        {/* Feet */}
        <ellipse cx="47" cy="133" rx="13" ry="6" fill="#FF8C00" />
        <ellipse cx="73" cy="133" rx="13" ry="6" fill="#FF8C00" />
        {/* Party hat */}
        <polygon points="60,10 45,36 75,36" fill="linear-gradient(#FF6B9D,#A855F7)" />
        <polygon points="60,10 45,36 75,36" fill="url(#hatGrad)" />
        <defs>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="36" rx="15" ry="4" fill="#FFD700" />
        <circle cx="60" cy="10" r="4" fill="#FFD700" />
        {/* Stars around */}
        <motion.text x="0" y="25" fontSize="12" animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>✨</motion.text>
        <motion.text x="100" y="20" fontSize="14" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>🩷</motion.text>
      </svg>
    </motion.div>
  );
}
