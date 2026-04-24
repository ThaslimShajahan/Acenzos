import React from 'react';
import { Helmet } from 'react-helmet-async';

import Hero from '../components/Hero';
import { AboutSection } from '../components/StatsBar';
import WorkSection from '../components/WorkSection';
import MarqueeSection from '../components/MarqueeSection';
import ScrollShowcase from '../components/ScrollShowcase';
import CapabilitiesSection from '../components/CapabilitiesSection';
import WorldQuantSection from '../components/WorldQuantSection';
import ImmersiveScaleSection from '../components/ImmersiveScaleSection';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Acenzos — Commerce Architecture & Applied AI</title>
        <meta name="description" content="Acenzos builds AI products, Shopify storefronts, and custom web applications. Fast, clean, and built to scale." />
        <link rel="canonical" href="https://acenzos.com/" />
        <meta property="og:title"       content="Acenzos — Commerce Architecture & Applied AI" />
        <meta property="og:description" content="We build AI products, Shopify storefronts, and custom web platforms. Fast, clean, and built to last." />
        <meta property="og:url"         content="https://acenzos.com/" />
        <meta name="twitter:title"       content="Acenzos — Commerce Architecture & Applied AI" />
        <meta name="twitter:description" content="We build AI products, Shopify storefronts, and custom web platforms." />
      </Helmet>

      <main>
        <Hero />
        <AboutSection />
        <WorkSection />
        <MarqueeSection />
        <ScrollShowcase />
        <CapabilitiesSection />
        <WorldQuantSection />
        <ImmersiveScaleSection />
        <CTASection />
      </main>
    </>
  );
};

export default Home;
