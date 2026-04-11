import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './WorldQuantSection.css';

const EthosData = [
  {
    title:   'Exponential Foresight',
    number:  '01 / 04',
    text:    'We spot industry trends before they permeate the mainstream. We transform them into products that matter — some call it foresight, we call it pattern recognition at scale.',
    bgClass: 'iq-bg-black',
    accent:  '#4f8eff',
  },
  {
    title:   'Full-Stack Support',
    number:  '02 / 04',
    text:    'Brand, marketing, performance, legal, ops, finance, and development. Tech founders need tailored support — a dedicated team from day one.',
    bgClass: 'iq-bg-teal',
    accent:  '#1ed8a0',
  },
  {
    title:   'Financial Stability',
    number:  '03 / 04',
    text:    'Breakthrough thinking should never compete with rent. Focused founders build better products. We handle the scaffolding so you can focus on what matters.',
    bgClass: 'iq-bg-terra',
    accent:  '#ff7a52',
  },
  {
    title:   'Intelligent Iteration',
    number:  '04 / 04',
    text:    'Know what you want to build? Start today. No drawn-out programs or slow-moving curricula. Just ruthless focus on product-market fit and market entry.',
    bgClass: 'iq-bg-grey',
    accent:  '#b97aff',
  },
];

const WorldQuantSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'start 30%'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  // Mouse Spotlight Effect State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
     // Get mouse position relative to the grid
     const rect = e.currentTarget.getBoundingClientRect();
     setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
     });
  };

  return (
    <section className="wqf-section-outer" ref={sectionRef}>
      <motion.div className="wqf-section-inner" style={{ clipPath }}>
        <div className="wqf-container">

          {/* Intro */}
          <div className="wqf-intro-top">
            <div className="wqf-intro-left">
              <p className="wqf-eyebrow">Our Ethos</p>
              <h2 className="wqf-heading">
                Vision Matters.<br />Velocity Wins.
              </h2>
            </div>
            <div className="wqf-intro-right">
              <div className="wqf-desc-container">
                <p className="wqf-description">
                  Our comprehensive platform shifts the odds. With infrastructure that works.
                  With operations driven forward, not under. This isn't an accelerator.
                  It's complete company building, at the speed of potential.
                </p>
                <button className="wqf-join-btn">
                  <span className="wqf-join-btn-inner">Join Us</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="wqf-grid" onMouseMove={handleMouseMove}>
            {EthosData.map((item, i) => (
              <motion.div
                key={i}
                className={`wqf-card ${item.bgClass}`}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
              >
                {/* Interactive Spotlight Glow */}
                <motion.div
                  className="wqf-card-glow"
                  animate={{ background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${item.accent}30 0%, transparent 60%)` }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                  initial="initial"
                />

                {/* Geometric Architect L-Brackets */}
                <div className="wqf-bracket wqf-tl" />
                <div className="wqf-bracket wqf-tr" />
                <div className="wqf-bracket wqf-bl" />
                <div className="wqf-bracket wqf-br" />

                <div className="wqf-card-content">
                  <div className="wqf-header">
                    <h3 className="wqf-title" style={{ '--card-accent': item.accent }}>
                      {item.title}
                    </h3>
                    <span className="wqf-number">{item.number}</span>
                  </div>
                  <p className="wqf-text">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default WorldQuantSection;
