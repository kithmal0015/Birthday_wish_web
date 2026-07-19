import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CursorEffect from './components/CursorEffect/CursorEffect';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import EasterEgg from './components/EasterEgg/EasterEgg';
import LoadingScreen from './pages/LoadingScreen';
import HappyBirthday from './pages/HappyBirthday';
import CardPage from './pages/CardPage';
import MemoriesPage from './pages/MemoriesPage';
import CakePage from './pages/CakePage';
import FinalPage from './pages/FinalPage';
import './App.css';

const PAGES = ['loading', 'birthday', 'card', 'memories', 'cake', 'final'];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [flash, setFlash] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  const goNext = useCallback(() => {
    setCurrentPage(prev => {
      if (prev >= PAGES.length - 1) return prev;
      triggerFlash();
      return prev + 1;
    });
  }, []);

  const goPrev = useCallback(() => {
    setCurrentPage(prev => {
      if (prev <= 1) return prev; // Can't go back to loading
      triggerFlash();
      return prev - 1;
    });
  }, []);

  // Mobile swipe support
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      // Only trigger if mostly horizontal swipe (not scroll)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
        const page = PAGES[currentPage];
        // Only swipe on pages that have prev/next (not loading, not card's inner state)
        if (page === 'birthday') {
          if (dx < 0) goNext();
        } else if (page === 'memories' || page === 'cake') {
          if (dx < 0) goNext();
          else if (dx > 0) goPrev();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentPage, goNext, goPrev]);

  const page = PAGES[currentPage];

  return (
    <div className="app-root">
      {/* Global always-on components */}
      <CursorEffect />
      {page !== 'loading' && <MusicPlayer />}
      {page !== 'loading' && <EasterEgg />}

      {/* Page transition flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            className="page-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        {page === 'loading' && (
          <LoadingScreen key="loading" onComplete={goNext} />
        )}

        {page === 'birthday' && (
          <HappyBirthday key="birthday" onNext={goNext} />
        )}

        {page === 'card' && (
          <CardPage key="card" onNext={goNext} onPrev={goPrev} />
        )}

        {page === 'memories' && (
          <MemoriesPage key="memories" onNext={goNext} onPrev={goPrev} />
        )}

        {page === 'cake' && (
          <CakePage key="cake" onNext={goNext} onPrev={goPrev} />
        )}

        {page === 'final' && (
          <FinalPage key="final" />
        )}
      </AnimatePresence>
    </div>
  );
}
