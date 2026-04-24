import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">

        {/* Top: wordmark + tagline */}
        <div className="footer-top">
          <h2 className="footer-wordmark">ACENZOS</h2>
          <p className="footer-tagline">
            Commerce architecture &amp; applied AI.<br />
            Creators of <span className="footer-tagline-em">Redber AI.</span>
          </p>
        </div>

        <div className="footer-divider" />

        {/* Nav grid */}
        <div className="footer-nav">
          <div className="footer-col">
            <span className="footer-col-label">[ Studio ]</span>
            <Link to="/studio"    className="footer-link">About Us</Link>
            <Link to="/expertise" className="footer-link">Capabilities</Link>
            <Link to="/work"      className="footer-link">Work</Link>
          </div>

          <div className="footer-col">
            <span className="footer-col-label">[ Social ]</span>
            <a href="#" className="footer-link">Instagram</a>
            <a href="#" className="footer-link">Twitter / X</a>
            <a href="#" className="footer-link">LinkedIn</a>
          </div>

          <div className="footer-col">
            <span className="footer-col-label">[ Contact ]</span>
            <a href="mailto:info@acenzos.com" className="footer-link">info@acenzos.com</a>
            <Link to="/contact" className="footer-link">Start a Project</Link>
          </div>

          <div className="footer-col footer-col--avail">
            <span className="footer-avail">
              <span className="footer-avail-dot" />
              Available for projects
            </span>
            <span className="footer-est">Est. 2026</span>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <span className="footer-copy">© {year} Acenzos. All rights reserved.</span>
          <a href="#" className="footer-legal">Privacy Policy</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
