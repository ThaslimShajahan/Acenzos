import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './RisingWordmark.css';

/**
 * RisingWordmark
 * - Letters rise when scrolled INTO view (from the bottom)
 * - Letters DROP when scrolled BACK OUT (scroll up past the element)
 * - Fully bidirectional — exactly like Sohub's GSAP ScrollTrigger footer SVG
 *
 * Props:
 *   text       string   — "ACENZOS"
 *   fromColor  string   — colour when hidden (below clip)
 *   toColor    string   — colour when fully risen
 *   className  string
 *   stagger    number   — delay between letters (s)
 *   delay      number   — initial delay before first letter
 */
const RisingWordmark = ({
  text      = 'ACENZOS',
  fromColor = 'rgba(0,0,0,0)',
  toColor   = '#0a0a0a',
  className = '',
  stagger   = 0.06,
  delay     = 0,
}) => {
  const wrapRef = useRef(null);
  const controls = useAnimation();
  const letters   = text.split('');
  const prevY     = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const rise = () =>
      controls.start(i => ({
        y: '0%',
        color: toColor,
        transition: {
          y:     { duration: 1.0, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] },
          color: { duration: 0.5, delay: delay + i * stagger + 0.5, ease: 'easeOut' },
        },
      }));

    const drop = () =>
      controls.start(i => ({
        y: '110%',
        color: fromColor,
        transition: {
          y:     { duration: 0.6, delay: (letters.length - 1 - i) * (stagger * 0.6), ease: [0.4, 0, 1, 1] },
          color: { duration: 0.2, ease: 'easeIn' },
        },
      }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentY = entry.boundingClientRect.top;
        const scrollingDown = prevY.current === null || currentY < prevY.current;
        prevY.current = currentY;

        if (entry.isIntersecting) {
          isVisible.current = true;
          rise();
        } else {
          // Only drop if scrolling back UP (element went out of view from the top)
          if (!scrollingDown) {
            isVisible.current = false;
            drop();
          }
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);   // eslint-disable-line

  return (
    <div ref={wrapRef} className={`rising-wordmark ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <span key={i} className="rising-letter-clip">
          <motion.span
            className="rising-letter"
            custom={i}
            animate={controls}
            initial={{ y: '110%', color: fromColor }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default RisingWordmark;
