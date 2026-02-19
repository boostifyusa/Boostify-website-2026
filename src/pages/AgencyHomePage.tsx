import React from 'react';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
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
      <SeoHead
        title="Boostify USA - Web Design & SEO Agency Fresno"
        description="Boostify USA builds high-converting websites and SEO strategies for local businesses in Fresno and the Central Valley. Turn your website into a 24/7 salesperson."
        keywords="Boostify USA Web Design & SEO, Website designer in Fresno, Fresno Web Design, Central Valley SEO, Small business marketing"
        canonicalUrl="/"
      />
      <SchemaJSON
        type="LocalBusiness"
        data={{
          "@id": "https://boostifyusa.com/#localbusiness",
          "name": "Boostify USA",
          "url": "https://boostifyusa.com",
          "telephone": "+1-559-785-3834",
          "contactPoint": [
            { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
            { "@type": "ContactPoint", "telephone": "+1-559-201-8706", "contactType": "customer service" }
          ],
          "email": "hello@boostifyusa.com",
          "logo": "https://boostifyusa.com/icon.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "6362 N Figarden Dr Ste 118",
            "addressLocality": "Fresno",
            "addressRegion": "CA",
            "postalCode": "93722",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.81,
            "longitude": -119.84
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
              "opens": "09:00",
              "closes": "19:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Friday",
              "opens": "09:00",
              "closes": "17:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "12:00"
            }
          ],
          "priceRange": "$$",
          "sameAs": [
            "https://www.instagram.com/boostifyusa/",
            "https://www.facebook.com/hyperboostusa/"
          ]
        }}
      />
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