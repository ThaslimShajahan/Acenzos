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
    title: 'Shopify Development',
    tags: ['Custom Themes', 'Liquid', 'Shopify APIs', 'Performance'],
    desc: 'We build bespoke Shopify storefronts that convert. Custom Liquid themes, headless commerce with Hydrogen, and app integrations — tailored to each brand\'s unique needs.',
    img: img1,
  },
  {
    id: 2, num: '02',
    title: 'Web & App Development',
    tags: ['React', 'Node.js', 'Next.js', 'Mobile'],
    desc: 'From complex dashboards to consumer apps — we architect scalable full-stack products using modern tech stacks, built to perform and grow with your business.',
    img: img2,
  },
  {
    id: 3, num: '03',
    title: 'AI & Automation',
    tags: ['Redber AI', 'LLM Integration', 'Chatbots', 'Workflows'],
    desc: 'We integrate AI into your business operations. Whether it\'s deploying Redber as your AI receptionist or building custom LLM pipelines, we automate the repetitive so you can focus on growth.',
    img: img3,
  },
  {
    id: 4, num: '04',
    title: 'Brand & UI/UX Design',
    tags: ['Brand Identity', 'UI Systems', 'Figma', 'Motion'],
    desc: 'Brands that look great and feel right. We design visual identities, comprehensive design systems, and pixel-perfect interfaces that express your brand and delight your users.',
    img: img4,
  },
];

const marqueeItems = [
  'SHOPIFY', 'DEVELOPMENT', 'AI PRODUCTS', 'DESIGN', 'AUTOMATION',
  'SHOPIFY', 'DEVELOPMENT', 'AI PRODUCTS', 'DESIGN', 'AUTOMATION',
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
              <p className="eyebrow cap-eyebrow" style={{ color: 'var(--text-dark-3)' }}>What We Build</p>
              <h2 className="cap-heading-display">
                Products that<br />
                <span className="text-muted-dark">drive results.</span>
              </h2>
              <p className="cap-desc cap-desc-modern">
                From Shopify storefronts to AI-powered tools — we build and ship software
                that solves real business problems and scales with your ambitions.
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
