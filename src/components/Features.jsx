import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Layers, Shield } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Sparkles size={32} />,
    title: "Dynamic Interfaces",
    description: "Creating highly engaging, interactive experiences combining 3D elements and micro-animations."
  },
  {
    icon: <Activity size={32} />,
    title: "High Performance",
    description: "Optimized for speed. We build web platforms that score 100 on Lighthouse with seamless transitions."
  },
  {
    icon: <Layers size={32} />,
    title: "Scalable Architecture",
    description: "Built on resilient, modular architectures that grow effortlessly alongside your business demands."
  },
  {
    icon: <Shield size={32} />,
    title: "Enterprise Security",
    description: "Integrating top-tier security standards to ensure your digital assets remain completely protected."
  }
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Elevating the <span className="text-gradient">Standard</span></h2>
          <p className="section-subtitle">We don't just build websites. We engineer scalable digital ecosystems designed to outperform.</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <div className="feature-icon glow-effect">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
