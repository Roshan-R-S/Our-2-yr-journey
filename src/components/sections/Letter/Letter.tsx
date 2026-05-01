import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { RealisticHandwriting } from '../../ui/RealisticHandwriting';

const letterContent = `My Dearest Chlooo,

Looking back at these past two years, I am filled with so much gratitude. Thank you for being my rock, my best friend, and my home. Every day with you is a new adventure, and I wouldn't want to walk this path with anyone else.

Here is to many more years of laughter, growth, and unconditional love. I love you more than words could ever express.

Yours always,
Thangoo ❤️`;

export const Letter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      id="letter" 
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Decorative backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-[4/3] bg-[var(--color-accent)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-4xl glass-card p-12 md:p-24 border border-white/10 shadow-2xl rounded-2xl"
      >
        <div className="mb-16 flex items-center justify-between">
          <span className="micro-label tracking-[0.4em] text-[var(--color-accent)] font-mono uppercase">The Letter</span>
        </div>

        <div className="relative min-h-[500px]">
          {isInView && (
            <RealisticHandwriting 
              text={letterContent}
              speed={350}
              startDelay={800}
              lineDelay={1200}
              className="text-white/90"
            />
          )}
        </div>


        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-white/20" />
             <p className="text-[10px] uppercase tracking-widest text-white/40">Handwritten with love</p>
          </div>
          <p className="text-white/30 italic font-serif text-sm">forever & always</p>
        </div>
      </motion.div>
    </section>
  );
};

