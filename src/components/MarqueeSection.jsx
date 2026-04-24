import React from 'react';
import './MarqueeSection.css';

const ITEMS = [
  'AI Development',
  'Web Applications',
  'UI / UX Design',
  'Digital Strategy',
  'Redber AI',
  'Product Engineering',
  'Motion Design',
];

const MarqueeSection = () => (
  <div className="marquee-band" aria-hidden="true">
    <div className="marquee-track">
      {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
        <span key={i} className="marquee-item">
          {item}
          <span className="marquee-sep">·</span>
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeSection;
