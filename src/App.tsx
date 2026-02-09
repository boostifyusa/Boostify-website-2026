import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
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
import { NotFoundPage } from './pages/NotFoundPage';
import { SitemapPage } from './pages/SitemapPage';

export function ScrollToTopOrHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If we have a hash, try to scroll to that element
    if (hash) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // No hash = scroll to top normally
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTopOrHash />
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
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}