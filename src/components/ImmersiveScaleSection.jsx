import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { droneStore } from '../droneStore';
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

   // Track visibility for Honeybee Drone Effect
   const isInView = useInView(containerRef, { amount: 0.4 });
   useEffect(() => {
     droneStore.immSectionVisible = isInView;
     // Cleanup our global class if we leave the section
     if (!isInView) {
       document.body.classList.remove('drone-front');
       window.__droneFront = false;
     }
   }, [isInView]);

   return (
      <div className="immersive-layer-group" ref={containerRef}>
         <div className="immersive-bg" />
         <section className="immersive-container">
             <div className="immersive-sticky">
                 <motion.div 
                    className="immersive-content-wrapper"
                    style={{ opacity: fadeOpacity, y: textY, filter: blurAmount }}
                 >
                     <p className="immersive-label">The Acenzos Way</p>
                     <h2 className="immersive-huge-title">
                         We ship <i>results.</i>
                     </h2>
                     <p className="immersive-text-front">
                        From Shopify storefronts to AI products like Redber — we build software with purpose, speed, and a relentless focus on outcomes that matter to your business.
                     </p>
                     <button className="btn btn-dark" style={{ pointerEvents: 'auto' }}>
                        Start a Project
                     </button>
                 </motion.div>
             </div>
         </section>
      </div>
   )
}

export default ImmersiveScaleSection;
