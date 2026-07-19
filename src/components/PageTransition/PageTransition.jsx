import { motion } from 'framer-motion';

// Direction-aware smooth slide + fade transition
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.01,
    filter: 'blur(4px)',
  },
};

const pageTransition = {
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ width: '100%', minHeight: '100vh', position: 'relative' }}
    >
      {children}
    </motion.div>
  );
}
