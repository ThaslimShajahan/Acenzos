import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CTASection.css';

const CTASection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="cta-section" id="contact" ref={ref}>
      <div className="wrap">

        <div className="cta-inner">
          {/* Tag */}
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          >
            Let's Work Together
          </motion.p>

          {/* Headline */}
          <motion.h2
            className="cta-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            Don't be shy.
          </motion.h2>

          {/* Sub */}
          <motion.p
            className="cta-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16,1,0.3,1] }}
          >
            Breakthrough ideas start with a conversation.<br />
            Let's build something remarkable together.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="cta-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16,1,0.3,1] }}
          >
            <a href="mailto:hello@acenzos.com" className="btn btn-dark cta-btn" id="cta-chat-btn">
              Chat with Acenzos <span className="btn-icon">💬</span>
            </a>
            <a href="#" className="btn btn-ghost cta-btn secondary-btn" id="cta-meeting-btn">
              Book a Meeting <span className="btn-icon">📅</span>
            </a>
          </motion.div>

          {/* Email large */}
          <motion.a
            className="cta-email-large"
            href="mailto:hello@acenzos.com"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            hello@acenzos.com
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
