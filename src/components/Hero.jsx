import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const ease = [0.16, 1, 0.3, 1];

/* ── Floating tech nodes for the isometric grid ── */
const GRID_NODES = [
  { id: 1, label: 'React',      icon: '⚛',  x: 10,  y: 16,  size: 'lg', delay: 0.20, color: '#61dafb' },
  { id: 2, label: 'Node.js',    icon: '⬡',  x: 62,  y: 8,   size: 'md', delay: 0.32, color: '#68a063' },
  { id: 3, label: 'TypeScript', icon: 'TS', x: 82,  y: 26,  size: 'sm', delay: 0.44, color: '#3178c6' },
  { id: 4, label: 'AWS',        icon: '☁',  x: 72,  y: 52,  size: 'md', delay: 0.52, color: '#ff9900' },
  { id: 5, label: 'Figma',      icon: '◈',  x: 5,   y: 58,  size: 'sm', delay: 0.60, color: '#f24e1e' },
  { id: 6, label: 'Next.js',    icon: 'N',  x: 38,  y: 78,  size: 'md', delay: 0.68, color: '#ffffff' },
  { id: 7, label: 'AI / ML',    icon: '✦',  x: 72,  y: 80,  size: 'lg', delay: 0.76, color: '#a855f7' },
  { id: 8, label: 'Docker',     icon: '🐳', x: 22,  y: 36,  size: 'sm', delay: 0.84, color: '#2496ed' },
  { id: 9, label: 'GraphQL',    icon: '◉',  x: 48,  y: 44,  size: 'sm', delay: 0.90, color: '#e535ab' },
];

/* Glass-card node component */
const FloatNode = ({ node }) => {
  const amplitude = node.size === 'lg' ? 16 : node.size === 'md' ? 11 : 7;
  const duration  = 3.5 + node.delay * 1.8;

  return (
    <motion.div
      className={`hero-node hero-node--${node.size}`}
      style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-color': node.color }}
      initial={{ opacity: 0, scale: 0.5, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: [0, -amplitude, 0] }}
      transition={{
        opacity: { delay: node.delay, duration: 0.55, ease: [0.16,1,0.3,1] },
        scale:   { delay: node.delay, duration: 0.55, ease: [0.16,1,0.3,1] },
        y: { delay: node.delay + 0.5, duration, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <span className="hero-node-icon">{node.icon}</span>
      <span className="hero-node-label">{node.label}</span>
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  /* Scroll-linked transforms */
  const textY      = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity= useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gridY      = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const gridScale  = useTransform(scrollYProgress, [0, 0.6], [1, 0.88]);
  const bgOpacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero hero--dark" id="home" ref={ref}>
      {/* Grid lines background */}
      <motion.div className="hero-grid-bg" style={{ opacity: bgOpacity }} />

      {/* ── Left: Text column ── */}
      <motion.div className="hero-content wrap" style={{ y: textY, opacity: textOpacity }}>

        <motion.p
          className="hero-badge hero-badge--dark"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="hero-badge-dot" />
          Software Engineering &amp; Digital Innovation
        </motion.p>

        <motion.h1
          className="hero-heading hero-heading--dark"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          We build<br />
          modern<br />
          <em>platforms.</em>
        </motion.h1>

        <motion.div
          className="hero-sub-row"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.3, ease }}
        >
          <p className="hero-sub hero-sub--dark">
            From concept to deployment — we architect scalable platforms,
            stunning interfaces, and intelligent systems for ambitious companies.
          </p>
          <div className="hero-actions">
            <a href="#work"    className="btn hero-btn hero-btn--primary" id="hero-cta-work">
              View Our Work <span className="btn-arrow">↗</span>
            </a>
            <a href="#contact" className="btn hero-btn hero-btn--ghost"   id="hero-cta-contact">
              Start a Project
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right: Isometric floating grid ── */}
      <motion.div className="hero-iso-wrap" style={{ y: gridY, scale: gridScale }}>
        {/* Grid plane */}
        <div className="hero-iso-plane">
          {/* Connecting lines SVG */}
          <svg className="hero-iso-lines" viewBox="0 0 500 500" fill="none">
            <line x1="250" y1="100" x2="380" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="250" y1="100" x2="140" y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="380" y1="220" x2="290" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="140" y1="260" x2="290" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="380" y1="220" x2="420" y2="310" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="290" y1="360" x2="210" y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            {/* Central star/hub */}
            <motion.circle
              cx="290" cy="230" r="6" fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5"
              animate={{ r: [6, 11, 6], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="290" cy="230" r="14" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="1"
              animate={{ r: [14, 22, 14], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
          </svg>
        </div>

        {/* Floating tech nodes */}
        {GRID_NODES.map(n => <FloatNode key={n.id} node={n} />)}

        {/* Central hub label */}
        <motion.div
          className="hero-hub"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.7, ease }}
        >
          <span className="hero-hub-icon">⬡</span>
          <span className="hero-hub-label">Acenzos</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.span
          className="hero-scroll-line"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
