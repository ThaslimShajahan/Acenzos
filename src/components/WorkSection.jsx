import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import img1 from '../assets/imgs/3175466.jpg';
import img2 from '../assets/imgs/10510710.jpg';
import img3 from '../assets/imgs/10607573.jpg';
import img4 from '../assets/imgs/11194857.jpg';
import './WorkSection.css';

const projects = [
  { id: 1, title: 'BrandForge Platform', category: 'Web Design',     year: '2024', img: img1, tags: ['React', 'Design System'] },
  { id: 2, title: 'NovaTech Rebrand',    category: 'Brand Identity', year: '2024', img: img2, tags: ['Branding', 'Motion'] },
  { id: 3, title: 'PulseApp UI',         category: 'Mobile App',     year: '2023', img: img3, tags: ['iOS', 'UX'] },
  { id: 4, title: 'OrbitCommerce',       category: 'E-Commerce',     year: '2023', img: img4, tags: ['Shopify', 'SEO'] },
];

const WorkSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef([]);
  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: '-60px' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    slideRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="wrap">
      <div className="work-wrap">

        {/* Sticky left */}
        <div className="work-left-pinned">
          <div className="work-left-content" ref={headerRef}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            >
              <span className="eyebrow">Work</span>
            </motion.div>

            <motion.h2
              className="h-xl work-heading"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
            >
              A glimpse into our{' '}
              <span className="text-muted">creative ventures.</span>
            </motion.h2>

            {/* Project index list */}
            <div className="work-index-list">
              {projects.map((p, i) => (
                <div key={p.id} className={`work-index-item ${activeIndex === i ? 'active' : ''}`}>
                  <span className="work-index-num">0{i + 1}</span>
                  <div className="work-index-info">
                    <span className="work-index-title">{p.title}</span>
                    <span className="work-index-cat">{p.category}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Scrolling right slides */}
        <div className="work-right-slides">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="work-slide"
              ref={el => slideRefs.current[i] = el}
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
                    <a href="#" className="work-slide-cta">
                      View Case Study <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      </div>
    </section>
  );
};

export default WorkSection;
