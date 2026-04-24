import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import './WorkSection.css';

const FEATURED = PROJECTS_DATA.slice(0, 2);
const ease = [0.16, 1, 0.3, 1];

const WorkSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section className="ws-section" ref={ref} id="work">
      {/* Ghost number for depth */}
      <span className="gs-num" aria-hidden>02</span>
      
      <div className="wrap">

        <motion.div
          className="ws-hd"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="ws-hd-label">[ Selected Work ]</span>
          <div className="ws-hd-line" />
          <Link to="/work" className="ws-hd-link">
            View all <span className="ws-hd-arrow">↗</span>
          </Link>
        </motion.div>

        <div className="ws-grid">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.id}
              className="ws-card-wrap"
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.15, ease }}
            >
              <Link to={`/work/${p.slug}`} className="ws-card" aria-label={p.title}>

                {/* Visual area: image + reveal button stacked. Button (z-1) is
                    behind the image (z-2); the corner peel reveals it. */}
                <div className="ws-card-visual">
                  <div className="ws-card-img-box" style={{ background: p.gradient }}>
                    <img src={p.img} alt={p.title} className="ws-card-img" />
                  </div>

                  <div className="ws-card-btn-wrap" aria-hidden>
                    <div className="ws-card-btn">
                      <div className="ws-card-btn-icon-wrap">
                        <span className="ws-card-btn-icon ws-card-btn-icon--primary">↗</span>
                        <span className="ws-card-btn-icon ws-card-btn-icon--secondary">↗</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card info */}
                <div className="ws-card-info">
                  <div className="ws-card-titles">
                    <h3 className="ws-card-title">{p.title}</h3>
                    <p className="ws-card-desc">{p.tagline}</p>
                  </div>
                  <div className="ws-card-tag-row">
                    <span className="ws-card-tag">{p.category} · {p.year}</span>
                    <span className="ws-card-tag-arrow">↗</span>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WorkSection;
