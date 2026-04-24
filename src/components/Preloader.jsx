import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [count, setCount]       = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 9) + 3;
          if (next >= 100) {
            clearInterval(interval);
            setCount(100);
            setTimeout(onComplete, 700);
            return 100;
          }
          setCount(next);
          return next;
        });
      }, 60);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <motion.div
      className="pl"
      initial={{ opacity: 1 }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
    >
      {/* Logo mark — layoutId lets it fly to the navbar on exit */}
      <motion.div
        className="pl__logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          layoutId="brand-logo"
          src="/logo/logo.svg"
          alt="Acenzos"
          className="pl__logo-img"
        />
      </motion.div>

      {/* Wordmark */}
      <motion.p
        className="pl__wordmark"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        ACENZOS
      </motion.p>

      {/* Bottom row */}
      <div className="pl__bottom">
        <div className="pl__bar-wrap">
          <motion.div
            className="pl__bar"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.08 }}
          />
        </div>
        <span className="pl__count">{String(count).padStart(3, '0')}</span>
      </div>
    </motion.div>
  );
};

export default Preloader;
