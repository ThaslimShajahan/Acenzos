import React from 'react';
import { Helmet } from 'react-helmet-async';

import Hero from '../components/Hero';
import { StatsBar, AboutSection } from '../components/StatsBar';
import WorkSection from '../components/WorkSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import ClientsSection from '../components/ClientsSection';
import WorldQuantSection from '../components/WorldQuantSection';
import StackedCards from '../components/StackedCards';
import ImmersiveScaleSection from '../components/ImmersiveScaleSection';
import CTASection from '../components/CTASection';
import TechSwarm from '../components/TechSwarm';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Acenzos — Shopify Development & AI Products</title>
        <meta name="description" content="Acenzos builds Shopify storefronts, custom web apps, and AI-powered products like Redber. Based in Kerala, India." />
      </Helmet>
      
      {/* 3D Drone only lives on the Home page */}
      <TechSwarm />
      
      <main>
        <Hero />
        <StatsBar />
        <AboutSection />
        <WorkSection />
        <CapabilitiesSection />
        <ClientsSection />
        <WorldQuantSection />
        <StackedCards />
        <ImmersiveScaleSection />
        <CTASection />
      </main>
    </>
  );
};

export default Home;
