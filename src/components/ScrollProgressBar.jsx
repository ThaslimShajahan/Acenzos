import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'rgba(255,255,255,0.6)',
        scaleX,
        transformOrigin: '0%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ScrollProgressBar;
