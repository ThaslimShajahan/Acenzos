import React, { useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projects';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';
import './Pages.css';

const ease = [0.16, 1, 0.3, 1];

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
};

const CaseStudyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.slug === slug);
  const nextProject = PROJECTS_DATA.find(p => p.slug === project?.nextSlug);

  if (!project) { navigate('/work'); return null; }

  const siteUrl = 'https://acenzos.com';
  const canonical = `${siteUrl}/work/${project.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.overview,
    url: canonical,
    author: { '@type': 'Organization', name: 'Acenzos', url: siteUrl },
    dateCreated: project.year,
    keywords: [...project.techStack, project.category, 'Acenzos', 'case study'].join(', '),
  };

  return (
    <motion.div
      className="cs-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <Helmet>
        <title>{project.title} — Case Study | Acenzos</title>
        <meta name="description" content={project.tagline} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type"        content="article" />
        <meta property="og:url"         content={canonical} />
        <meta property="og:title"       content={`${project.title} — Case Study | Acenzos`} />
        <meta property="og:description" content={project.tagline} />
        <meta property="og:image"       content={`${siteUrl}/og/work-${project.slug}.jpg`} />
        <meta property="og:site_name"   content="Acenzos" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:site"        content="@acenzos" />
        <meta name="twitter:title"       content={`${project.title} — Acenzos`} />
        <meta name="twitter:description" content={project.tagline} />
        <meta name="twitter:image"       content={`${siteUrl}/og/work-${project.slug}.jpg`} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="cs2-hero">
        <div className="cs2-hero-img-wrap">
          <img src={project.img} alt={project.title} className="cs2-hero-img" />
          <div className="cs2-hero-overlay" />
        </div>

        <div className="wrap cs2-hero-content">
          <div style={{ marginBottom: '40px' }}>
            <Breadcrumbs crumbs={[
              { label: 'Home', path: '/' },
              { label: 'Work', path: '/work' },
              { label: project.title }
            ]} />
          </div>

          <div className="cs2-hero-meta">
            <span className="cs2-num">{project.number}</span>
            <span className="cs2-pill">{project.category}</span>
            <span className="cs2-pill">{project.year}</span>
          </div>

          <motion.h1
            className="cs2-title"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="cs2-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            {project.tagline}
          </motion.p>

          <motion.div
            className="cs2-hero-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <div className="cs2-hero-services">
              {project.services.map(s => (
                <span key={s} className="cs2-service-tag">{s}</span>
              ))}
            </div>
            <div className="cs2-hero-info">
              <div className="cs2-info-item">
                <span className="cs2-info-label">Timeline</span>
                <span className="cs2-info-val">{project.timeline}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results strip ── */}
      <section className="cs2-results-strip">
        <div className="wrap">
          <div className="cs2-results-row">
            {project.results.map((r, i) => (
              <motion.div
                key={r.label}
                className="cs2-result"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <span className="cs2-result-val">{r.value}</span>
                <span className="cs2-result-lbl">{r.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="cs2-body">
        <div className="wrap">
          <div className="cs2-grid">

            {/* Left column: story */}
            <div className="cs2-main">
              <FadeUp>
                <div className="cs2-section-label">Overview</div>
                <p className="cs2-body-text">{project.overview}</p>
              </FadeUp>

              <FadeUp delay={0.05}>
                <div className="cs2-divider" />
                <div className="cs2-section-label">The Challenge</div>
                <p className="cs2-body-text">{project.challenge}</p>
              </FadeUp>

              <FadeUp delay={0.05}>
                <div className="cs2-divider" />
                <div className="cs2-section-label">The Solution</div>
                <p className="cs2-body-text">{project.solution}</p>
              </FadeUp>
            </div>

            {/* Right column: deliverables + stack */}
            <aside className="cs2-side">
              <div className="cs2-side-block">
                <div className="cs2-side-label">Deliverables</div>
                <ul className="cs2-deliverables">
                  {project.deliverables.map(d => (
                    <li key={d} className="cs2-deliverable-item">
                      <span className="cs2-check">↳</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cs2-side-block">
                <div className="cs2-side-label">Tech Stack</div>
                <div className="cs2-stack-tags">
                  {project.techStack.map(t => (
                    <span key={t} className="cs2-stack-tag">{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Visual showcase ── */}
      <section className="cs2-visual">
        <div className="wrap">
          <FadeUp>
            <div className="cs2-visual-wrap">
              <img src={project.detailImg} alt={`${project.title} detail`} className="cs2-visual-img" />
              <div className="cs2-visual-overlay" />
              <div className="cs2-visual-label">
                <span>{project.title}</span>
                <span className="cs2-visual-year">{project.year}</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="cs2-process">
        <div className="wrap">
          <FadeUp>
            <div className="cs2-section-header">
              <span className="cs2-section-eyebrow">[ Process ]</span>
              <h2 className="cs2-section-title">How we built it</h2>
            </div>
          </FadeUp>

          <div className="cs2-process-grid">
            {project.processSteps.map((step, i) => (
              <FadeUp key={step.phase} delay={i * 0.08}>
                <div className="cs2-process-card">
                  <span className="cs2-process-phase">{step.phase}</span>
                  <h3 className="cs2-process-title">{step.title}</h3>
                  <p className="cs2-process-desc">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next project ── */}
      {nextProject && (
        <section className="cs2-next">
          <div className="wrap">
            <div className="cs2-next-label">Next Project</div>
            <Link to={`/work/${nextProject.slug}`} className="cs2-next-link">
              <div className="cs2-next-inner">
                <div className="cs2-next-text">
                  <span className="cs2-next-num">{nextProject.number}</span>
                  <h2 className="cs2-next-title">{nextProject.title}</h2>
                  <p className="cs2-next-cat">{nextProject.category}</p>
                </div>
                <div className="cs2-next-arrow">↗</div>
              </div>
              <div className="cs2-next-img-wrap">
                <img src={nextProject.img} alt={nextProject.title} className="cs2-next-img" />
              </div>
            </Link>
          </div>
        </section>
      )}

      <CTASection />
    </motion.div>
  );
};

export default CaseStudyPage;
