import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import './Pages.css';

const PROJECTS = [
  { id: 1, title: 'WorldQuant Foundry', category: 'Platform Engineering', year: '2025', color: '#1a1a2a' },
  { id: 2, title: 'SOHub', category: 'Immersive Digital Experience', year: '2024', color: '#2a1a1a' },
  { id: 3, title: 'Aura Protocol', category: 'Web3 & Financial Systems', year: '2024', color: '#1a2a1a' },
  { id: 4, title: 'Vanguard OS', category: 'Enterprise SaaS Dashboard', year: '2023', color: '#252525' },
  { id: 5, title: 'Lumina', category: 'Brand Identity & Strategy', year: '2023', color: '#101015' },
  { id: 6, title: 'NextGen AI', category: 'Machine Learning Infrastructure', year: '2023', color: '#181525' },
  { id: 7, title: 'Oasis Wellness', category: 'E-Commerce & Retail', year: '2022', color: '#2a251a' },
  { id: 8, title: 'Nexus Logistics', category: 'B2B Logistics Platform', year: '2022', color: '#152528' }
];

const WorkPage = () => {
  return (
    <motion.div 
      className="page-wrapper page-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Helmet>
        <title>Selected Work | Acenzos</title>
        <meta name="description" content="Explore our portfolio of category-defining digital products, campaigns, and experiences." />
      </Helmet>
      
      <section className="page-hero">
        <div className="wrap">
          <motion.p 
            className="eyebrow eyebrow-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Selected Work
          </motion.p>
          <motion.h1 
            className="h-display h-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We build<br/><i>platforms</i>.
          </motion.h1>
          <motion.div 
            className="hero-sub-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ marginTop: '40px', maxWidth: '600px' }}
          >
            <p className="hero-sub--dark text-muted-dark" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              We've partnered with industry leaders, ambitious startups, and visionary founders to engineer products that don't just participate in markets, but completely redefine them. 
              Our work spans FinTech, Web3, Enterprise SaaS, and hyper-growth consumer tech.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="page-content" style={{ paddingBottom: '160px' }}>
        <div className="wrap">
          
          <div className="page-section-header" style={{ marginBottom: '60px', borderTop: '1px solid var(--border-dark)', paddingTop: '40px' }}>
            <h2 className="h-xl h-white">Featured <i>Case Studies</i></h2>
          </div>

          <div className="work-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div 
                key={proj.id} 
                className="work-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div 
                  className="work-card-image"
                  style={{ background: proj.color }}
                >
                  <div className="work-hover-reveal">View Case Study</div>
                </div>
                <div className="work-card-meta">
                  <div className="work-card-info">
                    <h3 className="work-card-title">{proj.title}</h3>
                    <p className="work-card-category">{proj.category}</p>
                  </div>
                  <span className="work-card-year">{proj.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section section-dark" style={{ borderTop: '1px solid var(--border-dark)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <p className="eyebrow eyebrow-dark">Our Methodology</p>
              <h2 className="h-xl h-white" style={{ fontSize: '3.5rem' }}>Iterate.<br/><i>Validate</i>. Scale.</h2>
            </div>
            <div>
              <p className="hero-sub--dark text-muted-dark" style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                A successful digital product is never truly "finished." It is an evolving asset. We approach every engagement with a mindset geared toward long-term sustainability.
              </p>
              <p className="hero-sub--dark text-muted-dark" style={{ fontSize: '1.1rem' }}>
                We don't believe in handing over a codebase and walking away. Our retainer models ensure that we remain integrated as your dedicated fractional engineering and design wing, pushing weekly iterations to keep your platform ahead of the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      
    </motion.div>
  );
};

export default WorkPage;
