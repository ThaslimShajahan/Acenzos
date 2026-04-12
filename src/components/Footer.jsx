import React from 'react';
import './Footer.css';
import RisingWordmark from './RisingWordmark';

const Footer = () => {
  return (
    <footer className="ac-footer" id="footer">
      <div className="ac-footer-inner">
        {/* Left Side: Brand & Links */}
        <div className="ac-footer-left">
          <div className="ac-brand-zone">
             <RisingWordmark
                text="ACENZOS"
                fromColor="rgba(255,255,255,0)"
                toColor="rgba(255,255,255,0.9)"
                className="ac-wordmark"
                stagger={0.06}
                delay={0}
             />
             <p className="ac-tagline">Shopify experts. Product builders. AI innovators.</p>
          </div>
          
          <div className="ac-footer-nav">
             <div className="ac-nav-group">
                <h4>STUDIO</h4>
                <a href="#">About Us</a>
                <a href="#">Capabilities</a>
                <a href="#">Careers</a>
             </div>
             <div className="ac-nav-group">
                <h4>SOCIAL</h4>
                <a href="#">Instagram</a>
                <a href="#">Twitter / X</a>
                <a href="#">LinkedIn</a>
             </div>
          </div>

          <div className="ac-footer-legal">
             <span>© {new Date().getFullYear()} ACENZOS</span>
             <a href="#">Privacy Policy</a>
          </div>
        </div>

        {/* Right Side: Action Card */}
        <div className="ac-footer-right">
           <div className="ac-action-card">
              <div className="ac-card-glow"></div>
              
              <h2 className="ac-action-title">
                HAVE A VISION?<br/>
                <span className="ac-text-gradient">LET'S TALK.</span>
              </h2>
              
              <p className="ac-action-desc">
                We collaborate with ambitious brands to create digital products that leave a lasting impact.
              </p>
              
              <button className="ac-magnetic-btn">
                 <span className="ac-btn-text">START A PROJECT</span>
                 <div className="ac-btn-ring"></div>
              </button>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
