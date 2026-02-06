import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AgencyHomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/web-design" element={<WebDesignPage />} />
        <Route path="/local-seo" element={<LocalSEOPage />} />
        <Route path="/local-marketing" element={<LocalMarketingPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/work" element={<OurWorkPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/sms" element={<SMSProgramPage />} />
        <Route path="/app-development" element={<AppDevelopmentPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
}