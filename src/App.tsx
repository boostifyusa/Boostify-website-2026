import { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AgencyHomePage } from './pages/AgencyHomePage';
import { HomePageV2 } from './pages/HomePageV2';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages for better performance
// AgencyHomePage is imported directly to improve LCP (Largest Contentful Paint) for the main landing page
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const WebDesignPage = lazy(() => import('./pages/WebDesignPage').then(module => ({ default: module.WebDesignPage })));
const LocalSEOPage = lazy(() => import('./pages/LocalSEOPage').then(module => ({ default: module.LocalSEOPage })));
const LocalMarketingPage = lazy(() => import('./pages/LocalMarketingPage').then(module => ({ default: module.LocalMarketingPage })));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage').then(module => ({ default: module.MaintenancePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const OurWorkPage = lazy(() => import('./pages/OurWorkPage').then(module => ({ default: module.OurWorkPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const SMSProgramPage = lazy(() => import('./pages/SMSProgramPage').then(module => ({ default: module.SMSProgramPage })));
const AppDevelopmentPage = lazy(() => import('./pages/AppDevelopmentPage').then(module => ({ default: module.AppDevelopmentPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then(module => ({ default: module.SitemapPage })));
const AIPage = lazy(() => import('./pages/AIPage').then(module => ({ default: module.AIPage })));
const SEOAuditPage = lazy(() => import('./pages/SEOAuditPage').then(module => ({ default: module.SEOAuditPage })));
const LinksPage = lazy(() => import('./pages/LinksPage').then(module => ({ default: module.LinksPage })));

const ReferralProgramPage = lazy(() => import('./pages/ReferralProgramPage').then(module => ({ default: module.ReferralProgramPage })));
const PartnerLoginPage = lazy(() => import('./pages/PartnerLoginPage').then(module => ({ default: module.PartnerLoginPage })));
const PartnerDashboardPage = lazy(() => import('./pages/PartnerDashboardPage').then(module => ({ default: module.PartnerDashboardPage })));
const PartnerLeadPage = lazy(() => import('./pages/PartnerLeadPage').then(module => ({ default: module.PartnerLeadPage })));
const PartnerQRPage = lazy(() => import('./pages/PartnerQRPage').then(module => ({ default: module.PartnerQRPage })));

const ClovisMarketingAgencyPage = lazy(() => import('./pages/ClovisMarketingAgencyPage').then(module => ({ default: module.ClovisMarketingAgencyPage })));
const VisaliaMarketingAgencyPage = lazy(() => import('./pages/VisaliaMarketingAgencyPage').then(module => ({ default: module.VisaliaMarketingAgencyPage })));
const MaderaMarketingAgencyPage = lazy(() => import('./pages/MaderaMarketingAgencyPage').then(module => ({ default: module.MaderaMarketingAgencyPage })));
const HanfordMarketingAgencyPage = lazy(() => import('./pages/HanfordMarketingAgencyPage').then(module => ({ default: module.HanfordMarketingAgencyPage })));
const MercedMarketingAgencyPage = lazy(() => import('./pages/MercedMarketingAgencyPage').then(module => ({ default: module.MercedMarketingAgencyPage })));
const TulareMarketingAgencyPage = lazy(() => import('./pages/TulareMarketingAgencyPage').then(module => ({ default: module.TulareMarketingAgencyPage })));
const SangerMarketingAgencyPage = lazy(() => import('./pages/SangerMarketingAgencyPage').then(module => ({ default: module.SangerMarketingAgencyPage })));
const WebDesignModestoPage = lazy(() => import('./pages/WebDesignModestoPage').then(module => ({ default: module.WebDesignModestoPage })));
const CampaignLandingPage = lazy(() => import('./pages/CampaignLandingPage').then(module => ({ default: module.CampaignLandingPage })));


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
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-orange/20 border-t-orange rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<HomePageV2 />} />
              <Route path="/v1" element={<AgencyHomePage />} />
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
              <Route path="/ai-automation" element={<AIPage />} />
              <Route path="/seo-audit" element={<SEOAuditPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/links" element={<LinksPage />} />

              <Route path="/partners" element={<ReferralProgramPage />} />
              <Route path="/partners/login" element={<PartnerLoginPage />} />
              <Route path="/partners/dashboard" element={<PartnerDashboardPage />} />
              <Route path="/partners/qr/:partnerId" element={<PartnerQRPage />} />
              <Route path="/referral/:partnerId" element={<PartnerLeadPage />} />

              <Route path="/clovis-marketing-agency" element={<ClovisMarketingAgencyPage />} />
              <Route path="/visalia-marketing-agency" element={<VisaliaMarketingAgencyPage />} />
              <Route path="/madera-marketing-agency" element={<MaderaMarketingAgencyPage />} />
              <Route path="/hanford-marketing-agency" element={<HanfordMarketingAgencyPage />} />
              <Route path="/merced-marketing-agency" element={<MercedMarketingAgencyPage />} />
              <Route path="/tulare-marketing-agency" element={<TulareMarketingAgencyPage />} />
              <Route path="/sanger-marketing-agency" element={<SangerMarketingAgencyPage />} />
              <Route path="/modesto-web-design" element={<WebDesignModestoPage />} />
              <Route path="/campaign" element={<CampaignLandingPage />} />

              {/* SEO 301 Redirects — old Fresno pages → generic service pages */}
              <Route path="/fresno-marketing-agency" element={<Navigate to="/local-marketing" replace />} />
              <Route path="/fresno-web-design" element={<Navigate to="/web-design" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}