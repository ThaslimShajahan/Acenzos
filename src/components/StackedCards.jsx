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
    title: 'Brand Identity',
    description: 'We craft distinctive visual identities that define how your brand feels, speaks and stands out in a crowded world with lasting impact.',
    tags: ['Logo Design', 'Typography', 'Color System', 'Guidelines'],
    bg: '#0e1221', accent: '#4f8eff', img: img2,
    size: 'large',
  },
  {
    id: 2, num: '02',
    title: 'Web & App Development',
    description: 'From pixel-perfect web apps to native mobile experiences — fast, scalable, and delivered with craft.',
    tags: ['React', 'Next.js', 'iOS/Android', 'CMS'],
    bg: '#120e1f', accent: '#9f6fff', img: img3,
    size: 'small',
  },
  {
    id: 3, num: '03',
    title: 'Digital Marketing',
    description: 'Data-led campaigns that connect with your audiences and convert at every stage of the funnel.',
    tags: ['SEO', 'Social', 'Content', 'Email'],
    bg: '#0e1a14', accent: '#1ed8a0', img: img4,
    size: 'small',
  },
  {
    id: 4, num: '04',
    title: '3D & Immersive',
    description: 'Immersive 3D renders and WebGL experiences that make your products irresistible before they even ship.',
    tags: ['WebGL', 'Three.js', '3D Renders', 'Animation'],
    bg: '#1a0e0e', accent: '#ff6b52', img: img1,
    size: 'wide',
  },
];

const ServiceCard = ({ service, index }) => (
  <motion.div
    className={`svc-card svc-card--${service.size}`}
    style={{ background: service.bg }}
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
        <div className="svc-img-overlay" style={{ background: `linear-gradient(135deg, ${service.bg}dd 0%, transparent 60%)` }} />
      </div>

      {/* Bottom arrow */}
      <div className="svc-arrow" style={{ background: service.accent + '18', color: service.accent }}>→</div>
    </motion.div>
);

const StackedCards = () => {

  return (
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
            We are an <span className="shimmer-grey">unusual</span> digital agency<br />
            focusing on your vision.
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
  );
};

export default StackedCards;
