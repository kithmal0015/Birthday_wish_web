import { motion } from 'framer-motion';

export default function PenguinWalking({ size = 120, style = {} }) {
  return (
    <motion.div
      style={{ display: 'inline-block', ...style }}
      animate={{
        x: ['0%', '10px', '-10px', '0%'],
        rotate: [0, 3, -3, 0],
      }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="60" cy="90" rx="38" ry="44" fill="#1a1a2e" />
        {/* Belly */}
        <ellipse cx="60" cy="95" rx="24" ry="30" fill="white" />
        {/* Face - round white */}
        <circle cx="60" cy="52" r="32" fill="white" />
        {/* Head top */}
        <ellipse cx="60" cy="34" rx="24" ry="20" fill="#1a1a2e" />
        {/* Eyes */}
        <circle cx="50" cy="50" r="6" fill="#1a1a2e" />
        <circle cx="70" cy="50" r="6" fill="#1a1a2e" />
        <circle cx="52" cy="48" r="2" fill="white" />
        <circle cx="72" cy="48" r="2" fill="white" />
        {/* Sparkle eyes */}
        <circle cx="54" cy="47" r="1" fill="white" />
        <circle cx="74" cy="47" r="1" fill="white" />
        {/* Beak */}
        <ellipse cx="60" cy="60" rx="7" ry="5" fill="#FF8C00" />
        {/* Cheek blush */}
        <ellipse cx="44" cy="57" rx="6" ry="4" fill="rgba(255,150,150,0.4)" />
        <ellipse cx="76" cy="57" rx="6" ry="4" fill="rgba(255,150,150,0.4)" />
        {/* Wings */}
        <ellipse cx="22" cy="92" rx="12" ry="26" fill="#1a1a2e" transform="rotate(-15 22 92)" />
        <ellipse cx="98" cy="92" rx="12" ry="26" fill="#1a1a2e" transform="rotate(15 98 92)" />
        {/* Feet */}
        <motion.g
          animate={{ rotate: [0, 15, 0, -15, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ transformOrigin: '50px 132px' }}
        >
          <ellipse cx="47" cy="133" rx="13" ry="6" fill="#FF8C00" />
        </motion.g>
        <motion.g
          animate={{ rotate: [0, -15, 0, 15, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          style={{ transformOrigin: '73px 132px' }}
        >
          <ellipse cx="73" cy="133" rx="13" ry="6" fill="#FF8C00" />
        </motion.g>
        {/* Hearts around */}
        <motion.text x="95" y="30" fontSize="14" animate={{ y: [30, 20, 30], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>🩷</motion.text>
        <motion.text x="5" y="45" fontSize="12" animate={{ y: [45, 35, 45], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>💕</motion.text>
      </svg>
    </motion.div>
  );
}
