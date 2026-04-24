import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './StackedCards.css';

import img1 from '../assets/imgs/3175466.jpg';
import img2 from '../assets/imgs/10510710.jpg';
import img3 from '../assets/imgs/10607573.jpg';
import img4 from '../assets/imgs/11194857.jpg';

const services = [
  {
    id: 1, num: '01',
    title: 'AI Products',
    description: 'We build AI-powered platforms that work in production. Redber is our own — a 24/7 conversational AI for lead capture and business automation.',
    tags: ['Redber AI', 'LLM Integration', 'Automation', 'APIs'],
    bg: '#100e1f', accent: '#9b7fe8', img: img1,
    size: 'large',
  },
  {
    id: 2, num: '02',
    title: 'Web Applications',
    description: 'Full-stack web applications and client portals — engineered to perform at scale, built with React and Node.js.',
    tags: ['React', 'Node.js', 'Portals', 'Custom UI'],
    bg: '#0e1221', accent: '#4db8ff', img: img3,
    size: 'small',
  },
  {
    id: 3, num: '03',
    title: 'UI/UX Design',
    description: 'Design systems, interaction design, and visual identities that make applications feel premium at every touchpoint.',
    tags: ['Figma', 'Design Systems', 'Motion', 'Prototyping'],
    bg: '#1a130e', accent: '#f0b840', img: img4,
    size: 'small',
  },
  {
    id: 4, num: '04',
    title: 'Digital Strategy',
    description: 'From product roadmaps to technical architecture — we help teams define, scope, and execute digital ecosystems with clarity.',
    tags: ['Product Strategy', 'Architecture', 'CRO', 'Consulting'],
    bg: '#0e1a12', accent: '#b5f23a', img: img2,
    size: 'wide',
  },
];

const ServiceCard = ({ service, index }) => (
  <motion.div
    className={`svc-card svc-card--${service.size}`}
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.70, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Number badge */}
      <span className="svc-num" style={{ color: service.accent + '60' }}>{service.num}</span>

      {/* Content */}
      <div className="svc-body">
        <h3 className="svc-title" style={{ '--acc': service.accent }}>{service.title}</h3>
        <p className="svc-desc">{service.description}</p>
        <div className="svc-tags">
          {service.tags.map(t => (
            <span key={t} className="svc-tag" style={{ borderColor: service.accent + '30', color: service.accent + 'bb' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="svc-img-wrap">
        <img src={service.img} alt={service.title} className="svc-img" />
        <div className="svc-img-overlay" style={{ background: `linear-gradient(135deg, ${service.bg}40 0%, transparent 60%)` }} />
      </div>

      {/* Bottom arrow */}
      <div className="svc-arrow" style={{ background: service.accent + '18', color: service.accent }}>→</div>
    </motion.div>
);

const StackedCards = () => {

  return (
    <div className="svc-layer-group">
      <div className="svc-layer-bg" />
      <section className="svc-section" id="services">
        <div className="wrap">

        {/* Header */}
        <div className="svc-header">
          <motion.p
            className="eyebrow eyebrow-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="h-xl svc-heading"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
            style={{ color: 'var(--text-dark)' }}
          >
            We build <span className="shimmer-grey">products</span> that drive<br />
            real business growth.
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="svc-bento">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

      </div>
    </section>
    </div>
  );
};

export default StackedCards;
