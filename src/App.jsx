import React, { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';

// Pre-fetch all route chunks during preload so transitions are instant
const workImport       = import('./pages/WorkPage');
const expertiseImport  = import('./pages/ExpertisePage');
const studioImport     = import('./pages/StudioPage');
const contactImport    = import('./pages/ContactPage');
const caseStudyImport  = import('./pages/CaseStudyPage');

const WorkPage      = lazy(() => workImport);
const ExpertisePage = lazy(() => expertiseImport);
const StudioPage    = lazy(() => studioImport);
const ContactPage   = lazy(() => contactImport);
const CaseStudyPage = lazy(() => caseStudyImport);


function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      const lenis = new Lenis({ lerp: 0.085, smoothTouch: false });
      window.lenis = lenis;
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      const id = requestAnimationFrame(raf);
      return () => {
        lenis.destroy();
        window.lenis = null;
        cancelAnimationFrame(id);
      };
    }
  }, [loading]);

  // Scroll to top on every route change
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, loading]);

  return (
    <LayoutGroup>
      {/* Scroll progress bar — always visible */}
      <ScrollProgressBar />

      {/* Custom cursor — always rendered */}
      <Cursor />

      {/* Back to top — always rendered */}
      <BackToTop />

      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence
              mode="wait"
              initial={false}
              onExitComplete={() => {
                window.scrollTo(0, 0);
                window.lenis?.scrollTo(0, { immediate: true });
              }}
            >
              <Suspense fallback={<div style={{ flex: 1, background: 'var(--void)' }} />}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/"             element={<Home />} />
                  <Route path="/work"          element={<WorkPage />} />
                  <Route path="/work/:slug"    element={<CaseStudyPage />} />
                  <Route path="/expertise"     element={<ExpertisePage />} />
                  <Route path="/studio"        element={<StudioPage />} />
                  <Route path="/contact"       element={<ContactPage />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      )}
    </LayoutGroup>
  );
}

export default App;
