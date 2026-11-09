import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { initMotion } from './motion';
import { TheatreIntro, Showcase } from './extras';

const PROFILE = {
  name: 'Muhammad Usman Khan',
  role: 'Computer Science Student',
  university: 'IBA Sukkur',
  email: 'usmankhan.bscsf24@iba-suk.edu.pk',
  github: 'https://github.com/KhannUsman',
  linkedin: 'https://www.linkedin.com/in/khannusman/',
  photo: '/images/usman-khan-portrait.png',
};

const NAV_ITEMS = [
  ['About', '#about'],
  ['Research', '#focus'],
  ['Projects', '#work'],
  ['Toolkit', '#toolkit'],
  ['Contact', '#contact'],
];

const PROJECTS = [
  {
    id: 'memory-vault',
    number: '01',
    category: 'Development',
    type: 'Full-stack application',
    title: 'Memory Vault AI',
    summary: 'A MERN-based personal knowledge space designed around accounts, saved memories and useful activity insights.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    status: 'Academic project',
    accent: 'mint',
    detail: 'Memory Vault AI explores a full-stack workflow: a React interface communicates with an Express/Node.js API, while MongoDB and Mongoose handle persistent data. The feature set discussed for the project includes user login, saved items, favourites, view counts and a compact statistics dashboard.',
    highlights: ['React frontend and reusable UI', 'Express API with MongoDB persistence', 'Login, favourites, views and statistics'],
  },
  {
    id: 'compiler-toolkit',
    number: '02',
    category: 'Systems',
    type: 'Compiler construction',
    title: 'Compiler Construction Toolkit',
    summary: 'A coursework-focused collection of parsing exercises, grammar analysis and top-down parser implementation.',
    stack: ['Java', 'Parsing', 'FIRST / FOLLOW', 'CFG'],
    status: 'Coursework',
    accent: 'blue',
    detail: 'This academic work focuses on the foundations behind language processing: recursive-descent parsing, grammar structure, look-ahead, left factoring, ambiguity, and FIRST/FOLLOW sets. It is a practical way to connect formal grammar rules with working parser code.',
    highlights: ['Recursive-descent parser exercises', 'FIRST and FOLLOW set calculations', 'Grammar analysis and parser debugging'],
  },
  {
    id: 'systems-labs',
    number: '03',
    category: 'Systems',
    type: 'Operating systems labs',
    title: 'Linux & Systems Lab Notes',
    summary: 'Hands-on study of processes, shell pipelines, inter-process communication and core Linux workflows.',
    stack: ['C', 'Linux', 'Bash', 'Processes', 'IPC'],
    status: 'Lab work',
    accent: 'violet',
    detail: 'A structured learning track around operating-system fundamentals and practical Linux usage. Topics include process creation, foreground/background jobs, pipes, named pipes, zombie and orphan processes, process priorities and command-line workflows.',
    highlights: ['Process lifecycle and fork() practice', 'Shell pipelines and command-line tools', 'IPC concepts including pipes and FIFOs'],
  },
  {
    id: 'portfolio',
    number: '04',
    category: 'Development',
    type: 'Personal website',
    title: 'Cybersecurity Portfolio',
    summary: 'A responsive personal space for documenting technical interests, academic work and future research.',
    stack: ['React', 'Vite', 'CSS', 'GitHub'],
    status: 'Current build',
    accent: 'amber',
    detail: 'This website is built as a production-ready static React application. It uses semantic sections, responsive layouts, accessible navigation, project filters, a project detail dialog and direct contact links. It is designed to deploy from GitHub to Netlify or Vercel.',
    highlights: ['Responsive single-page layout', 'Interactive project filters and detail view', 'Git-based deployment workflow'],
  },
];

const FOCUS_AREAS = [
  {
    index: '01',
    icon: 'scan',
    title: 'Malware Analysis',
    description: 'Learning to inspect suspicious files, understand execution behaviour and document findings from a defensive perspective.',
    topics: ['Static triage', 'PE format fundamentals', 'Indicators & behaviour'],
  },
  {
    index: '02',
    icon: 'binary',
    title: 'Reverse Engineering',
    description: 'Building the foundations needed to understand compiled programs, low-level logic and how software behaves internally.',
    topics: ['Assembly fundamentals', 'Control-flow analysis', 'Program internals'],
  },
  {
    index: '03',
    icon: 'radar',
    title: 'Threat Research',
    description: 'Studying threat activity and technical evidence, with an emphasis on clear notes, context and defensive takeaways.',
    topics: ['Threat intelligence', 'Technical documentation', 'Defensive thinking'],
  },
];

const SKILL_GROUPS = [
  { title: 'Programming', note: 'Building blocks', items: ['C++', 'Java', 'Python', 'JavaScript'] },
  { title: 'Web development', note: 'Application layer', items: ['HTML5', 'CSS3', 'React', 'Node.js', 'Express'] },
  { title: 'Data & tooling', note: 'Developer workflow', items: ['MongoDB', 'Mongoose', 'Git', 'GitHub', 'VS Code'] },
  { title: 'Systems & security', note: 'Areas of study', items: ['Linux', 'Bash', 'Malware Analysis', 'Reverse Engineering', 'Threat Research'] },
];

function Icon({ name, size = 18, strokeWidth = 1.8, className = '' }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', className, 'aria-hidden': true };
  const paths = {
    arrowUpRight: <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    arrowLeft: <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.2-.4-3.9 1.5a13.5 13.5 0 0 0-7.1 0C5 1.8 3.8 2.2 3.8 2.2a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.1 6.5 6.1 6.8a3.4 3.4 0 0 0-.9 2.7V22"/></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10M12 7v10"/></>,
    binary: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M14 3h7v7h-7zM3 14h7v7H3z"/></>,
    radar: <><path d="M12 22a10 10 0 1 0-10-10"/><path d="M12 18a6 6 0 1 0-6-6"/><path d="M12 14a2 2 0 1 0-2-2"/><path d="m12 12 7-7"/></>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></>,
    terminal: <><path d="m4 17 6-5-6-5M12 19h8"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  };
  return <svg {...shared}>{paths[name] || paths.arrowUpRight}</svg>;
}

const ROLES = ['Malware analysis', 'Reverse engineering', 'Threat research', 'Secure software'];
const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.items);
const THEMES = [['Matrix', '#19f58a', '25,245,138', '#35d0ff', '53,208,255'], ['Blue team', '#4da3ff', '77,163,255', '#19f5d0', '25,245,208'], ['Red team', '#ff4d6d', '255,77,109', '#ffb347', '255,179,71']];
const BOOT = ['Initialising secure session', 'Loading profile: Muhammad Usman Khan', 'Mounting projects and research notes', 'Access granted'];
const tilt = (e, m = 8) => { const el = e.currentTarget, r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `perspective(900px) rotateX(${(-y * m).toFixed(2)}deg) rotateY(${(x * m).toFixed(2)}deg)`; };
const untilt = (e) => { e.currentTarget.style.transform = ''; };

function useReveal(dep) {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal:not(.in)')];
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return undefined; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

function useTyper(words) {
  const [text, setText] = useState('');
  useEffect(() => {
    let i = 0, j = 0, del = false, id;
    const tick = () => {
      const w = words[i];
      j += del ? -1 : 1;
      setText(w.slice(0, j));
      let d = del ? 35 : 70;
      if (!del && j === w.length) { del = true; d = 1400; } else if (del && j === 0) { del = false; i = (i + 1) % words.length; d = 300; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 500);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

const goTo = (h) => { const l = window.__lenis; if (l) l.scrollTo(h, { offset: -70 }); else window.location.hash = h; };
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${encodeURIComponent('Hello Usman')}`;

function GmailIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.66 0 3-1.34 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.61 1.71L13 23.7V40H6c-1.66 0-3-1.34-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#c62828" d="M3 12.3v3.9l10 7.5V11.2L9.88 8.86A4.3 4.3 0 007.3 8C4.92 8 3 9.92 3 12.3z" />
      <path fill="#fbc02d" d="M45 12.3v3.9l-10 7.5V11.2l3.12-2.34A4.3 4.3 0 0140.7 8C43.08 8 45 9.92 45 12.3z" />
    </svg>
  );
}

const burst = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = e.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  for (let i = 0; i < 16; i++) {
    const d = document.createElement('span'), a = (i / 16) * 6.283, v = 45 + Math.random() * 55;
    d.className = 'spark'; d.style.left = `${x}px`; d.style.top = `${y}px`; d.style.background = i % 2 ? 'var(--cyan)' : 'var(--green)';
    document.body.appendChild(d);
    d.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * v}px), calc(-50% + ${Math.sin(a) * v}px)) scale(0)`, opacity: 0 }], { duration: 650 + Math.random() * 250, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => d.remove();
  }
};

const saveContact = () => {
  const v = `BEGIN:VCARD\nVERSION:3.0\nN:Khan;Muhammad Usman;;;\nFN:Muhammad Usman Khan\nORG:IBA Sukkur\nTITLE:Computer Science Student\nEMAIL:${PROFILE.email}\nURL:${PROFILE.github}\nURL:${PROFILE.linkedin}\nEND:VCARD`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' }));
  a.download = 'Muhammad-Usman-Khan.vcf'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

function Typed() { const t = useTyper(ROLES); return <>{t}</>; }
function Clock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 30000); return () => clearInterval(id); }, []);
  return <>{t.toLocaleTimeString('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' })} PKT</>;
}

function ThreeScene() {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let renderer, raf, io, ro, onTheme, onMove;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50); cam.position.z = 6;
      const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#19f58a';
      const band = (n, size, color) => {
        const pos = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, r = 1.5 + Math.random() * 0.45; pos.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.22, Math.sin(a) * r], i * 3); }
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return new THREE.Points(g, new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
      };
      const a = band(260, 0.035, css('--green')), b = band(90, 0.055, css('--cyan'));
      const spin = new THREE.Group(), tiltG = new THREE.Group();
      spin.add(a, b); tiltG.add(spin); tiltG.rotation.x = 1.1; tiltG.rotation.z = -0.35; scene.add(tiltG);
      const mouse = { x: 0, y: 0 }; let vis = true, last = 0;
      const size = () => { const w = el.clientWidth, h = el.clientHeight; if (w && h) { renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); } };
      onMove = (e) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = (e.clientY / window.innerHeight) * 2 - 1; };
      onTheme = () => { a.material.color.set(css('--green')); b.material.color.set(css('--cyan')); };
      io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
      ro = new ResizeObserver(size);
      io.observe(el); ro.observe(el); size();
      window.addEventListener('mousemove', onMove, { passive: true }); window.addEventListener('themechange', onTheme);
      const loop = (ms) => {
        raf = requestAnimationFrame(loop);
        if (!vis || document.hidden || ms - last < 33) return;
        last = ms;
        spin.rotation.y = ms * 0.00012; tiltG.rotation.y = mouse.x * 0.18; tiltG.rotation.x = 1.1 + mouse.y * 0.08;
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(loop);
    } catch (err) { console.warn('3D halo disabled:', err); }
    return () => {
      cancelAnimationFrame(raf); if (io) io.disconnect(); if (ro) ro.disconnect();
      window.removeEventListener('mousemove', onMove); window.removeEventListener('themechange', onTheme);
      if (renderer) { renderer.dispose(); renderer.domElement.remove(); }
    };
  }, []);
  return <div ref={host} className="dp-gl" aria-hidden="true" />;
}

const COMMANDS = {
  help: () => ['Available: whoami · skills · projects · contact · ls · clear', 'Tip: press Ctrl+K anywhere for the command palette.'],
  whoami: () => ['Muhammad Usman Khan — BS Computer Science, IBA Sukkur', 'Interests: malware analysis, reverse engineering, threat research'],
  skills: () => SKILL_GROUPS.map((g) => `${g.title}: ${g.items.join(', ')}`),
  projects: () => PROJECTS.map((p) => `${p.number}  ${p.title}  [${p.status}]`),
  contact: () => [PROFILE.email, PROFILE.github, PROFILE.linkedin],
  ls: () => ['about/  focus/  work/  toolkit/  contact/  secrets.txt'],
  'cat secrets.txt': () => ['Nice try. Nothing in here but curiosity.'],
  'sudo hire usman': () => ['[sudo] Permission granted.', 'Excellent decision. Run "contact" to reach him.'],
};

function Terminal() {
  const [lines, setLines] = useState([{ t: 'Welcome. Type "help" to see what you can run.' }]);
  const [value, setValue] = useState('');
  const body = useRef(null);
  useEffect(() => { if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [lines]);
  const run = (event) => {
    event.preventDefault();
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;
    setValue('');
    if (cmd === 'clear') { setLines([]); return; }
    const out = COMMANDS[cmd] ? COMMANDS[cmd]() : [`Command not found: ${cmd}. Type "help" for options.`];
    setLines((l) => [...l, { c: cmd }, ...out.map((t) => ({ t }))]);
  };
  return (
    <div className="terminal" onClick={(e) => e.currentTarget.querySelector('input')?.focus({ preventScroll: true })}>
      <div className="terminal__bar"><i /><i /><i /><span>usman@portfolio: ~</span></div>
      <div className="terminal__body" data-lenis-prevent ref={body} aria-live="polite">
        {lines.map((l, i) => (l.c ? <p key={i}><b>usman@sec:~$</b> {l.c}</p> : <p key={i} className="out">{l.t}</p>))}
      </div>
      <form className="terminal__input" onSubmit={run}><b>usman@sec:~$</b><input value={value} onChange={(e) => setValue(e.target.value)} aria-label="Terminal command" spellCheck="false" autoComplete="off" /></form>
    </div>
  );
}

function Scramble({ text }) {
  const [s, setS] = useState(text);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const G = '!<>-_/[]{}=+*^?#01';
    let raf, done = false;
    const run = () => { const t0 = performance.now(); const tick = (now) => { const p = Math.min(1, (now - t0) / 520); const n = Math.floor(p * text.length); setS(text.split('').map((c, i) => (c === ' ' || i < n ? c : G[Math.floor(Math.random() * G.length)])).join('')); if (p < 1) raf = requestAnimationFrame(tick); else setS(text); }; raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !done) { done = true; run(); } }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [text]);
  return <span ref={ref} aria-label={text}>{s}</span>;
}

function Boot({ onDone }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    if (n >= BOOT.length) { const a = setTimeout(() => setOut(true), 500), b = setTimeout(onDone, 950); return () => { clearTimeout(a); clearTimeout(b); }; }
    const t = setTimeout(() => setN(n + 1), 380);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className={`boot${out ? ' boot--out' : ''}`} role="status">
      <div>{BOOT.slice(0, n).map((l, i) => <p key={l} className={i === BOOT.length - 1 ? 'boot-ok' : ''}><span>[ OK ]</span> {l}<i className="caret" /></p>)}</div>
      <button className="boot-skip" onClick={onDone}>Skip intro</button>
    </div>
  );
}

function Palette({ open, onClose, actions }) {
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const ref = useRef(null);
  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => ref.current?.focus(), 30); } }, [open]);
  if (!open) return null;
  const list = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));
  const go = (a) => { onClose(); a.run(); };
  const key = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI((i + 1) % Math.max(list.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((i - 1 + list.length) % Math.max(list.length, 1)); }
    else if (e.key === 'Enter' && list[i]) go(list[i]);
  };
  return (
    <div className="dialog-backdrop" data-lenis-prevent role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="palette" role="dialog" aria-label="Command palette">
        <input ref={ref} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={key} placeholder="Search sections, links and actions…" aria-label="Search commands" />
        <ul>{list.map((a, n) => <li key={a.label}><button className={n === i ? 'on' : ''} onMouseEnter={() => setI(n)} onClick={() => go(a)}><span>{a.label}</span><small>{a.hint}</small></button></li>)}{!list.length && <li className="muted pal-empty">No matching command.</li>}</ul>
      </div>
    </div>
  );
}

function SectionLabel({ index, children }) {
  return <div className="section-label"><span>{index}</span><i />{children}</div>;
}

function ProjectCard({ project, onOpen }) {
  const glow = (e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`); };
  return (
    <article className={`project-card reveal accent-${project.accent}`} onMouseMove={(e) => { glow(e); tilt(e, 4); }} onMouseLeave={untilt}>
      <div className="project-card__path"><span>~/projects/{project.id}</span><em>{project.status}</em></div>
      <h3>{project.title}</h3>
      <div className="project-card__meta">{project.type} · {project.category}</div>
      <p>{project.summary}</p>
      <div className="tag-list">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
      <button className="text-link" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>Open project <Icon name="arrowUpRight" size={16} /></button>
    </article>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open'); };
  }, [project, onClose]);
  if (!project) return null;
  return (
    <motion.div className="dialog-backdrop" data-lenis-prevent role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.section className="project-dialog" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="project-dialog__top"><span>cat ~/projects/{project.id}/README</span><button className="icon-button" onClick={onClose} aria-label="Close project details"><Icon name="close" /></button></div>
        <h2 id="dialog-title">{project.title}</h2>
        <p className="muted">{project.type} · {project.status}</p>
        <p>{project.detail}</p>
        <ul>{project.highlights.map((h) => <li key={h}><Icon name="check" size={16} />{h}</li>)}</ul>
        <div className="tag-list">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
        <p className="muted small">Descriptions reflect academic work and learning tracks, not commercial client deployments.</p>
      </motion.section>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);
  const barRef = useRef(null);
  const [booting, setBooting] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [palette, setPalette] = useState(false);
  const [theme, setTheme] = useState(0);
  const [active, setActive] = useState('');
  const [smooth, setSmooth] = useState(() => { try { return localStorage.getItem('smooth') !== 'off'; } catch { return true; } });
  useEffect(() => initMotion({ smooth }), [smooth]);
  useEffect(() => {
    const [, g, gr, c, cr] = THEMES[theme]; const st = document.documentElement.style;
    st.setProperty('--green', g); st.setProperty('--g', gr); st.setProperty('--cyan', c); st.setProperty('--c', cr); window.dispatchEvent(new Event('themechange'));
  }, [theme]);
  useEffect(() => {
    
    const kd = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((p) => !p); } };
    window.addEventListener('keydown', kd);
    return () => { window.removeEventListener('keydown', kd); };
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    NAV_ITEMS.forEach(([, h]) => { const el = document.querySelector(h); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const filters = ['All', 'Development', 'Systems'];
  const visible = useMemo(() => (activeFilter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter)), [activeFilter]);
  useReveal(activeFilter);

  useEffect(() => {
    const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`; };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    catch { window.prompt('Copy this:', text); }
  };
  const copyEmail = () => copyText(PROFILE.email);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const mv = (e) => { const b = e.target.closest?.('.button'); if (!b) return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 8}px, ${((e.clientY - r.top) / r.height - 0.5) * 6}px)`; };
    const out = (e) => { const b = e.target.closest?.('.button'); if (b) b.style.transform = ''; };
    document.addEventListener('mousemove', mv, { passive: true }); document.addEventListener('mouseout', out);
    return () => { document.removeEventListener('mousemove', mv); document.removeEventListener('mouseout', out); };
  }, []);
  const closeDialog = () => setSelected(null);
  const cycleTheme = () => setTheme((t) => (t + 1) % THEMES.length);
  const actions = [
    ...NAV_ITEMS.map(([l, h]) => ({ label: `Go to ${l}`, hint: 'Section', run: () => goTo(h) })),
    { label: 'Copy email address', hint: 'Contact', run: copyEmail },
    { label: 'Open GitHub profile', hint: 'Link', run: () => window.open(PROFILE.github, '_blank', 'noopener') },
    { label: 'Open LinkedIn profile', hint: 'Link', run: () => window.open(PROFILE.linkedin, '_blank', 'noopener') },
    { label: `Switch theme to ${THEMES[(theme + 1) % THEMES.length][0]}`, hint: 'Appearance', run: cycleTheme },
    { label: smooth ? 'Turn smooth scrolling off' : 'Turn smooth scrolling on', hint: 'Performance', run: () => setSmooth((v) => { try { localStorage.setItem('smooth', v ? 'off' : 'on'); } catch { /* ignore */ } return !v; }) },
  ];

  return (
    <>
      {booting && <Boot onDone={() => setBooting(false)} />}
      <div className="progress" ref={barRef} aria-hidden="true" />
      <TheatreIntro />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Muhammad Usman Khan home"><span className="brand-mark">MUK</span><span className="brand-text"><strong>MUHAMMAD USMAN KHAN</strong><small>CYBERSECURITY PORTFOLIO</small></span></a>
          <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Main navigation">
            {NAV_ITEMS.map(([label, href]) => <a key={href} href={href} className={active === href.slice(1) ? 'is-active' : ''} onClick={closeMenu}>{label}</a>)}
          </nav>
          <button className="search-btn" onClick={() => setPalette(true)} aria-label="Search (Ctrl+K)" title="Search · Ctrl+K"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></button>
          <button className="theme-btn" onClick={cycleTheme} aria-label={`Change theme, current: ${THEMES[theme][0]}`} title={`Theme: ${THEMES[theme][0]}`} />
          <a className="header-cta" href={PROFILE.github} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> GitHub</a>
          <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} size={21} /></button>
        </div>
      </header>

      <main id="main">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <div className="status"><span className="dot" /> System online · Learning in progress</div>
            <h1>I study how software works. <span className="grad" data-t="And how it breaks.">And how it breaks.</span></h1>
            <p className="typer">Exploring: <span><Typed /></span><i className="caret" /></p>
            <p className="hero-description">I'm <strong>Muhammad Usman Khan</strong>, a Computer Science student at IBA Sukkur, working in the space between software development, low-level systems and cybersecurity.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">View my work <Icon name="arrowUpRight" size={17} /></a>
              <a className="button button--ghost" href="#contact">Get in touch <Icon name="arrowRight" size={16} /></a>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="dp">
              <ThreeScene />
              <div className="dp-ring" aria-hidden="true" />
              <div className="dp-photo"><img src={PROFILE.photo} alt="Portrait of Muhammad Usman Khan wearing a light jacket and glasses" fetchPriority="high" /></div>
              <span className="chip chip--a"><Icon name="scan" size={14} /> Malware</span>
              <span className="chip chip--b"><Icon name="binary" size={14} /> Reverse Eng.</span>
              <span className="chip chip--c"><Icon name="radar" size={14} /> Threat Research</span>
            </div>
            <p className="dp-caption">BSCS · IBA Sukkur · Pakistan · <Clock /></p>
          </div>
        </section>

        <section className="strip shell reveal" aria-label="Profile overview">
          {['Computer Science', 'Malware Analysis', 'Reverse Engineering', 'Threat Research'].map((t, i) => <div key={t}><strong>{t}</strong><small>{['Academic foundation', 'Research interest', 'Technical interest', 'Learning direction'][i]}</small></div>)}
        </section>

        <div className="marquee" aria-hidden="true"><div>{[...ALL_SKILLS, ...ALL_SKILLS].map((t, i) => <span key={i}>{t}</span>)}</div></div>

        <section className="about shell pad" id="about">
          <div className="reveal"><SectionLabel index="01">About</SectionLabel>
            <h2><Scramble text="Curiosity is where technical depth begins." /></h2>
            <p className="lead">I'm building a strong foundation in computer science while moving deeper into cybersecurity, especially malware analysis, reverse engineering and threat research.</p>
            <p>I enjoy understanding what happens beneath the interface: how programs are structured, how systems communicate, and how malicious behaviour can be identified and understood. This portfolio is a living record of coursework, projects and the subjects I'm actively exploring.</p>
            <div className="edu"><Icon name="terminal" size={22} /><div><strong>BS Computer Science</strong><small>Institute of Business Administration (IBA), Sukkur</small></div></div>
            <a className="text-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Icon name="arrowUpRight" size={15} /></a>
          </div>
          <div className="reveal"><Terminal /></div>
        </section>

        <section className="focus shell pad" id="focus">
          <div className="reveal"><SectionLabel index="02">Research interests</SectionLabel><h2><Scramble text="Where my attention is focused." /></h2><p className="muted narrow">Active learning directions, not claims of professional specialisation.</p></div>
          <div className="grid3">
            {FOCUS_AREAS.map((a) => (
              <article className="card reveal" key={a.index}>
                <Icon name={a.icon} size={26} />
                <h3>{a.title}</h3><p>{a.description}</p>
                <div className="tag-list">{a.topics.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="work shell pad" id="work">
          <div className="reveal"><SectionLabel index="03">Selected work</SectionLabel><h2><Scramble text="Projects with a purpose." /></h2></div>
          <div className="toolbar reveal"><span className="muted">Showing {visible.length} entries</span>
            <div role="group" aria-label="Filter projects">{filters.map((f) => <button key={f} className={`filter${activeFilter === f ? ' filter--on' : ''}`} onClick={() => setActiveFilter(f)} aria-pressed={activeFilter === f}>{f}</button>)}</div>
          </div>
          <motion.div className="grid2 grid2--projects" layout><AnimatePresence mode="popLayout">{visible.map((p) => <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }}><ProjectCard project={p} onOpen={setSelected} /></motion.div>)}</AnimatePresence></motion.div>
        </section>

        <section className="toolkit shell pad" id="toolkit">
          <div className="reveal"><SectionLabel index="04">Technical toolkit</SectionLabel><h2><Scramble text="Tools are useful. Understanding is better." /></h2></div>
          <div className="grid2">
            {SKILL_GROUPS.map((g) => (
              <div className="card reveal" key={g.title}><small className="muted">{g.note}</small><h3>{g.title}</h3><div className="tag-list">{g.items.map((s) => <span key={s}>{s}</span>)}</div></div>
            ))}
          </div>
        </section>

        <Showcase />

        <section className="contact shell pad" id="contact">
          <div className="contact-box reveal">
            <SectionLabel index="05">Contact</SectionLabel>
            <h2><Scramble text="Let's make good things work." /></h2>
            <p className="muted narrow">Open to connecting with fellow learners, developers and people working across software and cybersecurity.</p>
            <div className="channels" onMouseMove={(e) => { const c = e.target.closest('.channel'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`); }}>
              <div className="channel"><span className="channel__icon"><GmailIcon size={26} /></span><div className="channel__text"><small>Email</small><strong>{PROFILE.email}</strong></div><div className="channel__actions"><a className="mini mini--pri" href={GMAIL} target="_blank" rel="noreferrer">Open in Gmail</a><a className="mini" href={`mailto:${PROFILE.email}`}>Mail app</a><button className="mini" onClick={(e) => { burst(e); copyEmail(); }}>Copy</button></div></div>
              <div className="channel"><span className="channel__icon channel__icon--dark"><Icon name="github" size={22} /></span><div className="channel__text"><small>GitHub</small><strong>github.com/KhannUsman</strong></div><div className="channel__actions"><a className="mini mini--pri" href={PROFILE.github} target="_blank" rel="noreferrer">Open profile</a><button className="mini" onClick={(e) => { burst(e); copyText(PROFILE.github); }}>Copy link</button></div></div>
              <div className="channel"><span className="channel__icon channel__icon--dark"><Icon name="linkedin" size={22} /></span><div className="channel__text"><small>LinkedIn</small><strong>linkedin.com/in/khannusman</strong></div><div className="channel__actions"><a className="mini mini--pri" href={PROFILE.linkedin} target="_blank" rel="noreferrer">Open profile</a><button className="mini" onClick={(e) => { burst(e); copyText(PROFILE.linkedin); }}>Copy link</button></div></div>
            </div>
            <button className="button button--primary button--shine" onClick={(e) => { burst(e); saveContact(); }}>Save all contact details (.vcf)</button>
            <p className="muted small hint">One file with your email, GitHub and LinkedIn, ready to import into any phone or address book.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="shell"><span>© {new Date().getFullYear()} Muhammad Usman Khan</span><a href="#top">Back to top ↑</a></div></footer>
      <AnimatePresence>{selected && <ProjectDialog key={selected.id} project={selected} onClose={closeDialog} />}</AnimatePresence>
      <Palette open={palette} onClose={() => setPalette(false)} actions={actions} />
      <div className={`toast${copied ? ' toast--on' : ''}`} role="status"><Icon name="check" size={15} /> Copied to clipboard</div>
    </>
  );
}

export default App;
