import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from '../../../lib/gsap';
import { useTegaki } from '../../../hooks/useTegaki';
import SplitType from 'split-type';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { displayText, startAnimation } = useTegaki("To my favorite person", { delay: 1500, speed: 80 });

  useEffect(() => {
    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: 'chars' });
      
      gsap.from(split.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.5
      });
    }

    startAnimation();

    // Mouse parallax for the floating circles
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.parallax-layer', {
        x: (i) => xPos * (i + 1) * 0.5,
        y: (i) => yPos * (i + 1) * 0.5,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="parallax-layer absolute top-[20%] left-[15%] w-64 h-64 bg-[var(--color-accent)] opacity-[0.05] blur-[80px] rounded-full" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="parallax-layer absolute bottom-[25%] right-[10%] w-96 h-96 bg-rose-500 opacity-[0.03] blur-[100px] rounded-full" 
        />
        <motion.div 
          style={{ y: y1 }}
          className="parallax-layer absolute top-[60%] left-[50%] w-32 h-32 bg-orange-400 opacity-[0.04] blur-[60px] rounded-full" 
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto text-center z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="micro-label mb-8"
        >
          Two Years — 730 Days in bloom
        </motion.p>
        
        <h1 
          ref={titleRef}
          className="heading-immersive !text-6xl md:!text-8xl"
        >
          Our<br />Infinity
        </h1>
        
        <div className="mt-8">
          <p className="handwritten text-3xl md:text-4xl text-white/80">
            together
          </p>
        </div>
      </motion.div>
    </section>
  );
};
