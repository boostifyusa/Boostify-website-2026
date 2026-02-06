import React, { useEffect, useState } from 'react';
import { AgencyHomePage } from './pages/AgencyHomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WebDesignPage } from './pages/WebDesignPage';
import { LocalSEOPage } from './pages/LocalSEOPage';
import { LocalMarketingPage } from './pages/LocalMarketingPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { SMSProgramPage } from './pages/SMSProgramPage';
import { AppDevelopmentPage } from './pages/AppDevelopmentPage';
export function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  if (route === '#/services') return <ServicesPage />;
  if (route === '#/web-design') return <WebDesignPage />;
  if (route === '#/local-seo') return <LocalSEOPage />;
  if (route === '#/local-marketing') return <LocalMarketingPage />;
  if (route === '#/maintenance') return <MaintenancePage />;
  if (route === '#/about') return <AboutPage />;
  if (route === '#/contact') return <ContactPage />;
  if (route === '#/work') return <OurWorkPage />;
  if (route === '#/privacy') return <PrivacyPolicyPage />;
  if (route === '#/terms') return <TermsOfServicePage />;
  if (route === '#/sms') return <SMSProgramPage />;
  if (route === '#/app-development') return <AppDevelopmentPage />;
  if (route.startsWith('#/blog/')) return <BlogPostPage />;
  return <AgencyHomePage />;
}