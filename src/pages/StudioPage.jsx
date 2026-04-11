import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import './Pages.css';

const TEAM_STATS = [
  { label: 'Founded', value: '2023' },
  { label: 'Locations', value: 'DUBAI / REMOTE' },
  { label: 'Global Partners', value: '40+' },
  { label: 'Industry Awards', value: '12' }
];

const StudioPage = () => {
  return (
    <motion.div 
      className="page-wrapper page-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Helmet>
        <title>The Studio & Culture | Acenzos</title>
        <meta name="description" content="Inside our creative studio. We are a collective of thinkers, designers, and engineers." />
      </Helmet>
      
      <section className="page-hero">
        <div className="wrap">
          <motion.p 
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Inside The Studio
          </motion.p>
          <motion.h1 
            className="h-display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Creative<br/><i>Culture</i>.
          </motion.h1>
        </div>
      </section>
      
      <section className="page-content" style={{ paddingBottom: '80px' }}>
        <div className="wrap">
          
          <div className="studio-intro">
            <motion.h2 
              className="studio-headline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              We are a privately held design & engineering collective operating at the bleeding edge of the digital economy. We don't hire employees; we partner with masters of their craft.
            </motion.h2>
          </div>

          <div className="studio-stats">
            {TEAM_STATS.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className="studio-stat-box"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="stat-val">{stat.value}</span>
                <span className="stat-lbl">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="studio-gallery">
            <motion.div initial={{ opacity:0, y: 30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="sg-image sg-tall" style={{ background: '#e0e0e0' }} />
            <motion.div initial={{ opacity:0, y: 30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }} className="sg-image sg-wide" style={{ background: '#d5d5d5' }} />
            <motion.div initial={{ opacity:0, y: 30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }} className="sg-image" style={{ background: '#c8c8c8' }} />
            <motion.div initial={{ opacity:0, y: 30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }} className="sg-image" style={{ background: '#bcbcbc' }} />
          </div>

        </div>
      </section>

      {/* Careers Section */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
           <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '80px' }}>
              <div>
                <p className="eyebrow">Join the swarm</p>
                <h2 className="h-xl">Careers</h2>
                <p style={{ color: 'var(--text-2)', marginTop: '20px', lineHeight: '1.6' }}>We are always looking for exceptional engineering and design talent. If you build at the highest level, we want to talk.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a href="mailto:careers@acenzos.com" style={{ display: 'flex', justifyContent: 'space-between', padding: '30px', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-white)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <h4 style={{ fontSize: '1.2rem' }}>Senior Full-Stack Engineer (React/Go)</h4>
                  <span style={{ color: 'var(--text-3)' }}>Remote</span>
                </a>
                <a href="mailto:careers@acenzos.com" style={{ display: 'flex', justifyContent: 'space-between', padding: '30px', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-white)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <h4 style={{ fontSize: '1.2rem' }}>Creative Director / Brand </h4>
                  <span style={{ color: 'var(--text-3)' }}>Dubai</span>
                </a>
                <a href="mailto:careers@acenzos.com" style={{ display: 'flex', justifyContent: 'space-between', padding: '30px', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text)', transition: 'background 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-white)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <h4 style={{ fontSize: '1.2rem' }}>WebGL / Three.js Developer</h4>
                  <span style={{ color: 'var(--text-3)' }}>Remote</span>
                </a>
              </div>
           </div>
        </div>
      </section>

      <CTASection />

    </motion.div>
  );
};

export default StudioPage;
