import { useRef, useEffect } from 'react';
import { gsap } from '../../../lib/gsap';

import landscape from '../../../images/landscape.jpg';
import landscape1 from '../../../images/landscape1.jpg';
import snap1 from '../../../images/Snapchat-1013137862.jpg';
import snap2 from '../../../images/Snapchat-13879173.jpg';
import snap3 from '../../../images/Snapchat-14271652.jpg';
import snap4 from '../../../images/Snapchat-676655980.jpg';
import snap5 from '../../../images/Snapchat-87816895.jpg';
import img1 from '../../../images/IMG_20250108_195727.jpg';
import img2 from '../../../images/IMG20250516150453.jpg';

const images = [landscape, landscape1, snap1, snap2, snap3, snap4, snap5, img1, img2];

export const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-immersive text-center mb-20 !text-6xl italic">Moments Captured</h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((url, i) => (
            <div 
              key={i} 
              className="gallery-item glass-card overflow-hidden cursor-pointer group"
            >
              <div className="p-4">
                <div className="aspect-auto overflow-hidden rounded-[12px] mb-4">
                  <img 
                    src={url} 
                    alt={`Memory ${i + 1}`}
                    className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
