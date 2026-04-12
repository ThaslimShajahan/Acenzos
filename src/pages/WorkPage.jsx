import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import { PROJECTS_DATA } from '../data/projects';
import './Pages.css';

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
              We build Shopify storefronts, custom web applications, and in-house AI products.
              Every project is tackled with the same obsession: great design, clean code, and measurable outcomes for our clients.
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
            {PROJECTS_DATA.map((proj, i) => (
              <motion.div 
                key={proj.id} 
                className="work-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/work/${proj.slug}`} className="work-card-image" style={{ background: proj.color }}>
                  <div className="work-hover-reveal">View Case Study</div>
                </Link>
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
              <h2 className="h-xl h-white" style={{ fontSize: '3.5rem' }}>Build.<br/><i>Launch</i>. Grow.</h2>
            </div>
            <div>
              <p className="hero-sub--dark text-muted-dark" style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Every product we build is launched with a clear growth plan. We don't stop at "done" — we iterate, measure, and optimise until the numbers prove it.
              </p>
              <p className="hero-sub--dark text-muted-dark" style={{ fontSize: '1.1rem' }}>
                Whether it's a Shopify store or a custom-built SaaS, we stay with you post-launch to ensure the product keeps improving, keeps converting, and keeps growing.
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
