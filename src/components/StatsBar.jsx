import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsBar.css';

export const StatsBar = () => null;

const CAPABILITIES = [
  { num: '01', title: 'AI Product Development', desc: 'Redber platform, LLM integration, conversational AI, 24/7 automation pipelines.' },
  { num: '02', title: 'Web Applications',       desc: 'React, Node.js, client portals, internal tools, full-stack engineering.' },
  { num: '03', title: 'UI / UX Design',         desc: 'Design systems, motion, prototyping — interfaces that feel intentional.' },
  { num: '04', title: 'Digital Strategy',       desc: 'Product roadmap, architecture consulting, go-to-market planning.' },
];

const ease      = [0.16, 1, 0.3, 1];
const maskEase  = [0.76, 0, 0.24, 1];

export const AboutSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const titleLines = ['Building', 'software', 'em:that ships.'];

  return (
    <section className="about-section" id="about" ref={ref} data-nav-light>
      {/* Ghost section number — Utility Agency depth effect */}
      <span className="gs-num" aria-hidden>01</span>

      <div className="wrap about-wrap">

        {/* Section header */}
        <motion.div
          className="about-hd"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="about-hd-label">[ Who we are ]</span>
          <div className="about-hd-line" />
          <span className="about-hd-label">2026 —</span>
        </motion.div>

        {/* Main row */}
        <div className="about-body">
          <div className="about-body-left">
            <h2 className="about-title">
              {titleLines.map((line, i) => (
                <div key={i} className="mask-line-wrap about-title-row">
                  <motion.div
                    className="mask-line-inner"
                    initial={{ y: '104%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.9, ease: maskEase, delay: 0.12 + i * 0.1 }}
                  >
                    {line.startsWith('em:')
                      ? <em className="about-title-em">{line.slice(3)}</em>
                      : line}
                  </motion.div>
                </div>
              ))}
            </h2>
          </div>

          <motion.div
            className="about-body-right"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease }}
          >
            <p className="about-desc">
              Acenzos is a product-first digital studio. We build AI-powered platforms and
              custom web applications — including Redber, our in-house conversational AI product.
              Every project is engineered with purpose, shipped with craft.
            </p>

            <div className="about-caps">
              {CAPABILITIES.map((c, i) => (
                <motion.div
                  key={c.num}
                  className="about-cap-row"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.08, ease }}
                >
                  <span className="about-cap-num">{c.num}</span>
                  <div className="about-cap-info">
                    <span className="about-cap-title">{c.title}</span>
                    <span className="about-cap-desc">{c.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="/contact" className="about-cta">
              Start a project →
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default StatsBar;
