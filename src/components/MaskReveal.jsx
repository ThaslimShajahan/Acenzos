import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

const E = [0.76, 0, 0.24, 1]; // Sharp deceleration — Utility Agency signature

/* ─── Line Mask Reveal ─────────────────────────────────────────
   Wraps content in overflow:hidden; translates from y=104% → 0%.
   Creates the "text grows from the floor" editorial effect.
   ─────────────────────────────────────────────────────────────── */
export const MaskLine = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  return (
    <Tag ref={ref} className={`mask-line-wrap${className ? ' ' + className : ''}`}>
      <motion.div
        className="mask-line-inner"
        initial={{ y: '104%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 0.88, ease: E, delay }}
      >
        {children}
      </motion.div>
    </Tag>
  );
};

/* ─── Character Stagger ────────────────────────────────────────
   Splits text into individual characters, each animating in with
   a small stagger offset. Webandcrafts signature effect.
   ─────────────────────────────────────────────────────────────── */
export const CharStagger = ({ text, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ y: '80%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.045, ease: E }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};
