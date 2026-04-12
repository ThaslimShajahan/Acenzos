import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import img1 from '../assets/imgs/3175466.jpg';
import img2 from '../assets/imgs/10510710.jpg';
import img3 from '../assets/imgs/10607573.jpg';
import img4 from '../assets/imgs/11194857.jpg';
import './StackedCards.css';

const PROJECTS = [
  {
    id: 1,
    slug: 'redber',
    title: 'Redber AI',
    category: 'AI Product',
    year: '2024',
    tags: ['Conversational AI', 'Lead Capture', '24/7 Automation'],
    img: img1
  },
  {
    id: 2,
    slug: 'shopify-storefront',
    title: 'Shopify Storefront',
    category: 'E-Commerce',
    year: '2024',
    tags: ['Shopify', 'Liquid', 'Custom Theme'],
    img: img2
  },
  {
    id: 3,
    slug: 'acenzos-platform',
    title: 'Acenzos Platform',
    category: 'SaaS Development',
    year: '2025',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    img: img3
  },
  {
    id: 4,
    slug: 'client-dashboard',
    title: 'Client Dashboard',
    category: 'Web Application',
    year: '2024',
    tags: ['Analytics', 'Real-time', 'Custom UI'],
    img: img4
  }
];

const WorkSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section className="work-section" ref={containerRef}>
      <div className="wrap work-wrap">
        
        {/* Left Pinned Content */}
        <div className="work-left-pinned">
          <div className="work-left-content">
            <motion.p 
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Selected Work
            </motion.p>
            <motion.h2 
              className="h-xl work-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Products we've <br />
              <span className="text-muted">built & launched.</span>
            </motion.h2>

            <div className="work-index-list">
              {PROJECTS.map((p, i) => (
                <div 
                  key={p.id} 
                  className={`work-index-item ${activeIndex === i ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className="work-index-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="work-index-info">
                    <span className="work-index-title">{p.title}</span>
                    <span className="work-index-cat">{p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Scrolling Slides */}
        <div className="work-right-slides">
          {PROJECTS.map((p, i) => (
            <div 
              key={p.id} 
              className="work-slide"
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className="work-slide-img-wrap">
                <img src={p.img} alt={p.title} className="work-slide-img" />
                <div className="work-slide-overlay">
                  <div className="work-slide-top">
                    <span className="work-slide-cat">{p.category}</span>
                    <span className="work-slide-year">{p.year}</span>
                  </div>
                  <div className="work-slide-bottom">
                    <h3 className="work-slide-title">{p.title}</h3>
                    <div className="work-slide-tags">
                      {p.tags.map(t => <span key={t} className="work-slide-tag">{t}</span>)}
                    </div>
                    <Link to={`/work/${p.slug}`} className="work-slide-cta">
                      View Case Study <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WorkSection;
