import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CTASection from '../components/CTASection';
import './Pages.css';

const EXPERTISE_AREAS = [
  {
    id: 'engineering',
    title: 'Platform Engineering',
    desc: 'We architect complex, scalable software ecosystems. From distributed microservices to high-frequency trading dashboards, our engineering team works with modern tech stacks (React, Node, Go, Rust) to build bomb-proof digital infrastructure.',
    skills: ['System Architecture', 'API Design & Integration', 'Cloud Infrastructure (AWS/GCP)', 'Web3 & Smart Contracts', 'Headless CMS', 'Mobile App Development']
  },
  {
    id: 'design',
    title: 'Digital Experience Design',
    desc: 'We merge brand DNA with best-in-class UX/UI. We build comprehensive design systems that evoke emotion while guiding users flawlessly through complex conversion funnels.',
    skills: ['UX/UI Design', 'Design Systems (Figma)', '3D & WebGL (Three.js)', 'Motion Prototyping', 'User Interaction Modeling', 'Branding & Identity']
  },
  {
    id: 'growth',
    title: 'Growth & Strategy',
    desc: 'Products are only as good as their adoption rate. We act as your fractional growth team, running data-driven sprint cycles to optimize acquisition, retention, and lifetime value.',
    skills: ['Product Analytics', 'Conversion Rate Optimization (CRO)', 'Technical SEO', 'Go-to-Market Strategy', 'User Retention Looping', 'A/B Testing']
  }
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Audit', desc: 'We dive deep into your business metrics, technical debt, and market positioning before writing a single line of code.' },
  { num: '02', title: 'Architecture Planning', desc: 'Laying the foundation. We map out database schemas, API routes, and comprehensive design tokens.' },
  { num: '03', title: 'Sprints & Engineering', desc: 'Agile, weekly cycles. You see constant iterative progress, not a black box of development.' },
  { num: '04', title: 'Scale & Retain', desc: 'Post-launch, we shift into growth mode, analyzing user data to constantly improve the platform.' }
];

const ExpertisePage = () => {
  const [openId, setOpenId] = useState('engineering');

  return (
    <motion.div 
      className="page-wrapper page-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Helmet>
        <title>Engineering & Expertise | Acenzos</title>
        <meta name="description" content="Technical architecture, digital ecosystems, and end-to-end product development." />
      </Helmet>
      
      <section className="page-hero">
        <div className="wrap">
          <motion.p 
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Capabilities
          </motion.p>
          <motion.h1 
            className="h-display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Digital<br/><i>Ecosystems</i>.
          </motion.h1>
          <motion.p
            className="exp-hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We don't just build websites. We architect end-to-end business engines that automate operations, scale revenue, and dominate verticals. Our expertise bridges the gap between deep technical infrastructure and premium aesthetic design.
          </motion.p>
        </div>
      </section>
      
      <section className="page-content" style={{ paddingBottom: '120px' }}>
        <div className="wrap exp-layout">
          
          <div className="exp-sticky-col">
            <h2 className="exp-side-title">Our Practice Areas</h2>
            <p className="exp-side-desc">Click through our core pillars of capability. Each operates as an independent pod of extreme specialization, but they converge to build category-defining products.</p>
          </div>

          <div className="exp-accordions">
            {EXPERTISE_AREAS.map((area, i) => {
              const isOpen = openId === area.id;
              return (
                <motion.div 
                  key={area.id} 
                  className={`exp-acc-item ${isOpen ? 'is-open' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <button className="exp-acc-header" onClick={() => setOpenId(isOpen ? null : area.id)}>
                    <h3>{area.title}</h3>
                    <ChevronDown className="exp-acc-icon" />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        className="exp-acc-body-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="exp-acc-body">
                          <p className="exp-acc-desc">{area.desc}</p>
                          <ul className="exp-acc-skills">
                            {area.skills.map(skill => (
                              <li key={skill}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Process Section */}
      <section className="section section-white" style={{ paddingTop: '80px', paddingBottom: '160px' }}>
        <div className="wrap">
          <div className="page-section-header" style={{ marginBottom: '60px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
            <p className="eyebrow">The Engine Room</p>
            <h2 className="h-xl">How we <i>execute</i></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: '32px', background: 'var(--bg)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}
              >
                <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-3)', display: 'block', marginBottom: '16px' }}>{step.num}</span>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-2)', lineHeight: '1.6' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

    </motion.div>
  );
};

export default ExpertisePage;
