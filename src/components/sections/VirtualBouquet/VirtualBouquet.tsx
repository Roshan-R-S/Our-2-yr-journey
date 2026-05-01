import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower, X, Heart } from 'lucide-react';
import { dreamsData } from '../../../data/dreams';

export const VirtualBouquet = () => {
  const [activeDream, setActiveDream] = useState<typeof dreamsData[0] | null>(null);

  return (
    <section className="py-32 px-6 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <h2 className="heading-immersive !text-6xl md:!text-8xl">Virtual Bouquet</h2>
        <p className="micro-label mt-4">Pick a flower to reveal a dream I have for us</p>
      </div>

      {/* The Garden */}
      <div className="relative w-full max-w-5xl h-[600px] flex items-end justify-center gap-8 md:gap-20 pb-20">
        {dreamsData.map((dream, i) => (
          <motion.button
            key={dream.id}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.8, type: 'spring' }}
            whileHover={{ y: -20, scale: 1.05 }}
            onClick={() => setActiveDream(dream)}
            className="group relative cursor-none interactive"
          >
            {/* Stem */}
            <div 
              style={{ height: `${250 + (i % 2) * 80}px` }}
              className="w-[2px] bg-emerald-500/30 mx-auto rounded-full origin-bottom group-hover:bg-emerald-500/50 transition-colors"
            >
              {/* Leaf */}
              <div className="absolute top-1/2 left-0 w-8 h-4 bg-emerald-500/20 rounded-full -rotate-45 -translate-x-full" />
              <div className="absolute top-1/3 right-0 w-8 h-4 bg-emerald-500/20 rounded-full rotate-45 translate-x-full" />
            </div>

            {/* Flower Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${dream.color} blur-[10px] opacity-60 group-hover:opacity-100 transition-opacity`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flower size={48} className="text-white group-hover:scale-125 transition-transform" />
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">{dream.flower}</span>
            </div>
          </motion.button>
        ))}

        {/* Grass / Ground Decor */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
      </div>

      {/* Dream Overlay */}
      <AnimatePresence>
        {activeDream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-6 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveDream(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl min-h-[550px] flex flex-col items-center justify-center glass-card p-12 overflow-hidden text-center relative"
            >
              <button 
                onClick={() => setActiveDream(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${activeDream.color} flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(255,255,255,0.1)]`}
              >
                <Flower size={64} className="text-white" />
              </motion.div>

              <h3 className="text-[11px] uppercase tracking-[0.5em] text-white/40 mb-6">A Dream for Us</h3>
              <p className="text-3xl md:text-4xl font-serif italic mb-10 leading-relaxed">
                "{activeDream.description}"
              </p>

              <div className="flex justify-center gap-2">
                <Heart size={14} className="text-[var(--color-accent)] fill-current" />
                <Heart size={14} className="text-[var(--color-accent)] fill-current" />
                <Heart size={14} className="text-[var(--color-accent)] fill-current" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
