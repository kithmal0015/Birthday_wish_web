import React from 'react';
import { motion } from 'framer-motion';
import PenguinWaving from '../Penguin/PenguinWaving';
import './NextButton.css';

export default function NextButton({ onClick, className = 'btn-nav', children = 'Next →', ...props }) {
  return (
    <motion.button className={`${className} next-btn-with-penguin`} onClick={onClick} {...props}>
      {children}
      <div className="next-btn-penguin-wrap">
        <PenguinWaving size={55} />
      </div>
    </motion.button>
  );
}
