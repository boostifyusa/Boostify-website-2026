import React from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { TrustBadges } from '../components/TrustBadges';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { WorkShowcase } from '../components/WorkShowcase';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { StatsSection } from '../components/StatsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function AgencyHomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBadges />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />
        <WorkShowcase />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}