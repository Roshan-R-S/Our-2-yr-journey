import React, { useEffect, useState, useRef } from 'react';

export const useTegaki = (text: string, options: { speed?: number; delay?: number } = {}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDisplayText('');
    
    let currentIndex = 0;
    const { speed = 50, delay = 0 } = options;
    
    const animate = () => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        currentIndex++;
        timeoutRef.current = setTimeout(animate, speed + Math.random() * 20); // Add slight randomness for realistic feel
      } else {
        setIsAnimating(false);
      }
    };
    
    timeoutRef.current = setTimeout(animate, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { displayText, startAnimation, isAnimating };
};
