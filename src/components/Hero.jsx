import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Hero.css';

/* ═══════════════════════════════════════════════════════════
   PARTICLE SPHERE — UV grid + organic displacement + rim glow
   ═══════════════════════════════════════════════════════════ */
const ROWS = 42, COLS = 84, N = ROWS * COLS, FOV = 1000;

const UV = Array.from({ length: N }, (_, idx) => {
  const lat = Math.floor(idx / COLS), lon = idx % COLS;
  const phi = ((lat + 0.5) / ROWS) * Math.PI;
  const theta = (lon / COLS) * Math.PI * 2;
  return { phi, theta, sinP: Math.sin(phi), cosP: Math.cos(phi), sinT: Math.sin(theta), cosT: Math.cos(theta) };
});

const SCATTER = UV.map(() => {
  const a = Math.random() * Math.PI * 2;
  const r = 0.6 + Math.pow(Math.random(), 0.5) * 4.6;
  const y = (Math.random() - 0.40) * 4.2;
  return [Math.cos(a) * r, y, Math.sin(a) * r];
});

const BUF = Array.from({ length: N }, () => ({ px: 0, py: 0, rz: 0, rim: 0, alpha: 0, size: 0 }));
const easeIO = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

function startSphereCanvas(canvas, progRef) {
  const ctx = canvas.getContext('2d');
  let W, H, R, CX, CY, dpr;
  const setup = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    R = Math.min(W, H) * 0.31;
    CX = W * 0.5;
    // On mobile the text lives at the bottom ~40% of the viewport.
    // Shift the sphere center into the upper third so they don't overlap.
    CY = W < 768 ? H * 0.36 : H * 0.50;
  };
  setup();
  const ro = new ResizeObserver(setup); ro.observe(canvas);
  let rotY = 0, elapsed = 0, last = performance.now(), raf;

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    rotY += dt * 0.22; elapsed += dt;
    const raw = Math.min(1, Math.max(0, progRef.current));
    const t = easeIO(raw);
    const cyY = Math.cos(rotY), syY = Math.sin(rotY);
    ctx.clearRect(0, 0, W, H);

    if (t > 0.05) {
      const auraR = R * (1.1 + t * 0.75);
      const g0 = ctx.createRadialGradient(CX, CY, R * 0.1, CX, CY, auraR);
      g0.addColorStop(0,   `rgba(255,255,255,${t * 0.08})`);
      g0.addColorStop(0.4, `rgba(200,200,220,${t * 0.04})`);
      g0.addColorStop(1,   'transparent');
      ctx.fillStyle = g0;
      ctx.beginPath(); ctx.arc(CX, CY, auraR, 0, Math.PI * 2); ctx.fill();
      if (t > 0.30) {
        const ct = Math.pow((t - 0.30) / 0.70, 1.5);
        const g1 = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.22);
        g1.addColorStop(0,   `rgba(255,255,255,${ct * 0.40})`);
        g1.addColorStop(0.5, `rgba(220,220,240,${ct * 0.15})`);
        g1.addColorStop(1,   'transparent');
        ctx.fillStyle = g1;
        ctx.beginPath(); ctx.arc(CX, CY, R * 0.22, 0, Math.PI * 2); ctx.fill();
      }
    }

    const fovNow = FOV + (1 - t) * 2400;
    for (let i = 0; i < N; i++) {
      const { phi, theta, sinP, cosP, sinT, cosT } = UV[i];
      const sc = SCATTER[i];
      const disp = 0.092 * Math.sin(3.0 * theta + elapsed * 0.90) * Math.sin(3.4 * phi + elapsed * 0.65)
                 + 0.045 * Math.sin(8.2 * theta - elapsed * 0.42) * Math.sin(6.1 * phi + elapsed * 0.78)
                 + 0.018 * Math.sin(14  * theta + elapsed * 0.30);
      const dr = 1 + disp * t;
      const sx = dr * sinP * cosT, sy = dr * sinP * sinT, sz = dr * cosP;
      const x0 = sx * t + sc[0] * (1 - t), y0 = sy * t + sc[1] * (1 - t), z0 = sz * t + sc[2] * (1 - t);
      const rx =  x0 * cyY + z0 * syY, rz = -x0 * syY + z0 * cyY;
      if (rz * R < -fovNow * 0.9) { BUF[i].alpha = 0; continue; }
      const scale = fovNow / (fovNow + rz * R);
      BUF[i].px = CX + rx * R * scale; BUF[i].py = CY + y0 * R * scale;
      BUF[i].rz = rz; BUF[i].rim = Math.pow(1 - Math.min(1, Math.abs(sz)), 2.8);
      BUF[i].alpha = t > 0.02 ? 1 : Math.max(0, t * 50); BUF[i].size = scale;
    }
    BUF.sort((a, b) => a.rz - b.rz);

    for (let k = 0; k < N; k++) {
      const p = BUF[k];
      if (p.alpha === 0) continue;
      const depth = Math.min(1, Math.max(0, (p.rz + 1.5) / 2.5));
      const base = Math.round(140 + depth * 60);
      const lum = Math.min(255, base + Math.round(p.rim * 115));
      const baseA = 0.12 + depth * 0.45, rimA = p.rim * 0.75;
      const totalA = Math.min(1, (baseA + rimA) * (0.15 + t * 0.85)) * p.alpha;
      const sz = Math.max(0.5, (0.7 + p.rim * 1.6 + depth * 0.4) * p.size * (0.5 + t * 0.5));
      ctx.beginPath();
      ctx.arc(p.px, p.py, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${lum},${lum},${Math.min(255, lum + 6)},${totalA})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
}

/* ─── Hero component ─────────────────────────────────────── */
const ease = [0.12, 1, 0.2, 1];
const charEase = [0.76, 0, 0.24, 1];

const STATIC_WORDS = [
  { text: 'WE',      cls: 'hw-label',  chars: false },
  { text: 'BUILD',   cls: 'hw-giant',  chars: true  },
  { text: 'DIGITAL', cls: 'hw-serif',  chars: false },
];

const CYCLING_WORDS = ['FUTURES.', 'PRODUCTS.', 'PLATFORMS.'];

const TAGLINES = [
  'From concept to launch, we craft experiences that scale and perform.',
  'AI-powered platforms and custom web applications — built with purpose.',
  'Precision engineering meets thoughtful design — shipped with craft.',
  'We build products that matter. Fast, clean, and built to last.',
];

const Hero = () => {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const progRef    = useRef(0);
  const [tagIdx, setTagIdx]     = useState(0);
  const [wordIdx, setWordIdx]   = useState(0);

  useEffect(() => {
    const idT = setInterval(() => setTagIdx(i => (i + 1) % TAGLINES.length), 2800);
    const idW = setInterval(() => setWordIdx(i => (i + 1) % CYCLING_WORDS.length), 2400);
    return () => { clearInterval(idT); clearInterval(idW); };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  useEffect(() => scrollYProgress.on('change', v => { progRef.current = v; }), [scrollYProgress]);
  useEffect(() => { if (canvasRef.current) return startSphereCanvas(canvasRef.current, progRef); }, []);

  const contentOpacity = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0.60, 1.00], [0, -50]);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-sticky">

        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-overlay" />
        <div className="hero-grid" />

        <motion.div
          className="hero-inner wrap"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* ── Left column: headline + rotating tagline ── */}
          <div className="hero-left">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="hero-badge-dot" />
              <span style={{ position: 'relative', zIndex: 2 }}>Commerce Architecture · Applied AI</span>
            </motion.div>

            <div className="hero-stack" aria-label="We build digital futures.">
              {STATIC_WORDS.map((w, i) => (
                <div key={w.text} className="hw-row">
                  {w.chars ? (
                    <div className={`hw ${w.cls}`} aria-hidden>
                      {w.text.split('').map((char, ci) => (
                        <motion.span
                          key={ci}
                          className="hw-char"
                          initial={{ y: '110%' }}
                          animate={{ y: '0%' }}
                          transition={{ duration: 0.95, delay: 0.14 + i * 0.1 + ci * 0.05, ease: charEase }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    <motion.span
                      className={`hw ${w.cls}`}
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.0, delay: 0.14 + i * 0.1, ease }}
                    >
                      {w.text}
                    </motion.span>
                  )}
                </div>
              ))}

              {/* Last word cycles: FUTURES. → PRODUCTS. → PLATFORMS. */}
              <div className="hw-row hw-row--cycle">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    className="hw hw-outline"
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: '0%',   opacity: 1 }}
                    exit={{    y: '-60%', opacity: 0 }}
                    transition={{ duration: 0.65, ease: charEase }}
                  >
                    {CYCLING_WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Rotating tagline — right under FUTURES. */}
            <motion.div
              className="hero-tagline-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={tagIdx}
                  className="hero-tagline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.50, ease: [0.16, 1, 0.3, 1] }}
                >
                  {TAGLINES[tagIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Right column: just buttons ── */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          >
            <div className="hero-actions">
              <a href="/work" className="hero-btn hero-btn--primary">
                Our Work
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/contact" className="hero-btn hero-btn--ghost">Start a Project</a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="hero-scroll-line"
            animate={{ scaleY: [1, 0.2, 1], opacity: [0.7, 0.1, 0.7] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="hero-scroll-txt">Scroll</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
