import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsBar.css';

const stats = [
  { value: '60+',  label: 'Projects Delivered' },
  { value: '3+',   label: 'Years in Business' },
  { value: '30+',  label: 'Happy Clients' },
  { value: '100%', label: 'Client Satisfaction' },
];

const about = [
  'Shopify Store Development & Customization',
  'Custom Web & Mobile Application Development',
  'AI Products & Automation (Redber AI)',
  'Brand Identity & UI/UX Design',
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
              Building software that{' '}
              <span className="text-muted">actually ships.</span>
            </h2>
          </motion.div>
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            <p className="about-desc">
              Acenzos is a product-first technology company based in Kerala, India. We build
              Shopify-powered e-commerce experiences for global brands and develop in-house
              software products — including Redber, our AI communication platform.
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
