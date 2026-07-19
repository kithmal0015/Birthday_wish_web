import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import './MusicPlayer.css';

// Singleton — persists across all page changes
let sound = null;
let isMutedGlobal = false;

export default function MusicPlayer() {
  const [muted, setMuted] = useState(isMutedGlobal);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    // Create Howl instance once
    if (!sound) {
      sound = new Howl({
        src: [`${import.meta.env.BASE_URL}music/birthday-song.mp3`],
        loop: true,          // perfect gapless loop
        volume: 0.6,
        html5: false,        // Web Audio API — better loop (no gap)
        preload: true,
        onplay: () => setPlaying(true),
        onpause: () => setPlaying(false),
        onstop: () => setPlaying(false),
      });
    }

    // Try autoplay immediately
    const tryPlay = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      if (sound && !sound.playing()) {
        sound.play();
      }
    };

    // Auto-play attempt (works on desktop)
    tryPlay();

    // Fallback: first user interaction on mobile
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('keydown', tryPlay, { once: true });

    return () => {
      // Don't destroy — keep playing across page transitions
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('keydown', tryPlay);
    };
  }, []);

  const toggleMute = () => {
    if (!sound) return;

    if (isMutedGlobal) {
      sound.volume(0.6);
      sound.mute(false);
      isMutedGlobal = false;
      setMuted(false);
    } else {
      sound.mute(true);
      isMutedGlobal = true;
      setMuted(true);
    }
  };

  return (
    <button
      className={`music-btn ${muted ? 'muted' : 'playing'} ${playing ? 'is-playing' : ''}`}
      onClick={toggleMute}
      title={muted ? 'Unmute Music' : 'Mute Music'}
      aria-label={muted ? 'Unmute Music' : 'Mute Music'}
    >
      <span className="music-icon">{muted ? '🔇' : '🎵'}</span>
      <span className="music-waves">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
