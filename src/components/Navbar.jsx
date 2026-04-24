import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Work',      path: '/work' },
  { label: 'Expertise', path: '/expertise' },
  { label: 'Studio',    path: '/studio' },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight]       = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(prev => (v > 100 ? true : v < 50 ? false : prev));
  });

  // Watch for light-background sections intersecting the navbar zone
  useEffect(() => {
    const NAV_H = 80; // approx navbar height + buffer
    const observe = () => {
      const targets = document.querySelectorAll('[data-nav-light]');
      if (!targets.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          // If any light section is intersecting the top strip, invert
          const anyLight = entries.some(e => e.isIntersecting);
          setIsLight(anyLight);
        },
        {
          rootMargin: `-0px 0px -${window.innerHeight - NAV_H}px 0px`,
          threshold: 0,
        }
      );
      targets.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    };
    // Small delay so DOM is ready after route change
    const t = setTimeout(observe, 100);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      <div className={`nav-pill${scrolled ? ' is-scrolled' : ''}${isLight ? ' is-light' : ''}`}>

        {/* Brand — layoutId matches preloader logo for fly-in animation */}
        <Link to="/" className="nav-brand" onClick={() => setMobileOpen(false)}>
          <motion.img
            layoutId="brand-logo"
            src="/logo/logo.svg"
            alt="Acenzos"
            className="nav-logo"
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
          />
          <span className={`nav-name${scrolled ? ' is-hidden' : ''}`}>Acenzos</span>
        </Link>

        {/* Links + CTA — collapses on scroll */}
        <div className={`nav-center nav-desktop${scrolled ? ' is-hidden' : ''}`}>
          <div className="nav-sep" />
          <nav className="nav-links">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.path}
                className={`nav-link${location.pathname === link.path ? ' is-active' : ''}`}
              >
                <span className="nav-dot" />
                {link.label}
              </Link>
            ))}
          </nav>
          <Link to="/contact" className="nav-cta">Let's Talk</Link>
        </div>

        {/* Hamburger: always on mobile, appears on scroll for desktop */}
        <button
          className={`nav-burger${mobileOpen ? ' is-open' : ''}${scrolled ? ' nav-burger--show' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="nav-burger__line" />
          <span className="nav-burger__line" />
        </button>

      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;

