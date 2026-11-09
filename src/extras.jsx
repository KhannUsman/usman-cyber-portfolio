import { useEffect, useRef } from 'react';
import { SPLINE_URL, RIVE_URL } from './config';
import { INTRO_STATE } from './theatreState';

// Theatre.js: a keyframed timeline choreographs the portrait's entrance (lazy-loaded after first paint).
export function TheatreIntro() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = document.querySelector('.dp');
    let off, timer, safety, dead = false;
    const reset = () => { if (el) { el.style.opacity = ''; el.style.transform = ''; } };
    (async () => {
      try {
        const { getProject } = await import('@theatre/core');
        if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('studio')) { (await import('@theatre/studio')).default.initialize(); }
        const project = getProject('Portfolio', { state: INTRO_STATE });
        const sheet = project.sheet('Hero');
        const obj = sheet.object('Portrait', { opacity: 1, scale: 1, rotate: 0 });
        await project.ready;
        if (dead || !el) return;
        off = obj.onValuesChange((v) => { el.style.opacity = v.opacity; el.style.transform = `scale(${v.scale}) rotate(${v.rotate}deg)`; });
        timer = setTimeout(() => sheet.sequence.play({ iterationCount: 1, range: [0, 1.6] }), 2700);
        safety = setTimeout(() => { if (off) off(); reset(); }, 8000);
      } catch (err) { console.warn('Theatre intro skipped:', err); reset(); }
    })();
    return () => { dead = true; clearTimeout(timer); clearTimeout(safety); if (off) off(); reset(); };
  }, []);
  return null;
}

// Spline + Rive: lazy-loaded, shown only when you add your own scene / .riv in src/config.js.
export function Showcase() {
  const sp = useRef(null), rv = useRef(null);
  useEffect(() => {
    let app, rive, dead = false;
    (async () => {
      try {
        if (SPLINE_URL && sp.current) { const { Application } = await import('@splinetool/runtime'); if (dead) return; app = new Application(sp.current); await app.load(SPLINE_URL); }
        if (RIVE_URL && rv.current) { const { Rive } = await import('@rive-app/canvas'); if (dead) return; rive = new Rive({ src: RIVE_URL, canvas: rv.current, autoplay: true }); }
      } catch (err) { console.warn('Interactive lab disabled:', err); }
    })();
    return () => { dead = true; if (app && app.dispose) app.dispose(); if (rive) rive.cleanup(); };
  }, []);
  if (!SPLINE_URL && !RIVE_URL) return null;
  return (
    <section className="showcase shell pad" aria-label="Interactive lab">
      <div className="reveal"><div className="section-label"><span>06</span><i />Interactive lab</div><h2>Built to be touched.</h2></div>
      <div className="showcase-grid reveal">
        {SPLINE_URL && <canvas ref={sp} className="spline" />}
        {RIVE_URL && <canvas ref={rv} width="800" height="800" className="rive" />}
      </div>
    </section>
  );
}
