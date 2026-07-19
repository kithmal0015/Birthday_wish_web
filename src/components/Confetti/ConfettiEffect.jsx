import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export function triggerConfetti(options = {}) {
  const defaults = {
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF6B9D', '#A855F7', '#FFD700', '#FF8C00', '#C44569', '#6C3483', '#FFD1DC'],
  };
  confetti({ ...defaults, ...options });
}

export function triggerFireworks() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ['#FF6B9D', '#A855F7', '#FFD700', '#FF8C00'];

  const frame = () => {
    if (Date.now() > animationEnd) return;
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
    requestAnimationFrame(frame);
  };
  frame();
}

export function triggerContinuousConfetti(durationMs = 5000) {
  const end = Date.now() + durationMs;
  const colors = ['#FF6B9D', '#A855F7', '#FFD700', '#C44569'];

  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 6,
      angle: Math.random() * 60 + 60,
      spread: 70,
      origin: { x: Math.random(), y: Math.random() * 0.3 },
      colors,
      ticks: 200,
    });
    requestAnimationFrame(frame);
  };
  frame();
}

export default function ConfettiEffect() {
  return null;
}
