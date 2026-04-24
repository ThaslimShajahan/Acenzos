import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';
import './Pages.css';

const ease = [0.16, 1, 0.3, 1];

const EXPERTISE_AREAS = [
  {
    id: 'shopify', title: 'Shopify Development', accent: '#b5f23a',
    desc: 'We are Shopify experts. From custom Liquid theme development to headless storefronts with Hydrogen — we build e-commerce experiences that are fast, on-brand, and built to convert.',
    skills: ['Custom Shopify Themes (Liquid)', 'Hydrogen & Headless Commerce', 'Shopify App Integration', 'Store Migration & Optimisation', 'Shopify Plus', 'Conversion Rate Optimisation'],
  },
  {
    id: 'engineering', title: 'Custom Development', accent: '#9b7fe8',
    desc: 'Beyond Shopify, we build full-stack web and mobile applications. From internal tools to SaaS platforms — our team uses React, Node.js, and cloud infrastructure to ship products that scale.',
    skills: ['React & Next.js', 'Node.js API Development', 'Mobile Apps (React Native)', 'Cloud Infrastructure (AWS/GCP)', 'Headless CMS', 'Database Design & Optimisation'],
  },
  {
    id: 'ai', title: 'AI & Automation', accent: '#4db8ff',
    desc: 'We build AI-powered tools for businesses — from Redber AI to custom LLM integrations, chatbots, and workflow automation. Let your business run smarter, not harder.',
    skills: ['Redber AI Deployment', 'Custom AI Chatbots', 'LLM Integration (OpenAI / Gemini)', 'Lead Capture Automation', 'AI Workflow Automation', 'Knowledge Base Training'],
  },
];

const PROCESS_STEPS = [
  { num:'01', title:'Discovery & Brief',       desc:'We start by understanding your business, customers, and goals — then define exactly what needs to be built and why.' },
  { num:'02', title:'Design & Architecture',   desc:'UI/UX design, technical architecture, and project planning — everything mapped out before a line of code is written.' },
  { num:'03', title:'Build & Iterate',         desc:'Agile development with regular check-ins. You see progress weekly, provide feedback, and stay in full control.' },
  { num:'04', title:'Launch & Retain',         desc:'We don\'t disappear at launch. Post-go-live we monitor, optimise, and keep improving your product over time.' },
];

const ExpertisePage = () => {
  const [openId, setOpenId] = useState('shopify');

  return (
    <motion.div
      className="page-wrapper page-dark"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.7, ease }}
    >
      <Helmet>
        <title>Engineering & Expertise | Acenzos</title>
        <meta name="description" content="Technical architecture, digital ecosystems, and end-to-end product development." />
      </Helmet>

      <Breadcrumbs crumbs={[
        { label: 'Home', path: '/' },
        { label: 'Expertise' }
      ]} />

      <section className="page-hero">
        <div className="wrap">
          <motion.p className="eyebrow" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            Capabilities
          </motion.p>
          <motion.h1 className="h-display" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.8, ease }}>
            What we<br /><span className="grad-violet">build.</span>
          </motion.h1>
          <motion.p className="exp-hero-desc" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
            Shopify development, custom web apps, and AI products — we are builders who take ideas from brief to live product. Our expertise spans the full stack, from storefront to server.
          </motion.p>
        </div>
      </section>

      <section className="page-content" style={{ paddingBottom:'120px', borderTop:'1px solid var(--border)' }}>
        <div className="wrap exp-layout">
          <div className="exp-sticky-col">
            <h2 className="exp-side-title">Our Practice Areas</h2>
            <p className="exp-side-desc">Three core pillars: Shopify development, custom engineering, and AI automation. Together they cover the full spectrum of what modern businesses need to grow online.</p>
          </div>

          <div className="exp-accordions">
            {EXPERTISE_AREAS.map((area, i) => {
              const isOpen = openId === area.id;
              return (
                <motion.div
                  key={area.id}
                  className={`exp-acc-item ${isOpen ? 'is-open' : ''}`}
                  style={{ '--area-accent': area.accent }}
                  initial={{ opacity:0, y:28 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-80px' }}
                  transition={{ delay:i*0.1, duration:0.6, ease }}
                >
                  <button className="exp-acc-header" onClick={() => setOpenId(isOpen ? null : area.id)}>
                    <h3 style={{ color: isOpen ? area.accent : undefined }}>{area.title}</h3>
                    <ChevronDown className="exp-acc-icon" />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="exp-acc-body-wrap"
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:'auto', opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.45, ease }}
                      >
                        <div className="exp-acc-body">
                          <p className="exp-acc-desc">{area.desc}</p>
                          <ul className="exp-acc-skills">
                            {area.skills.map(s => <li key={s}>{s}</li>)}
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

      {/* Process */}
      <section className="section" style={{ borderTop:'1px solid var(--border)', paddingBottom:'160px' }}>
        <div className="wrap">
          <div className="page-section-header">
            <p className="eyebrow">The Engine Room</p>
            <h2 className="h-xl">How we <span className="grad-lime">execute</span></h2>
          </div>
          <div className="proc-grid">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="proc-card"
                initial={{ opacity:0, y:36 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-40px' }}
                transition={{ duration:0.7, delay:i*0.1, ease }}
              >
                <div className="proc-num-bg">{step.num}</div>
                <div className="proc-content">
                  <span className="proc-index">{step.num}</span>
                  <h4 className="proc-title">{step.title}</h4>
                  <p className="proc-desc">{step.desc}</p>
                </div>
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
