import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// GSAP + ScrollTrigger for scroll-scrubbed motion, Lenis (driven by the GSAP ticker) for smooth wheel scrolling.
export function initMotion({ smooth }) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  let lenis = null, tick = null;
  if (smooth) {
    lenis = new Lenis({ lerp: 0.16, anchors: { offset: -70 } });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
  }
  const ctx = gsap.context(() => {
    const hero = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 };
    gsap.to('.hero-portrait', { yPercent: -8, scale: 0.94, opacity: 0.35, ease: 'none', scrollTrigger: hero });
    gsap.to('.hero-copy', { y: -40, opacity: 0.2, ease: 'none', scrollTrigger: hero });
    const track = document.querySelector('.marquee > div');
    if (track) {
      track.style.animation = 'none';
      const tw = gsap.to(track, { xPercent: -50, ease: 'none', duration: 34, repeat: -1 });
      ScrollTrigger.create({ onUpdate: (self) => gsap.to(tw, { timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6), duration: 0.25, overwrite: true }) });
      ScrollTrigger.addEventListener('scrollEnd', () => gsap.to(tw, { timeScale: 1, duration: 1, overwrite: true }));
    }
  });
  return () => { ctx.revert(); if (tick) gsap.ticker.remove(tick); if (lenis) { lenis.destroy(); window.__lenis = null; } };
}
