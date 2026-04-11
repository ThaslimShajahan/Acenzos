import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ImmersiveScaleSection.css';

const ImmersiveScaleSection = () => {
   const containerRef = useRef(null);
   
   // Keep it elegant and smooth
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
   });

   // Smooth scale and fade in
   const fadeOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.45], [0, 1, 1]);
   const textY = useTransform(scrollYProgress, [0.1, 0.3], ["40px", "0px"]);
   const blurAmount = useTransform(scrollYProgress, [0.1, 0.25], ["blur(10px)", "blur(0px)"]);

   return (
      <section className="immersive-container" ref={containerRef}>
          <div className="immersive-sticky">
              <motion.div 
                 className="immersive-content-wrapper"
                 style={{ opacity: fadeOpacity, y: textY, filter: blurAmount }}
              >
                  <p className="immersive-label">The Blueprint</p>
                  <h2 className="immersive-huge-title">
                      Architecting <i>digitally.</i>
                  </h2>
                  <p className="immersive-text-front">
                     We blend raw art and complex code to construct digital environments that captivate, convert, and leave a permanent legacy.
                  </p>
                  <button className="btn btn-dark" style={{ pointerEvents: 'auto' }}>
                     Explore Our Process
                  </button>
              </motion.div>
          </div>
      </section>
   )
}

export default ImmersiveScaleSection;
