import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoWhite from '../assets/logo/logo-acenzos-white.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Work', path: '/work' },
  { label: 'Expertise', path: '/expertise' },
  { label: 'Studio', path: '/studio' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLightPage = ['/expertise', '/studio'].includes(location.pathname);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <header className="navbar-wrapper">
        <div className={`navbar-pill ${scrolled ? 'is-scrolled' : ''} ${isLightPage && !scrolled ? 'is-light-theme' : ''}`}>

          {/* BRAND */}
          <Link to="/" className="navbar__brand" onClick={() => setMobileOpen(false)}>
            <div className="navbar__logo-wrapper">
              <img src={logoWhite} alt="Acenzos" className="navbar__logo" />
            </div>
            <AnimatePresence>
              {!scrolled && (
                <motion.span
                  className="navbar__text"
                  initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, width: 'auto', marginLeft: 12 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  Acenzos
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="navbar__group navbar__desktop-only">
            <nav className="navbar__links">
              {NAV_LINKS.filter(l => l.label !== 'Contact').map(link => (
                <Link 
                  key={link.label} 
                  to={link.path} 
                  className={`navbar__link ${location.pathname === link.path ? 'is-active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link to="/contact" className="navbar__cta">Let's Talk</Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>

        </div>
      </header>

      {/* MOBILE FULLSCREEN DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-menu__links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-menu__link ${location.pathname === link.path ? 'is-active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mobile-menu__index">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
