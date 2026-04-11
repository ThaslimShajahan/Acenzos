import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../assets/imgs/3175466.jpg';
import img2 from '../assets/imgs/10510710.jpg';
import img3 from '../assets/imgs/10607573.jpg';
import img4 from '../assets/imgs/11194857.jpg';
import { droneStore } from '../droneStore';
import './CapabilitiesSection.css';

const services = [
  {
    id: 1, num: '01',
    title: 'Digital Products',
    tags: ['Web Apps', 'Mobile', 'SaaS', 'Dashboard'],
    desc: 'We design and build web and mobile applications that scale. From complex enterprise SaaS to consumer-grade products — intuitive, fast, and pixel-perfect.',
    img: img1,
  },
  {
    id: 2, num: '02',
    title: 'Brand & Identity',
    tags: ['Logo', 'Design System', 'Collateral', 'Motion'],
    desc: 'We shape brand worlds — visual systems that communicate who you are and what you stand for, with consistency across every surface.',
    img: img2,
  },
  {
    id: 3, num: '03',
    title: '3D & Immersive',
    tags: ['WebGL', 'Three.js', '3D Render', 'AR'],
    desc: 'Breathtaking 3D environments, real-time WebGL experiences, and interactive renders that make your brand impossible to ignore.',
    img: img3,
  },
  {
    id: 4, num: '04',
    title: 'Growth & Marketing',
    tags: ['SEO', 'CRO', 'Campaigns', 'Analytics'],
    desc: 'Data-led strategies that drive qualified traffic, convert visitors, and build long-term brand equity across every digital channel.',
    img: img4,
  },
];

const marqueeItems = [
  'DESIGN', 'ENGINEERING', 'STRATEGY', 'BRANDING', 'MOTION',
  'DESIGN', 'ENGINEERING', 'STRATEGY', 'BRANDING', 'MOTION',
];

const CapabilitiesSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const sectionRef = useRef(null);

  // Tell the drone when this section is visible
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { droneStore.capSectionVisible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync hover index every cycle
  droneStore.capActiveIndex = hoverIdx;

  // Real-time mouse tracking for image parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined') {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    }
  };

  return (
    <section className="cap-section" id="capabilities" ref={sectionRef}>
      <div className="wrap">

        <div className="cap-layout-grid">
          {/* Left Column: Sticky Context */}
          <div className="cap-sticky-col">
            <motion.div
              className="cap-header-left"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.72, ease: [0.16,1,0.3,1] }}
            >
              <p className="eyebrow cap-eyebrow" style={{ color: 'var(--text-dark-3)' }}>Our Capabilities</p>
              <h2 className="cap-heading-display">
                What we do<br />
                <span className="text-muted-dark">for you.</span>
              </h2>
              <p className="cap-desc cap-desc-modern">
                We operate at the intersection of design, technology, and strategy —
                delivering end-to-end digital experiences that define categories and leave lasting impact.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Scrollable Services Stack */}
          <div className="cap-scroll-col" onMouseMove={handleMouseMove}>
            <div className="cap-rows cap-rows-modern">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  className={`cap-row cap-row-modern ${openIdx === i ? 'active' : ''} ${hoverIdx === i ? 'hovered' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16,1,0.3,1] }}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(-1)}
                >
                  <div className="cap-row-top">
                    <div className="cap-row-left">
                      <span className="cap-row-num">{svc.num}</span>
                      <h3 className="cap-row-title">{svc.title}</h3>
                      <div className="cap-row-tags">
                        {svc.tags.map(t => <span key={t} className="cap-row-tag">{t}</span>)}
                      </div>
                    </div>
                    <span className="cap-row-arrow">↗</span>
                  </div>

                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div
                        className="cap-row-body"
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.16,1,0.3,1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="cap-row-body-desc">{svc.desc}</p>
                        <div className="cap-row-img cap-row-img-modern">
                          <motion.img 
                            src={svc.img} 
                            alt={svc.title} 
                            animate={{ x: mousePos.x, y: mousePos.y }}
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 70, damping: 20 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee footer */}
        <div className="cap-marquee-strip">
          <div className="cap-marquee-track">
            {marqueeItems.map((item, i) => (
              <span key={i} className="cap-marquee-item">
                {item} <span className="cap-marquee-dot" />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesSection;
