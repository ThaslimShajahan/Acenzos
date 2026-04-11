import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoLine from '../assets/logo/logo-acenzos-white.png';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial loading progression
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 4;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete(); 
        }, 600); // Wait a beat at 100% before triggering exit
      }
      setProgress(start);
    }, 80);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="preloader__content">
        <motion.div 
          className="preloader__logo-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={logoLine} alt="Acenzos Studio" className="preloader__logo" />
        </motion.div>
        
        <motion.div 
          className="preloader__counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {progress}%
        </motion.div>
        
        <div className="preloader__bar-container">
          <motion.div 
            className="preloader__bar" 
            animate={{ width: `${progress}%` }} 
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
