import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './MobileMenu.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Expertise', path: '/expertise' },
  { label: 'Studio', path: '/studio' },
  { label: 'Contact', path: '/contact' },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-side-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="mobile-side-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-side-header">
              <button className="mobile-close-btn" onClick={onClose} aria-label="Close menu">
                &times;
              </button>
            </div>
            
            <nav className="mobile-side-links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-side-link ${location.pathname === link.path ? 'is-active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="mobile-side-index">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              className="mobile-side-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="mobile-side-contact">
                <a href="mailto:hello@acenzos.com">hello@acenzos.com</a>
                <p>Dubai Design District<br/>Dubai, UAE</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
