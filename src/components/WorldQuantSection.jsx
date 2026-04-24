import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './WorldQuantSection.css';

const ETHOS = [
  {
    num: '01',
    title: 'Products We Own',
    text: "We don't just build for clients. Redber AI is our own in-house product — an AI communication platform that helps businesses capture leads and automate support around the clock.",
  },
  {
    num: '02',
    title: 'Craft Over Templates',
    text: 'Every project we take on is built from the ground up. No templates, no copy-paste code. We engineer solutions that are specific to your problem and built to last.',
  },
  {
    num: '03',
    title: 'Speed to Market',
    text: "We move fast without cutting corners. Our lean team and proven processes let us go from brief to live product in weeks, not months — giving you a real competitive edge.",
  },
  {
    num: '04',
    title: 'Long-Term Partners',
    text: "We don't hand off and disappear. Our clients stay with us because we stay invested — iterating, improving, and growing alongside their business over time.",
  },
];

const ease = [0.16, 1, 0.3, 1];

const WorldQuantSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section className="wq-section" ref={ref}>
      {/* Ghost section number */}
      <span className="gs-num" aria-hidden>04</span>

      <div className="wrap wq-wrap">

        {/* Section header */}
        <motion.div
          className="wq-hd"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="wq-hd-label">[ Our Approach ]</span>
          <div className="wq-hd-line" />
          <span className="wq-hd-label">2026 —</span>
        </motion.div>

        {/* Intro row */}
        <div className="wq-intro">
          <h2 className="wq-title">
            {['Build Fast.', 'em:Ship Smart.'].map((line, i) => (
              <div key={i} className="mask-line-wrap" style={{ lineHeight: 'inherit' }}>
                <motion.div
                  className="mask-line-inner"
                  initial={{ y: '104%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.12 + i * 0.1 }}
                >
                  {line.startsWith('em:')
                    ? <em className="wq-title-em">{line.slice(3)}</em>
                    : line}
                </motion.div>
              </div>
            ))}
          </h2>
          <motion.p
            className="wq-desc"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            We believe great software is the difference between a business that survives
            and one that dominates. Whether it's an AI platform or a custom web application,
            we build with intention, speed, and a relentless focus on real outcomes.
          </motion.p>
        </div>

        {/* Ethos rows */}
        <div className="wq-list">
          {ETHOS.map((item, i) => (
            <motion.div
              key={item.num}
              className="wq-row"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.10, ease }}
            >
              <span className="wq-row-num">{item.num}</span>
              <h3 className="wq-row-title">{item.title}</h3>
              <p className="wq-row-text">{item.text}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};


export default WorldQuantSection;
