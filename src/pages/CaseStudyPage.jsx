import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projects';
import CTASection from '../components/CTASection';
import './Pages.css';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.slug === slug);

  useEffect(() => {
    if (!project) {
      navigate('/work');
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <motion.div 
      className="page-wrapper cs-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Helmet>
        <title>{project.title} Case Study | Acenzos</title>
        <meta name="description" content={project.tagline} />
      </Helmet>

      {/* Hero Section */}
      <section className="cs-hero" style={{ background: project.color }}>
        <div className="wrap">
          <div className="cs-hero-content">
            <motion.p 
              className="eyebrow eyebrow-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Case Study / {project.year}
            </motion.p>
            <motion.h1 
              className="cs-display"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {project.title}
            </motion.h1>
            <motion.p 
              className="cs-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {project.tagline}
            </motion.p>
          </div>
        </div>
        <div className="cs-hero-bg-overlay" />
      </section>

      {/* Details Grid */}
      <section className="cs-content-section section-dark">
        <div className="wrap">
          <div className="cs-grid">
            <div className="cs-main">
              <div className="cs-block">
                <h2 className="cs-section-title">Overview</h2>
                <p className="cs-text">{project.overview}</p>
              </div>
              <div className="cs-block">
                <h2 className="cs-section-title">The Challenge</h2>
                <p className="cs-text">{project.challenge}</p>
              </div>
              <div className="cs-block">
                <h2 className="cs-section-title">The Solution</h2>
                <p className="cs-text">{project.solution}</p>
              </div>
            </div>

            <aside className="cs-side">
              <div className="cs-info-box">
                <h4 className="info-label">Category</h4>
                <p className="info-val">{project.category}</p>
              </div>
              <div className="cs-info-box">
                <h4 className="info-label">Tech Stack</h4>
                <div className="cs-tech-tags">
                  {project.techStack.map(s => <span key={s} className="cs-tech-tag">{s}</span>)}
                </div>
              </div>
              <div className="cs-results">
                {project.results.map(r => (
                  <div key={r.label} className="cs-result-item">
                    <span className="res-val">{r.value}</span>
                    <span className="res-lbl">{r.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Placeholder for Product Media */}
      <section className="cs-media-section section-dark">
        <div className="wrap">
          <div className="cs-media-placeholder">
            <div className="media-pulse" style={{ background: project.color }} />
            <p>Immersive {project.title} Showcase</p>
          </div>
        </div>
      </section>

      {/* Next Project Navigator */}
      <section className="cs-next-section">
        <Link to={`/work/${project.nextSlug}`} className="cs-next-link">
          <span className="next-label">Next Project</span>
          <h2 className="next-title">
            {PROJECTS_DATA.find(p => p.slug === project.nextSlug)?.title}
          </h2>
        </Link>
      </section>

      <CTASection />
    </motion.div>
  );
};

export default CaseStudyPage;
