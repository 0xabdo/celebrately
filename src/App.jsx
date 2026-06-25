import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Lenis from 'lenis';

// Pages & Templates
import Showcase from './pages/Showcase';
import WeddingWebsite from './templates/wedding-website/WeddingWebsite';
import WeddingInvitation from './templates/wedding-invitation/WeddingInvitation';
import BirthdayCelebration from './templates/birthday/BirthdayCelebration';
import BabyShower from './templates/baby-shower/BabyShower';
import BabyAnnouncement from './templates/baby-announcement/BabyAnnouncement';
import Graduation from './templates/graduation/Graduation';
import Engagement from './templates/engagement/Engagement';
import PartyInvitation from './templates/party/PartyInvitation';
import RSVPLandingPage from './templates/rsvp-landing/RSVPLandingPage';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Showcase />
            <Footer />
          </PageTransition>
        } />
        <Route path="/wedding" element={
          <PageTransition>
            <WeddingWebsite />
          </PageTransition>
        } />
        <Route path="/invitation" element={
          <PageTransition>
            <WeddingInvitation />
          </PageTransition>
        } />
        <Route path="/birthday" element={
          <PageTransition>
            <BirthdayCelebration />
          </PageTransition>
        } />
        <Route path="/baby-shower" element={
          <PageTransition>
            <BabyShower />
          </PageTransition>
        } />
        <Route path="/baby-announcement" element={
          <PageTransition>
            <BabyAnnouncement />
          </PageTransition>
        } />
        <Route path="/graduation" element={
          <PageTransition>
            <Graduation />
          </PageTransition>
        } />
        <Route path="/engagement" element={
          <PageTransition>
            <Engagement />
          </PageTransition>
        } />
        <Route path="/party" element={
          <PageTransition>
            <PartyInvitation />
          </PageTransition>
        } />
        <Route path="/rsvp" element={
          <PageTransition>
            <RSVPLandingPage />
          </PageTransition>
        } />
        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center text-center px-4">
            <div>
              <div className="text-8xl mb-4">🎭</div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
              <p className="text-gray-500 mb-6">This page seems to have left the party.</p>
              <a href="/" className="px-6 py-3 rounded-full bg-wedding-500 text-white font-semibold hover:bg-wedding-600 transition-colors">
                Back to Templates
              </a>
            </div>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Decelerating curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
