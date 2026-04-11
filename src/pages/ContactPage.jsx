import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Pages.css';

const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', details: '' });

  return (
    <motion.div 
      className="page-wrapper page-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Helmet>
        <title>Let's Talk | Acenzos</title>
        <meta name="description" content="Start a conversation with our team to build your next digital product." />
      </Helmet>
      
      <section className="page-hero">
        <div className="wrap cp-grid">
          
          <div className="cp-left">
            <motion.p 
              className="eyebrow eyebrow-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Start a project
            </motion.p>
            <motion.h1 
              className="h-display h-white cp-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Let's build<br/>something <i>iconic</i>.
            </motion.h1>
            
            <div className="cp-contact-info">
              <div>
                <h4>New Business</h4>
                <a href="mailto:hello@acenzos.com">hello@acenzos.com</a>
              </div>
              <div>
                <h4>Headquarters</h4>
                <p>Dubai Design District<br/>D3, Building 4<br/>Dubai, UAE</p>
              </div>
            </div>
          </div>

          <motion.div 
            className="cp-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="cp-form" onSubmit={(e) => e.preventDefault()}>
              
              <div className="cp-input-group">
                <label>01. What's your name?</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                />
              </div>

              <div className="cp-input-group">
                <label>02. What's your email address?</label>
                <input 
                  type="email" 
                  placeholder="john@company.com" 
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                />
              </div>

              <div className="cp-input-group">
                <label>03. Tell us about your project</label>
                <textarea 
                  placeholder="We are looking to build a new FinTech platform targeting..." 
                  rows={4}
                  value={formState.details}
                  onChange={e => setFormState({...formState, details: e.target.value})}
                />
              </div>

              <button className="cp-submit">
                Submit Inquiry
                <ArrowRight size={20} />
              </button>

            </form>
          </motion.div>

        </div>
      </section>

      {/* Other Inquiries Section */}
      <section className="section" style={{ borderTop: '1px solid var(--border-dark)', marginTop: '80px', paddingBottom: '160px' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}>
              <p className="eyebrow eyebrow-dark">Press & PR</p>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'var(--font-serif)', color: '#fff' }}>Media Inquiries</h3>
              <p style={{ color: 'var(--text-dark-2)', marginBottom: '16px' }}>For interviews, brand assets, and press releases.</p>
              <a href="mailto:press@acenzos.com" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>press@acenzos.com</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.2 }}>
              <p className="eyebrow eyebrow-dark">Join Us</p>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'var(--font-serif)', color: '#fff' }}>Careers</h3>
              <p style={{ color: 'var(--text-dark-2)', marginBottom: '16px' }}>We are always looking for world-class talent to join the swarm.</p>
              <a href="mailto:careers@acenzos.com" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>careers@acenzos.com</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.3 }}>
              <p className="eyebrow eyebrow-dark">General</p>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'var(--font-serif)', color: '#fff' }}>Everything Else</h3>
              <p style={{ color: 'var(--text-dark-2)', marginBottom: '16px' }}>Not sure who to contact? Drop a line here.</p>
              <a href="mailto:info@acenzos.com" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>info@acenzos.com</a>
            </motion.div>

          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default ContactPage;
