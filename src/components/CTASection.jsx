import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CTASection.css';

const CTASection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="cta-section" id="contact" ref={ref}>
      <div className="cta-orb cta-orb--1" />
      <div className="cta-orb cta-orb--2" />

      <div className="cta-wrap">

        {/* ── Top row ── */}
        <motion.div className="cta-toprow" {...fadeUp(0)}>
          <p className="cta-label">
            <span className="cta-label-dot" /> Let's Work Together
          </p>
          <div className="cta-badge">
            <svg className="cta-badge-ring" viewBox="0 0 100 100">
              <defs>
                <path id="cta-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="10.5" fill="rgba(247,247,244,0.4)" letterSpacing="3.2">
              <textPath href="#cta-circle">ACENZOS · EST. 2022 · SHOPIFY · AI ·</textPath>
              </text>
            </svg>
            <span className="cta-badge-icon">✦</span>
          </div>
        </motion.div>

        {/* ── Giant shimmer headline ── */}
        <motion.h2
          className="cta-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Don't be <i>shy.</i>
        </motion.h2>

        {/* ── Divider ── */}
        <motion.div
          className="cta-divider"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── Two-col grid ── */}
        <div className="cta-grid">
          <motion.div className="cta-left" {...fadeUp(0.45)}>
            <p className="cta-sub">
              Shopify experts.<br />
              AI builders.<br />
              Let's work <em>together.</em>
            </p>
            <div className="cta-btns">
              <a href="mailto:hello@acenzos.com" className="cta-btn-primary" id="cta-chat-btn">
                <span>Start a Project</span>
                <span className="cta-btn-arrow">↗</span>
              </a>
              <a href="#" className="cta-btn-ghost" id="cta-meeting-btn">
                Book a Call
              </a>
            </div>
          </motion.div>

          <motion.div className="cta-right" {...fadeUp(0.55)}>
            <span className="cta-contact-label">Or reach us directly</span>
            <a href="mailto:hello@acenzos.com" className="cta-email">
              <span className="cta-email-text">hello@acenzos.com</span>
              <span className="cta-email-underline" />
            </a>
            <div className="cta-social-row">
              {['Instagram', 'Twitter / X', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="cta-social-link">{s}</a>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
