import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsBar.css';

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '8+',   label: 'Years of Excellence' },
  { value: '50+',  label: 'Happy Clients' },
  { value: '98%',  label: 'Client Satisfaction' },
];

const about = [
  'Product Strategy & UX Research',
  'Design Systems & Brand Identity',
  'Full-Stack Web & Mobile Development',
  'AI Integration & Automation',
];

export const StatsBar = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section className="statsbar" ref={ref}>
      <div className="wrap statsbar-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="statsbar-item"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
          >
            <span className="statsbar-value">{s.value}</span>
            <span className="statsbar-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const AboutSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="wrap">
        <div className="about-inner">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16,1,0.3,1] }}
          >
            <p className="eyebrow">Who We Are</p>
            <h2 className="h-xl about-heading">
              Building the future of digital,{' '}
              <span className="text-muted">one product at a time.</span>
            </h2>
          </motion.div>
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            <p className="about-desc">
              Acenzos is a full-service digital engineering studio. We partner with
              ambitious companies to design, build, and launch products that people love —
              from early-stage startups to global enterprises.
            </p>
            <div className="about-list">
              {about.map((item, i) => (
                <div key={i} className="about-list-item">
                  <span className="about-list-num">0{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
            <a href="#contact" className="about-cta">
              Let's build together →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
