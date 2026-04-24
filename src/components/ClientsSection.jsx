import React, { useState } from 'react';
import './ClientsSection.css';

const CLIENTS = [
  { name: 'Haya Resort',   abbr: 'HR', accent: '#f0b840' },
  { name: 'StyleCraft',    abbr: 'SC', accent: '#9b7fe8' },
  { name: 'Redber AI',     abbr: 'RB', accent: '#4db8ff' },
  { name: 'MarketBloom',   abbr: 'MB', accent: '#b5f23a' },
  { name: 'PureShop',      abbr: 'PS', accent: '#ff6e6e' },
  { name: 'TechForge',     abbr: 'TF', accent: '#9b7fe8' },
  { name: 'LaunchPad',     abbr: 'LP', accent: '#f0b840' },
  { name: 'NovaBrand',     abbr: 'NB', accent: '#4db8ff' },
];

const Track = ({ reverse = false, paused = false }) => (
  <div className={`cl-track ${reverse ? 'cl-track--rev' : ''} ${paused ? 'cl-track--paused' : ''}`}>
    {[...CLIENTS, ...CLIENTS].map((c, i) => (
      <div key={i} className="cl-card" style={{ '--card-accent': c.accent }}>
        <span className="cl-abbr">{c.abbr}</span>
        <span className="cl-name">{c.name}</span>
      </div>
    ))}
  </div>
);

const ClientsSection = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="cl-section" id="clients">
      <div className="wrap">
        <motion.div
          className="cl-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        >
          <p className="eyebrow">Trusted By</p>
          <h2 className="cl-heading">
            Brands that trust our craft.
          </h2>
        </motion.div>
      </div>

      <div
        className="cl-tracks"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Track paused={paused} />
        <Track reverse paused={paused} />
      </div>

      <div className="wrap">
        <motion.div
          className="cl-quote"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        >
          <span className="cl-quote-mark">"</span>
          <p className="cl-quote-text">
            Acenzos rebuilt our Shopify store from the ground up. The result was faster,
            more beautiful — and our conversion rate jumped 30% in the first month.
          </p>
          <div className="cl-quote-author">
            <div className="cl-quote-avatar">MK</div>
            <div>
              <span className="cl-quote-name">Mohammed K.</span>
              <span className="cl-quote-role">Founder, StyleCraft</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
