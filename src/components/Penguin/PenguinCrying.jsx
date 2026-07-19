import { motion } from 'framer-motion';

export default function PenguinCrying({ size = 130, style = {} }) {
  return (
    <motion.div
      style={{ display: 'inline-block', ...style }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
    >
      <motion.div
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      >
        <svg width={size} height={size * 1.2} viewBox="0 0 120 145" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <ellipse cx="60" cy="92" rx="38" ry="44" fill="#1a1a2e" />
          {/* Belly */}
          <ellipse cx="60" cy="97" rx="24" ry="30" fill="white" />
          {/* Face */}
          <circle cx="60" cy="52" r="32" fill="white" />
          {/* Head top */}
          <ellipse cx="60" cy="34" rx="24" ry="20" fill="#1a1a2e" />
          {/* Sad eyes (X eyes) */}
          <text x="42" y="56" fontSize="16" fill="#1a1a2e" fontWeight="bold">×</text>
          <text x="62" y="56" fontSize="16" fill="#1a1a2e" fontWeight="bold">×</text>
          {/* Beak */}
          <ellipse cx="60" cy="62" rx="7" ry="5" fill="#FF8C00" />
          {/* Sad mouth */}
          <path d="M52 70 Q60 64 68 70" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Cheeks */}
          <ellipse cx="44" cy="59" rx="6" ry="4" fill="rgba(255,150,150,0.4)" />
          <ellipse cx="76" cy="59" rx="6" ry="4" fill="rgba(255,150,150,0.4)" />
          {/* Wings drooping */}
          <ellipse cx="22" cy="100" rx="12" ry="26" fill="#1a1a2e" transform="rotate(20 22 100)" />
          <ellipse cx="98" cy="100" rx="12" ry="26" fill="#1a1a2e" transform="rotate(-20 98 100)" />
          {/* Feet */}
          <ellipse cx="47" cy="135" rx="13" ry="6" fill="#FF8C00" />
          <ellipse cx="73" cy="135" rx="13" ry="6" fill="#FF8C00" />
          {/* Tears */}
          <motion.ellipse
            cx="47" cy="60"
            rx="3" ry="5"
            fill="#6EC6FF"
            animate={{ cy: [60, 80, 100], opacity: [1, 0.7, 0], ry: [5, 7, 3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.ellipse
            cx="73" cy="60"
            rx="3" ry="5"
            fill="#6EC6FF"
            animate={{ cy: [60, 80, 100], opacity: [1, 0.7, 0], ry: [5, 7, 3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />
          {/* Cry drops */}
          <motion.text x="20" y="70" fontSize="14"
            animate={{ y: [70, 110], opacity: [1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>
            💧
          </motion.text>
          <motion.text x="90" y="65" fontSize="14"
            animate={{ y: [65, 105], opacity: [1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}>
            💧
          </motion.text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
