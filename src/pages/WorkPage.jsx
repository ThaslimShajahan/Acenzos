import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';
import { PROJECTS_DATA } from '../data/projects';
import './Pages.css';

const ease = [0.16, 1, 0.3, 1];

const WorkPage = () => {
  return (
    <motion.div
      className="page-wrapper page-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      <Helmet>
        <title>Selected Work — Case Studies | Acenzos</title>
        <meta name="description" content="Explore Acenzos case studies — AI products, Shopify storefronts, and custom web platforms built with purpose." />
        <link rel="canonical" href="https://acenzos.com/work" />
        <meta property="og:title"       content="Selected Work — Case Studies | Acenzos" />
        <meta property="og:description" content="AI products, Shopify storefronts, and custom platforms. Built with precision." />
        <meta property="og:url"         content="https://acenzos.com/work" />
      </Helmet>

      <Breadcrumbs crumbs={[
        { label: 'Home', path: '/' },
        { label: 'Work' }
      ]} />

      <section className="page-hero">
        <div className="wrap">
          <motion.p className="eyebrow" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            Selected Work
          </motion.p>
          <motion.h1 className="h-display" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.8, ease }}>
            We build<br /><span className="grad-violet">platforms.</span>
          </motion.h1>
          <motion.p
            style={{ fontSize:'1.1rem', lineHeight:'1.7', color:'var(--text-2)', maxWidth:'560px', marginTop:'20px' }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          >
            Shopify storefronts, custom web apps, and in-house AI products — each project tackled with the same obsession: great design, clean code, measurable outcomes.
          </motion.p>
        </div>
      </section>

      <section className="page-content" style={{ borderTop: '1px solid var(--border)', paddingTop: '80px' }}>
        <div className="wrap">
          <div className="page-section-header" style={{ marginBottom: '52px' }}>
            <h2 className="h-xl">Featured <span className="grad-violet">Case Studies</span></h2>
          </div>
          <div className="work-grid">
            {PROJECTS_DATA.map((proj, i) => (
              <motion.div
                key={proj.id}
                className="work-card"
                initial={{ opacity:0, y:56 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-80px' }}
                transition={{ duration:0.8, delay:(i%2)*0.1, ease }}
              >
                <Link to={`/work/${proj.slug}`} className="work-card-image" data-cursor="VIEW">
                  {proj.img && (
                    <img
                      src={proj.img}
                      alt={proj.title}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    />
                  )}
                  <div className="work-hover-reveal">View Case Study ↗</div>
                </Link>
                <div className="work-card-meta">
                  <div>
                    <h3 className="work-card-title">{proj.title}</h3>
                    <p className="work-card-category">{proj.category} · {proj.year}</p>
                  </div>
                  <span className="work-card-year">{proj.number}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology section */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', paddingBottom: '160px' }}>
        <div className="wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
            <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <p className="eyebrow">Our Methodology</p>
              <h2 className="h-xl">Build.<br /><span className="grad-lime">Launch</span>. Grow.</h2>
            </motion.div>
            <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}>
              <p style={{ fontSize:'1rem', lineHeight:'1.8', color:'var(--text-2)', marginBottom:'28px' }}>
                Every product we build is launched with a clear growth plan. We don't stop at "done" — we iterate, measure, and optimise until the numbers prove it.
              </p>
              <p style={{ fontSize:'1rem', lineHeight:'1.8', color:'var(--text-2)' }}>
                Whether it's a Shopify store or a custom-built SaaS, we stay with you post-launch to ensure the product keeps improving, converting, and growing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </motion.div>
  );
};

export default WorkPage;
