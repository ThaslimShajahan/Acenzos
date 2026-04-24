import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './BackToTop.css';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="btt-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="btt-track">
            <span className="btt-arrow btt-arrow--primary">↑</span>
            <span className="btt-arrow btt-arrow--secondary">↑</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
