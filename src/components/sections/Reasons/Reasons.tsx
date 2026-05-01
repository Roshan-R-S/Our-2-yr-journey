import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { reasonsData } from '../../../data/reasons';
import { Heart, X, Sparkles } from 'lucide-react';

export const Reasons = () => {
  const [activeReason, setActiveReason] = useState<typeof reasonsData[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random positions for the stars
  const [stars, setStars] = useState<{ id: string, x: number, y: number, size: number, delay: number }[]>([]);

  useEffect(() => {
    // To prevent overlaps, we'll use a grid-based approach with random offsets
    const cols = 5;
    const rows = 4;
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;
    
    const newStars = reasonsData.map((reason, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Calculate center of the cell
      const centerX = (col * cellWidth) + (cellWidth / 2);
      const centerY = (row * cellHeight) + (cellHeight / 2);
      
      // Add random offset within the cell (up to 30% of cell size for safety)
      const offsetX = (Math.random() - 0.5) * (cellWidth * 0.6);
      const offsetY = (Math.random() - 0.5) * (cellHeight * 0.6);

      return {
        id: reason.id,
        x: centerX + offsetX,
        y: centerY + offsetY,
        size: Math.random() * 15 + 35,
        delay: Math.random() * 5
      };
    });
    setStars(newStars);
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden min-h-[1000px] flex flex-col items-center">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-accent),transparent_70%)] opacity-20 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <Sparkles size={14} className="text-[var(--color-accent)]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Interactive Galaxy</span>
        </motion.div>
        <h2 className="heading-immersive !text-6xl md:!text-8xl">Galaxy of Reasons</h2>
        <p className="micro-label mt-4">Click the floating stars to find why you are my infinity</p>
      </div>
      
      {/* The Galaxy Area */}
      <div className="relative w-full max-w-5xl h-[700px] z-10">
        {stars.map((star, i) => {
          const reason = reasonsData[i];
          return (
            <motion.button
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1), type: 'spring' }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
              onClick={() => setActiveReason(reason)}
              className="absolute cursor-none group"
              style={{ 
                left: `${star.x}%`, 
                top: `${star.y}%`,
              }}
            >
              {/* Star Core */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: star.delay 
                }}
                className="relative flex items-center justify-center"
              >
                <div 
                  className="rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-500"
                  style={{ width: star.size, height: star.size }}
                >
                  <Heart 
                    size={star.size * 0.4} 
                    className="text-white/40 group-hover:text-white transition-colors"
                    fill={activeReason?.id === star.id ? "currentColor" : "none"} 
                  />
                </div>
                
                {/* Orbital Path (Visual Decor) */}
                <div className="absolute w-[180%] h-[180%] border border-white/5 rounded-full -z-10 group-hover:border-[var(--color-accent)]/20 transition-colors" />
                <div className="absolute w-[140%] h-[140%] border border-white/5 rounded-full -z-10 group-hover:border-[var(--color-accent)]/10 transition-colors" />
                
                {/* Floating Label */}
                <span className="absolute top-full mt-4 text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   {reason.title}
                </span>
              </motion.div>
            </motion.button>
          );
        })}

        {/* Decorative background stars (small dots) */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Reason Modal / Overlay */}
      <AnimatePresence>
        {activeReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveReason(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-card p-12 relative overflow-hidden"
            >
              {/* Modal Background Decor */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-accent)] opacity-10 blur-3xl rounded-full" />
              
              <button 
                onClick={() => setActiveReason(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,78,0,0.3)]">
                  <Heart size={32} className="text-white" fill="currentColor" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-serif mb-6">{activeReason.title}</h3>
                <p className="text-lg text-white/60 leading-relaxed font-sans italic">
                  "{activeReason.description}"
                </p>
                
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[var(--color-accent)]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] font-medium">Reason #{activeReason.id}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
