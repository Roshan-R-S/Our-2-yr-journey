import { useScroll, useTransform, motion as framerMotion } from 'motion/react';
import { LenisProvider } from './context/LenisContext';
import { Hero } from './components/sections/Hero/Hero';
import { Soundtrack } from './components/sections/Soundtrack/Soundtrack';
import { VirtualBouquet } from './components/sections/VirtualBouquet/VirtualBouquet';
import { Gallery } from './components/sections/Gallery/Gallery';
import { Reasons } from './components/sections/Reasons/Reasons';
import { Letter } from './components/sections/Letter/Letter';
import { Scene } from './components/three/Scene';
import { CustomCursor } from './components/ui/CustomCursor';

export default function App() {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [0.5, 0]);

  return (
    <LenisProvider>
      <div className="relative min-h-screen">
        <div className="atmosphere-bg" />
        <CustomCursor />
        
        {/* Theme Header */}
        <header className="fixed top-0 left-0 w-full p-10 flex justify-between items-start z-[100] pointer-events-none">
          <div className="font-serif text-[18px] tracking-[2px] uppercase opacity-80 pointer-events-auto">Two Years</div>
          <div className="text-right pointer-events-auto">
            <span className="block text-[11px] uppercase tracking-[3px] opacity-50 mb-1">Time elapsed</span>
            <strong className="font-serif text-[24px] font-normal">730 Days</strong>
          </div>
        </header>


        <Scene />
        
        {/* Theme Scroll Indicator */}
        <framerMotion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] z-[100]"
        >
          <span className="text-[9px] uppercase tracking-[2px]">Scroll to Explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--color-text)] to-transparent"></div>
        </framerMotion.div>

        <main>
          <Hero />
          <Soundtrack />
          <VirtualBouquet />
          <Reasons />
          <Gallery />
          <Letter />
        </main>

        <footer className="py-20 px-6 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto">
            <h4 className="font-serif italic text-3xl mb-4">Forever Yours</h4>
            <p className="text-white/30 text-xs uppercase tracking-widest">Built with love</p>
          </div>
        </footer>
      </div>
    </LenisProvider>
  );
}

