import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';
import './Pages.css';

const ease = [0.16, 1, 0.3, 1];

const TEAM_STATS = [
  { label: 'Global Clients',       value: '40+' },
  { label: 'Core Products',        value: '03' },
  { label: 'Platforms Built',      value: '25+' },
];

const PRINCIPLES = [
  {
    num: '01',
    title: 'Uncompromising Quality',
    desc: 'We don’t cut corners. From the underlying system architecture to the micro-interactions on the frontend, every detail is meticulously crafted and rigorously tested.'
  },
  {
    num: '02',
    title: 'Design as Function',
    desc: 'Aesthetics are meaningless without usability. We design systems that look premium but, more importantly, solve complex problems with intuitive clarity.'
  },
  {
    num: '03',
    title: 'Built for Scale',
    desc: 'We architect platforms not just for launch day, but for years of growth. Our technical foundations are resilient, secure, and infinitely scalable.'
  }
];

const StudioPage = () => {
  return (
    <motion.div
      className="page-wrapper page-dark"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.7, ease }}
    >
      <Helmet>
        <title>The Studio | Acenzos</title>
        <meta name="description" content="A focused collective of engineers and designers based in Kerala, India." />
      </Helmet>

      <Breadcrumbs crumbs={[
        { label: 'Home', path: '/' },
        { label: 'Studio' }
      ]} />

      <section className="page-hero">
        <div className="wrap">
          <motion.p className="eyebrow" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            Inside The Studio
          </motion.p>
          <motion.h1 className="h-display" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.8, ease }}>
            About<br /><span className="grad-violet">Acenzos.</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro & Manifesto */}
      <section className="page-content" style={{ paddingBottom:'100px', borderTop:'1px solid var(--border)' }}>
        <div className="wrap">
          <div className="studio-intro" style={{ marginBottom: '120px' }}>
            <motion.h2
              className="studio-headline"
              initial={{ opacity:0, y:28 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.8, ease }}
            >
              We are a tight-knit collective of engineers, designers, and strategists operating from Kerala, India. We architect high-performance Shopify ecosystems and bespoke digital platforms. Our flagship AI solution, Redber, empowers modern enterprises to automate engagement with unparalleled precision.
            </motion.h2>
          </div>

          <div className="studio-stats" style={{ borderTop: 'none', paddingTop: 0, paddingBottom: '60px' }}>
            {TEAM_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="studio-stat-box"
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.1, duration:0.5, ease }}
              >
                <span className="stat-val">{stat.value}</span>
                <span className="stat-lbl">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section" style={{ borderTop:'1px solid var(--border)', padding: '120px 0', background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="page-section-header">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="h-xl">Core <span className="grad-lime">Principles</span></h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
                style={{ padding: '40px', background: 'var(--void)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}
              >
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--violet)', marginBottom: '24px' }}>[{p.num}]</span>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--text)', marginBottom: '16px' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-2)', lineHeight: '1.7', fontSize: '0.95rem' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </motion.div>
  );
};

export default StudioPage;
