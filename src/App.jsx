import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import ExpertisePage from './pages/ExpertisePage';
import StudioPage from './pages/StudioPage';
import ContactPage from './pages/ContactPage';

// Import consolidated section styles
import './components/StackedCards.css';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Only init Lenis after loading is done to prevent pre-scroll glitches
    if (!loading) {
      const lenis = new Lenis({ lerp: 0.10, smoothTouch: false });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      const id = requestAnimationFrame(raf);
      return () => { lenis.destroy(); cancelAnimationFrame(id); };
    }
  }, [loading]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Navbar />
          
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/expertise" element={<ExpertisePage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
