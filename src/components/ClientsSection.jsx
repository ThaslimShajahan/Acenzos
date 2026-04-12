import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ClientsSection.css';

const clients = [
  { name: 'Haya Resort',   abbr: 'HR' },
  { name: 'StyleCraft',    abbr: 'SC' },
  { name: 'Redber AI',     abbr: 'RB' },
  { name: 'MarketBloom',   abbr: 'MB' },
  { name: 'PureShop',      abbr: 'PS' },
  { name: 'TechForge',     abbr: 'TF' },
  { name: 'LaunchPad',     abbr: 'LP' },
  { name: 'NovaBrand',     abbr: 'NB' },
];

const Track = ({ reverse = false }) => (
  <div className={`cl-track ${reverse ? 'cl-track--reverse' : ''}`}>
    {[...clients, ...clients].map((c, i) => (
      <div key={i} className="cl-logo-card">
        <span className="cl-logo-abbr">{c.abbr}</span>
        <span className="cl-logo-name">{c.name}</span>
      </div>
    ))}
  </div>
);

const ClientsSection = () => {
  const [paused, setPaused] = useState(false);
  return (
    <section className="cl-section" id="clients">
      <div className="wrap">
        <div className="cl-header">
          <p className="s-label">Trusted By</p>
          <h2 className="cl-heading">
            Brands that trust our craft
          </h2>
        </div>
      </div>

      <div
        className={`cl-tracks ${paused ? 'paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Track />
        <Track reverse />
      </div>

      {/* Testimonial pull-quote */}
      <div className="wrap">
        <div className="cl-quote">
          <p className="cl-quote-text">
            "Acenzos rebuilt our Shopify store from the ground up. The result was faster, more beautiful, and our conversion rate jumped 30% in the first month."
          </p>
          <div className="cl-quote-author">
            <div className="cl-quote-avatar">MK</div>
            <div>
              <span className="cl-quote-name">Mohammed K.</span>
              <span className="cl-quote-role">Founder, StyleCraft</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
