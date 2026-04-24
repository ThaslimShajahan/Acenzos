import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { droneStore } from '../droneStore';
import './ImmersiveScaleSection.css';

const ease      = [0.16, 1, 0.3, 1];
const maskEase  = [0.76, 0, 0.24, 1];

const ImmersiveScaleSection = () => {
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true, amount: 0.3 });
  const isVisible = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    droneStore.immSectionVisible = isVisible;
    if (!isVisible) {
      document.body.classList.remove('drone-front');
      window.__droneFront = false;
    }
  }, [isVisible]);

  return (
    <section className="imm-section" ref={ref}>
      <span className="gs-num" aria-hidden>05</span>

      <div className="wrap imm-wrap">

        <motion.div
          className="imm-hd"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="imm-hd-label">[ The Acenzos Way ]</span>
          <div className="imm-hd-line" />
        </motion.div>

        {/* Line-mask reveal on each line of the giant title */}
        <h2 className="imm-title">
          {['We ship', 'em:results.'].map((line, i) => (
            <div key={i} className="mask-line-wrap" style={{ lineHeight: 'inherit' }}>
              <motion.div
                className="mask-line-inner"
                initial={{ y: '104%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.0, ease: maskEase, delay: 0.1 + i * 0.14 }}
              >
                {line.startsWith('em:')
                  ? <em className="imm-title-em">{line.slice(3)}</em>
                  : line}
              </motion.div>
            </div>
          ))}
        </h2>

        <motion.p
          className="imm-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease }}
        >
          From AI-powered platforms like Redber to custom web applications — we build software
          with purpose, speed, and a relentless focus on outcomes that matter.
        </motion.p>

        <motion.a
          href="/contact"
          className="imm-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.52, ease }}
        >
          Start a Project →
        </motion.a>

      </div>
    </section>
  );
};

export default ImmersiveScaleSection;
