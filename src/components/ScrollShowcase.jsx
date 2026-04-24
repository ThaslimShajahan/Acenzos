import React, { useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import './ScrollShowcase.css';

/* ─── Sphere canvas ─────────────────────────────────── */
const ROWS = 30, COLS = 60, N = ROWS * COLS, FOV_S = 700;
const UV_S = Array.from({ length: N }, (_, idx) => {
  const lat = Math.floor(idx / COLS), lon = idx % COLS;
  const phi   = ((lat + 0.5) / ROWS) * Math.PI;
  const theta = (lon / COLS) * Math.PI * 2;
  return { sinP: Math.sin(phi), cosP: Math.cos(phi), sinT: Math.sin(theta), cosT: Math.cos(theta), theta, phi };
});

function startMiniSphere(canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, R, CX, CY, dpr;
  const setup = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    R = Math.min(W, H) * 0.38; CX = W * 0.5; CY = H * 0.48;
  };
  setup();
  const ro = new ResizeObserver(setup); ro.observe(canvas);
  let rotY = 0, elapsed = 0, last = performance.now(), raf;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    rotY += dt * 0.24; elapsed += dt;
    const cyY = Math.cos(rotY), syY = Math.sin(rotY);
    ctx.clearRect(0, 0, W, H);
    const pts = [];
    for (let i = 0; i < N; i++) {
      const { sinP, cosP, sinT, cosT, theta, phi } = UV_S[i];
      const disp = 0.08 * Math.sin(3 * theta + elapsed * 0.85) * Math.sin(3.2 * phi + elapsed * 0.60)
                 + 0.032 * Math.sin(7 * theta - elapsed * 0.38) * Math.sin(5 * phi + elapsed * 0.68);
      const dr = 1 + disp;
      const sx = dr * sinP * cosT, sy = dr * sinP * sinT, sz = dr * cosP;
      const rx =  sx * cyY + sz * syY;
      const rz = -sx * syY + sz * cyY;
      if (rz * R < -FOV_S * 0.9) continue;
      const scale = FOV_S / (FOV_S + rz * R);
      const rim = Math.pow(1 - Math.min(1, Math.abs(sz)), 2.5);
      pts.push({ px: CX + rx * R * scale, py: CY + sy * R * scale, rz, rim, scale });
    }
    pts.sort((a, b) => a.rz - b.rz);
    for (const p of pts) {
      const depth = Math.min(1, Math.max(0, (p.rz + 1.5) / 2.5));
      const lum = Math.min(255, Math.round(130 + depth * 70 + p.rim * 100));
      const alpha = Math.min(1, (0.10 + depth * 0.40 + p.rim * 0.65) * 0.85);
      const sz = Math.max(0.4, (0.6 + p.rim * 1.5 + depth * 0.3) * p.scale);
      ctx.beginPath();
      ctx.arc(p.px, p.py, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${lum},${lum},${Math.min(255, lum + 5)},${alpha})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); };
}

/* ─── Slide data ─────────────────────────────────────── */
const SLIDES = [
  {
    word: 'Build',
    wordCls: 'ss-word--filled',
    desc: 'Clean code, scalable architecture, AI integrations — shipped on time, every time.',
    cta: '/work',
    ctaLabel: 'View Our Work',
    hasSphere: true,
    charAnim: { index: 4, cls: 'ss-char--anim' }, // animate the 'D'
  },
  {
    word: 'Design',
    wordCls: 'ss-word--filled',
    desc: 'We craft interfaces that feel inevitable — design systems, motion, and experiences built to endure.',
    cta: '/expertise',
    ctaLabel: 'Our Expertise',
    img: '/3d-asset/flower.gif',
  },
  {
    word: 'Ship.',
    wordCls: 'ss-word--filled',
    desc: 'From MVP to production — fast iteration, real users, and results that move the needle.',
    cta: '/contact',
    ctaLabel: 'Start a Project',
    img: '/3d-asset/butterlfy.gif',
    bgCls: 'ss-global-bg--butterfly',
  },
];

/* ─── Slide Mappings with Dead Zones ─────────────────── */
// Dead zones ensure Build fully exits before Design enters, and
// Design fully exits before Ship enters. Zero overlap guaranteed.
const SLIDE_MAPPINGS = [
  // Build: visible from 0 → 0.20, fades out 0.20 → 0.28, completely gone by 0.28
  {
    x:       [0,    0.20, 0.28, 1   ],
    opacity: [1,    1,    0,    0   ],
    scale:   [1,    1,    1.1,  1.1 ],
    y:       [0,    0,    -80,  -80 ],
  },
  // Design: dead zone 0.28→0.32, fades in 0.32→0.42, visible 0.42→0.58, fades out 0.58→0.66
  {
    x:       [0,    0.32, 0.42, 0.58, 0.66, 1   ],
    opacity: [0,    0,    1,    1,    0,    0   ],
    scale:   [0.9,  0.9,  1,    1,    1.1,  1.1 ],
    y:       [80,   80,   0,    0,    -80,  -80 ],
  },
  // Ship: dead zone 0.66→0.70, fades in 0.70→0.80, visible 0.80→1.00
  {
    x:       [0,    0.70, 0.80, 1   ],
    opacity: [0,    0,    1,    1   ],
    scale:   [0.9,  0.9,  1,    1   ],
    y:       [80,   80,   0,    0   ],
  },
];

/* ─── Unified Slide: Background + Text in one container ── */
function Slide({ slide, mapping, scrollYProgress }) {
  const op     = useTransform(scrollYProgress, mapping.x, mapping.opacity);
  const scaleV = useTransform(scrollYProgress, mapping.x, mapping.scale);
  const yV     = useTransform(scrollYProgress, mapping.x, mapping.y);

  // Safely assign active slides a higher z-index and pointer-events
  const zIndex        = useTransform(op, v => (v > 0.05 ? 20 : 1));
  const pointerEvents = useTransform(op, v => (v > 0.05 ? 'auto' : 'none'));

  const wordContent = slide.charAnim
    ? (
      <span className="ss-word-chars">
        {slide.word.split('').map((char, i) => (
          <span
            key={i}
            className={`ss-char${slide.charAnim.index === i ? ` ${slide.charAnim.cls}` : ''}`}
          >
            {char}
          </span>
        ))}
      </span>
    )
    : slide.word;

  return (
    <motion.div
      className="ss-slide"
      style={{
        opacity: op,
        zIndex,
        pointerEvents
      }}
    >
      {/* Background Layer inside the slide */}
      {slide.img && (
        <motion.div
          className={`ss-global-bg${slide.bgCls ? ` ${slide.bgCls}` : ''}`}
        >
          <motion.img
            src={slide.img}
            alt=""
            style={{ scale: scaleV }}
          />
        </motion.div>
      )}

      {/* Text Content Layer */}
      <motion.div
        className="ss-slide-inner wrap"
        style={{ scale: scaleV, y: yV }}
      >
        <div className="ss-word-row">
          <span className={`ss-word ${slide.wordCls}`}>{wordContent}</span>
        </div>
        <div className="ss-meta">
          <p className="ss-desc">{slide.desc}</p>
          <a href={slide.cta} className="ss-cta">
            {slide.ctaLabel} <span className="ss-cta-arrow">→</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Component ─────────────────────────────────────── */
const ScrollShowcase = () => {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  // Manual scroll tracking to bypass Framer Motion container bugs
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The section is 400vh. The scrollable distance is height - viewport height
      const totalScroll = rect.height - windowHeight;
      // How far the top of the section has scrolled past the top of the viewport
      const currentScroll = -rect.top;
      
      let progress = 0;
      if (totalScroll > 0) {
        progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      }
      scrollYProgress.set(progress);
    };

    // Use Lenis if available, otherwise window scroll
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial calculation
    handleScroll();

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollYProgress]);

  /* Sphere fades out well before Ship's butterfly appears */
  const canvasOp = useTransform(scrollYProgress, [0.00, 0.55, 0.65], [1, 1, 0]);

  useEffect(() => {
    if (canvasRef.current) return startMiniSphere(canvasRef.current);
  }, []);

  return (
    <section className="ss-section" ref={sectionRef}>
      <div className="ss-sticky">

        {/* Sphere particle canvas — Always at the bottom */}
        <motion.canvas
          ref={canvasRef}
          className="ss-canvas"
          aria-hidden
          style={{ opacity: canvasOp }}
        />

        {/* Unified Slides: Each contains its own BG and Text */}
        {SLIDES.map((slide, i) => (
          <Slide
            key={`slide-${i}`}
            slide={slide}
            mapping={SLIDE_MAPPINGS[i]}
            scrollYProgress={scrollYProgress}
          />
        ))}

      </div>
    </section>
  );
};

export default ScrollShowcase;
