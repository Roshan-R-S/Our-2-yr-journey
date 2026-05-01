import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { parseBlob } from 'music-metadata';
import { soundtrackData } from '../../../data/soundtrack';

const formatTime = (s: number) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export const Soundtrack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [covers, setCovers] = useState<Record<number, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = soundtrackData[currentIndex];

  // Extract cover art from all songs once
  useEffect(() => {
    soundtrackData.forEach(async (song, i) => {
      try {
        const res = await fetch(song.src);
        const blob = await res.blob();
        const metadata = await parseBlob(blob);
        const pic = metadata.common.picture?.[0];
        if (pic) {
          const url = URL.createObjectURL(new Blob([pic.data], { type: pic.format }));
          setCovers(prev => ({ ...prev, [i]: url }));
        }
      } catch {}
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentSong.src;
    setCurrentTime(0);
    setDuration(0);
    const onLoaded = () => setDuration(audio.duration);
    audio.addEventListener('loadedmetadata', onLoaded);
    if (isPlaying) audio.play();
    return () => audio.removeEventListener('loadedmetadata', onLoaded);
  }, [currentIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % soundtrackData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + soundtrackData.length) % soundtrackData.length);
  };

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-black/40">
      <audio
        ref={audioRef}
        onEnded={handleNext}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Music size={14} className="text-[var(--color-accent)]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">The Soundtrack of Us</span>
          </motion.div>
          <h2 className="heading-immersive !text-6xl md:!text-8xl">Melodic Memories</h2>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Vinyl Animation */}
          <div className="relative group perspective-1000 w-full max-w-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong.id}
                initial={{ rotateY: -30, opacity: 0, x: -50 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                exit={{ rotateY: 30, opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10"
              >
                {/* Album Cover */}
                <div className="aspect-square w-full bg-white/5 rounded-lg overflow-hidden shadow-2xl border border-white/10 relative z-20">
                  <img src={covers[currentIndex] ?? currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Vinyl Record */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 -right-1/4 w-[80%] aspect-square bg-[#111] rounded-full shadow-2xl border-[8px] border-black flex items-center justify-center -z-10 group-hover:-right-1/3 transition-all duration-700"
                >
                  <div className="w-full h-full rounded-full border border-white/5 flex items-center justify-center">
                    <div className="w-1/3 h-1/3 rounded-full bg-white/5 flex items-center justify-center">
                       <div className="w-4 h-4 rounded-full bg-black" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Details */}
          <div className="flex-1 max-w-md text-center lg:text-left z-20">
            {/* Controls & Progress Integrated */}
            <div className="mt-12 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSong.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-12"
                >
                  <h3 className="text-4xl md:text-5xl font-serif mb-4">{currentSong.title}</h3>
                  <p className="text-[var(--color-accent)] font-mono tracking-widest uppercase mb-4">{currentSong.artist}</p>
                  <p className="text-white/50 leading-relaxed italic text-base lg:text-lg">
                    "{currentSong.description}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Integrated Progress & Controls */}
              <div className="relative pt-10 pb-4">
                {/* Progress Bar background */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                   <div
                     style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                     className="h-full bg-[var(--color-accent)]/40 transition-all duration-300"
                   />
                </div>
                
                {/* Time Labels */}
                <div className="flex justify-between mb-8 font-mono text-[10px] text-white/20 tracking-[0.3em]">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Buttons Centered */}
                <div className="flex items-center justify-center gap-10">
                  <button 
                    onClick={handlePrev} 
                    className="text-white/30 hover:text-[var(--color-accent)] transition-colors cursor-none interactive"
                    aria-label="Previous track"
                  >
                    <SkipBack size={24} />
                  </button>
                  
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 cursor-none interactive group"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? 
                      <Pause size={24} fill="currentColor" /> : 
                      <Play size={24} className="ml-1" fill="currentColor" />
                    }
                  </button>

                  <button 
                    onClick={handleNext} 
                    className="text-white/30 hover:text-[var(--color-accent)] transition-colors cursor-none interactive"
                    aria-label="Next track"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
