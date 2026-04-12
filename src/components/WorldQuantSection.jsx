import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './WorldQuantSection.css';

const EthosData = [
  {
    title:   'Shopify First',
    number:  '01 / 04',
    text:    'Shopify powers over $700B in commerce. We\'re Shopify experts — building custom storefronts, app integrations, and headless experiences that drive real revenue for our clients.',
    bgClass: 'iq-bg-black',
    accent:  '#96bf48',
  },
  {
    title:   'Products We Own',
    number:  '02 / 04',
    text:    'We don\'t just build for clients. Redber AI is our own in-house product — an AI receptionist that helps businesses capture leads and automate customer support around the clock.',
    bgClass: 'iq-bg-teal',
    accent:  '#4f46e5',
  },
  {
    title:   'Speed to Market',
    number:  '03 / 04',
    text:    'We move fast without cutting corners. Our internal frameworks and Shopify expertise let us go from brief to live storefront in weeks, not months — giving clients a real competitive edge.',
    bgClass: 'iq-bg-terra',
    accent:  '#ff7a52',
  },
  {
    title:   'Long-Term Partners',
    number:  '04 / 04',
    text:    'We don\'t hand off and disappear. Our clients stay with us because we stay invested — iterating, improving, and growing alongside their business on an ongoing basis.',
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

  // Removed clipPath to prevent backdrop-filter isolation

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
      <div className="wqf-section-inner">
        <div className="wqf-container">

          {/* Intro */}
          <div className="wqf-intro-top">
            <motion.div 
              className="wqf-intro-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="wqf-eyebrow">Our Approach</p>
              <h2 className="wqf-heading">
                Build Fast.<br />Ship Smart.
              </h2>
            </motion.div>
            <motion.div 
              className="wqf-intro-right"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="wqf-desc-container">
                <p className="wqf-description">
                  We believe great software is the difference between a business that survives
                  and one that dominates. Whether it's a Shopify store or an AI product,
                  we build with intention, speed, and a relentless focus on real outcomes.
                </p>
                <button className="wqf-join-btn">
                  <span className="wqf-join-btn-inner">Our Work</span>
                </button>
              </div>
            </motion.div>
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
      </div>
    </section>
  );
};

export default WorldQuantSection;
