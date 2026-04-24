import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import './Pages.css';

const ease = [0.16, 1, 0.3, 1];

const OTHER_CONTACTS = [
  { 
    label: 'Our Products',
    heading: 'Redber AI',
    desc: 'Explore our flagship AI product that automates customer communication and support.',
    linkText: 'Visit redber.in ↗',
    linkHref: 'https://redber.in'
  },
  { 
    label: 'General',
    heading: 'Everything Else',
    desc: 'Not sure who to contact? Drop a line here.',
    email: 'info@acenzos.com' 
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name:'', email:'', details:'' });

  return (
    <motion.div
      className="page-wrapper page-dark"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.7, ease }}
    >
      <Helmet>
        <title>Let's Talk | Acenzos</title>
        <meta name="description" content="Start a conversation with our team to build your next digital product." />
      </Helmet>

      <Breadcrumbs crumbs={[
        { label: 'Home', path: '/' },
        { label: 'Contact' }
      ]} />

      <section className="page-hero" style={{ paddingBottom:'60px' }}>
        <div className="wrap cp-grid">
          <div className="cp-left">
            <motion.p className="eyebrow" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
              Start a project
            </motion.p>
            <motion.h1 className="h-display cp-title" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.8, ease }}>
              Let's build<br /><span className="grad-violet">something great.</span>
            </motion.h1>

            <div className="cp-contact-info">
              <div>
                <h4>New Business</h4>
                <a href="mailto:info@acenzos.com">info@acenzos.com</a>
              </div>
              <div>
                <h4>Location</h4>
                <p>Kerala, India<br />Available Worldwide</p>
              </div>
            </div>
          </div>

          <motion.div
            className="cp-right"
            initial={{ opacity:0, x:40 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay:0.4, duration:0.8, ease }}
          >
            <form className="cp-form" onSubmit={e => e.preventDefault()}>
              <div className="cp-input-group">
                <label>01. What's your name?</label>
                <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
              </div>
              <div className="cp-input-group">
                <label>02. What's your email?</label>
                <input type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
              </div>
              <div className="cp-input-group">
                <label>03. Tell us about your project</label>
                <textarea placeholder="We're looking to build a new Shopify store..." rows={4} value={form.details} onChange={e => setForm({...form, details:e.target.value})} />
              </div>
              <button className="cp-submit">
                Submit Inquiry
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ borderTop:'1px solid var(--border)', paddingBottom:'160px' }}>
        <div className="wrap">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:'60px' }}>
            {OTHER_CONTACTS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1, ease }}
              >
                <p className="eyebrow">{c.label}</p>
                <h3 style={{ fontSize:'1.5rem', fontFamily:'var(--font-display)', fontWeight:'700', marginBottom:'12px', letterSpacing:'-0.02em', color:'var(--text)' }}>
                  {c.heading}
                </h3>
                <p style={{ color:'var(--text-2)', marginBottom:'16px', lineHeight:'1.6', fontSize:'0.94rem' }}>{c.desc}</p>
                <a 
                  href={c.email ? `mailto:${c.email}` : c.linkHref} 
                  target={c.linkHref ? "_blank" : undefined}
                  rel={c.linkHref ? "noopener noreferrer" : undefined}
                  style={{ color:'var(--violet-bright)', textDecoration:'underline', textUnderlineOffset:'4px', fontSize:'0.88rem', fontWeight:'600' }}
                >
                  {c.email || c.linkText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
