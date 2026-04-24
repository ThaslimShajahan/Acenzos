import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './MobileMenu.css';

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'Work',      path: '/work' },
  { label: 'Expertise', path: '/expertise' },
  { label: 'Studio',    path: '/studio' },
  { label: 'Contact',   path: '/contact' },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mob-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="mob-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top */}
            <div className="mob-top">
              <Link to="/" className="mob-brand" onClick={onClose}>
                <img src="/logo/logo.svg" alt="Acenzos" className="mob-logo" />
                <span className="mob-brand-name">Acenzos</span>
              </Link>
              <button className="mob-close" onClick={onClose} aria-label="Close menu">
                ✕
              </button>
            </div>

            {/* Links */}
            <nav className="mob-links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`mob-link ${location.pathname === link.path ? 'is-active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="mob-link-text">{link.label}</span>
                    <span className="mob-link-num">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="mob-footer">
              <a href="mailto:info@acenzos.com" className="mob-footer-email">
                info@acenzos.com
              </a>
              <p className="mob-footer-sub">Available for new projects</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
