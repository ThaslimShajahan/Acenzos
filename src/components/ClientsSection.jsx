import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ClientsSection.css';

const clients = [
  { name: 'Google',     abbr: 'G' },
  { name: 'Microsoft',  abbr: 'MS' },
  { name: 'Amazon',     abbr: 'AMZ' },
  { name: 'Stripe',     abbr: 'STR' },
  { name: 'Figma',      abbr: 'FIG' },
  { name: 'Vercel',     abbr: 'VCL' },
  { name: 'Notion',     abbr: 'NTN' },
  { name: 'Linear',     abbr: 'LNR' },
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
            "Acenzos delivered a product that exceeded every expectation.
            Their design sensibility and technical execution were exceptional."
          </p>
          <div className="cl-quote-author">
            <div className="cl-quote-avatar">AS</div>
            <div>
              <span className="cl-quote-name">Alex Sentry</span>
              <span className="cl-quote-role">CPO at BrandForge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
