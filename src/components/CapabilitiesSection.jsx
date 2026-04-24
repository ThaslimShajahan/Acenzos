import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { droneStore } from '../droneStore';
import './CapabilitiesSection.css';

const SERVICES = [
  {
    id: 1, num: '01', title: 'AI Product Development',
    desc: 'We build AI-powered products that work in the real world — from Redber AI to custom LLM integrations and 24/7 automation pipelines.',
    tags: ['Redber AI', 'LLM Integration', 'Conversational AI', 'Automation'],
  },
  {
    id: 2, num: '02', title: 'Web Applications',
    desc: 'Scalable, full-stack web applications built to perform under pressure and grow alongside your business. React, Node.js, client portals.',
    tags: ['React', 'Node.js', 'Client Portals', 'Custom UI'],
  },
  {
    id: 3, num: '03', title: 'UI / UX & Design Systems',
    desc: 'Design systems, interaction patterns, and visual identities that make digital ecosystems feel premium at every touchpoint.',
    tags: ['Figma', 'Design Systems', 'Motion', 'Prototyping'],
  },
  {
    id: 4, num: '04', title: 'Digital Strategy',
    desc: 'Product roadmaps, technical architecture, and go-to-market approach — turning ideas into well-scoped, executable plans.',
    tags: ['Product Roadmap', 'Architecture', 'Tech Consulting', 'CRO'],
  },
];

const ease = [0.16, 1, 0.3, 1];

const CapabilitiesSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { droneStore.capSectionVisible = e.isIntersecting; },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => { droneStore.capActiveIndex = activeIdx; });

  return (
    <section className="cap-section" id="capabilities" ref={sectionRef}>
      {/* Ghost section number */}
      <span className="gs-num" aria-hidden>03</span>

      <div className="wrap cap-wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Left column */}
        <div className="cap-left">
          <motion.div
            className="cap-hd"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="cap-hd-label">[ What We Build ]</span>
            <div className="cap-hd-line" />
          </motion.div>

          <h2 className="cap-title">
            {['Products that', 'em:drive results.'].map((line, i) => (
              <div key={i} className="mask-line-wrap" style={{ lineHeight: 'inherit' }}>
                <motion.div
                  className="mask-line-inner"
                  initial={{ y: '104%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 + i * 0.1 }}
                >
                  {line.startsWith('em:')
                    ? <em className="cap-title-em">{line.slice(3)}</em>
                    : line}
                </motion.div>
              </div>
            ))}
          </h2>

          <motion.p
            className="cap-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            Four core disciplines.<br />
            One focused team.
          </motion.p>
        </div>

        {/* Right column: service rows */}
        <div className="cap-right">
          <div className="cap-list">
            {SERVICES.map((svc, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={svc.id}
                  className={`cap-row${isActive ? ' is-active' : ''}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <div className="cap-row-inner">
                    <span className="cap-row-num">{svc.num}</span>
                    <div className="cap-row-content">
                      <span className="cap-row-title">{svc.title}</span>
                      <p className="cap-row-desc">{svc.desc}</p>
                    </div>
                    <span className="cap-row-arrow">→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesSection;
