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
        loop: true,          // gapless loop
        volume: 0.6,
        html5: true,         // HTML5 Audio — required for reliable playback on mobile phones (iOS/Android)
        preload: true,
        onplay: () => setPlaying(true),
        onpause: () => setPlaying(false),
        onstop: () => setPlaying(false),
      });
    }

    // Try playing audio (will succeed on interaction if browser blocked autoplay)
    const tryPlay = () => {
      if (sound && !sound.playing() && !isMutedGlobal) {
        sound.play();
      }
    };

    // Auto-play attempt on load (works on desktop)
    tryPlay();

    // On mobile, audio starts on first user touch/click anywhere on screen
    document.addEventListener('touchstart', tryPlay, { passive: true });
    document.addEventListener('click', tryPlay);
    document.addEventListener('keydown', tryPlay);

    return () => {
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
