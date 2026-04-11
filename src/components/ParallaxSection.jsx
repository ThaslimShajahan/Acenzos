import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Parallax.css';

const ParallaxSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={ref} className="parallax-section">
      <motion.div className="parallax-bg" style={{ y: yBg }}>
        {/* We would usually have a high-res image here, but a complex gradient/pattern works for the tech vibe */}
        <div className="abstract-pattern"></div>
      </motion.div>
      
      <div className="container relative-z">
        <motion.div className="parallax-content" style={{ y: yText }}>
          <h2>Transforming Visions into <span className="text-gradient">Digital Reality</span></h2>
          <button className="btn-primary large mt-8">Start Your Journey</button>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxSection;
