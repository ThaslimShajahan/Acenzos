import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoLine from '../assets/logo/logo-acenzos-white.png';
import './Preloader.css';

const greetings = [
  "Hello", "Bonjour", "Hola", "Ciao", "Olá", 
  "Namaste", "Ahalan", "Privet", "Ni Hao", 
  "Konnichiwa", "Guten Tag", "Hallo", "안녕하세요", "Acenzos"
];

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial loading progression - hold 'Hello' for 1 second first
    let interval;
    const timeout = setTimeout(() => {
      let start = 0;
      interval = setInterval(() => {
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
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
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
          className="preloader__greeting-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="preloader__dot">•</span>
          <h1 className="preloader__greeting-text">
            {greetings[Math.floor((progress / 100) * (greetings.length - 1))]}
          </h1>
        </motion.div>
        
        <div className="preloader__bar-container">
          <motion.div 
            className="preloader__bar" 
            animate={{ width: `${progress}%` }} 
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
