import { gsap } from './index';

export const fadeIn = (element: string | HTMLElement, delay: number = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 1,
    delay,
    ease: 'power3.out'
  });
};

export const staggerReveal = (elements: string | HTMLElement[], delay: number = 0) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.2,
    delay,
    ease: 'power4.out'
  });
};
