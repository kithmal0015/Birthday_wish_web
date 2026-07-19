import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import FallingPetals from '../components/Particles/FallingPetals';
import LoveCounter from '../components/LoveCounter/LoveCounter';
import NextButton from '../components/NextButton/NextButton';
import './MemoriesPage.css';

// 18 photos: expects images in public/images/memories/1.jpg, 2.jpg... 18.jpg
const MEMORIES = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  label: `Memory ${i + 1}`,
  src: `/images/memories/${i + 1}.jpg`,
  fallbackGradient: [
    'linear-gradient(135deg, #FF6B9D, #C44569)',
    'linear-gradient(135deg, #A855F7, #6C3483)',
    'linear-gradient(135deg, #FFD700, #FF8C00)',
    'linear-gradient(135deg, #FF6B9D, #A855F7)',
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
  ][i % 6],
  emoji: ['💕', '🌸', '✨', '❤️', '💖', '🩷', '💫', '⭐', '🎵', '🌹', '🎊', '🥰', '💝', '🌺', '🎶', '💞', '🦋', '🌷'][i],
}));

const PHOTOS_PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(MEMORIES.length / PHOTOS_PER_PAGE);

export default function MemoriesPage({ onNext, onPrev }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [direction, setDirection] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  const goToPage = useCallback((page, dir = 1) => {
    setDirection(dir);
    setCurrentPage((page + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  // Auto-slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToPage(currentPage + 1, 1);
    }, 5500);
    return () => clearInterval(timer);
  }, [currentPage, goToPage]);

  const visiblePhotos = MEMORIES.slice(
    currentPage * PHOTOS_PER_PAGE,
    currentPage * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE
  );

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)',
    }),
  };

  return (
    <PageTransition>
      <div className="memories-page">
        <div className="memories-bg" />
        <FallingPetals count={12} />

        <div className="memories-content">
          {/* Title */}
          <motion.div
            className="memories-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="memories-title">
              📸 Our Beautiful Memories
            </h2>
            <p className="memories-subtitle">
              Every moment with you is my favorite ❤️
            </p>
          </motion.div>

          {/* Photo Grid */}
          <div className="memories-gallery-wrap">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                className="memories-grid"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {visiblePhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    className="memory-card"
                    style={{ background: photo.fallbackGradient }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.07, zIndex: 10 }}
                    onClick={() => setLightboxPhoto(photo)}
                    onHoverStart={() => setHoveredId(photo.id)}
                    onHoverEnd={() => setHoveredId(null)}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.label} 
                      className="memory-card-img"
                      onError={(e) => e.target.style.display = 'none'} 
                    />

                    {/* Glow overlay on hover */}
                    <motion.div
                      className="memory-glow"
                      animate={{ opacity: hoveredId === photo.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Heart on hover */}
                    <AnimatePresence>
                      {hoveredId === photo.id && (
                        <motion.div
                          className="memory-hover-heart"
                          initial={{ scale: 0, y: 10 }}
                          animate={{ scale: 1, y: -10 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          ❤️
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="memories-dots">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                className={`memories-dot ${i === currentPage ? 'active' : ''}`}
                onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>



          <LoveCounter />

          {/* Nav */}
          <div className="nav-bar">
            <button className="btn-nav" onClick={onPrev}>← Previous</button>
            <NextButton onClick={onNext} />
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxPhoto && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxPhoto(null)}
            >
              <motion.div
                className="lightbox-card"
                style={{ background: lightboxPhoto.fallbackGradient }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={e => e.stopPropagation()}
              >
                <img 
                  src={lightboxPhoto.src} 
                  alt={lightboxPhoto.label} 
                  className="lightbox-img" 
                  onError={(e) => e.target.style.display = 'none'}
                />
                <button className="lightbox-close" onClick={() => setLightboxPhoto(null)}>✕</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
