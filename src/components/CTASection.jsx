import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CTASection.css';

const ease = [0.16, 1, 0.3, 1];

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="cta-section" id="contact" ref={ref}>
      <div className="cta-inner wrap">

        {/* Header row */}
        <motion.div
          className="cta-hd"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="cta-hd-label">[ Let's Work Together ]</span>
          <div className="cta-hd-line" />
          <span className="cta-hd-avail">
            <span className="cta-avail-dot" />
            Available now
          </span>
        </motion.div>
        
        {/* Ghost number for depth */}
        <span className="gs-num" aria-hidden>06</span>

        {/* Big headline — line-mask reveal with sharp ease */}
        <div className="cta-headline-wrap" aria-hidden>
          <div className="cta-word-row">
            <motion.span
              className="cta-word cta-word--outline"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
            >
              DON'T
            </motion.span>
          </div>
          <div className="cta-word-row">
            <motion.span
              className="cta-word cta-word--filled"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.18 }}
            >
              BE SHY.
            </motion.span>
          </div>
        </div>

        <motion.div
          className="cta-divider"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        />

        {/* Bottom grid */}
        <motion.div
          className="cta-grid"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        >
          <div className="cta-left">
            <p className="cta-sub">
              Commerce architects. AI builders.<br />
              Let's work <em>together.</em>
            </p>
            <div className="cta-btns">
              <a href="mailto:info@acenzos.com" className="cta-btn-primary">
                Start a Project <span className="cta-btn-arrow">↗</span>
              </a>
              <a href="#" className="cta-btn-ghost">Book a Call</a>
            </div>
          </div>

          <div className="cta-right">
            <span className="cta-reach-label">[ Or reach us directly ]</span>
            <a href="mailto:info@acenzos.com" className="cta-email-link">
              <span className="cta-email-text">info@acenzos.com</span>
              <span className="cta-email-line" />
            </a>
            <div className="cta-socials">
              {['Instagram', 'Twitter / X', 'LinkedIn'].map(s => (
                <a key={s} href="#" className="cta-social">{s}</a>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
