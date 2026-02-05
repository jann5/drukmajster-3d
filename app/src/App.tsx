import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomeSection } from './sections/HomeSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { GallerySection } from './sections/GallerySection';
import { ContactSection } from './sections/ContactSection';
import { AdminPage } from './sections/AdminPage';
import Lenis from 'lenis';
import { ConvexProvider } from "convex/react";
import { convex } from "./lib/convexClient";

function MainPage() {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 4 dots: home (0), benefits (1), gallery (2), contact (3)
  const sectionIds = ['home', 'benefits', 'gallery', 'contact'];

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(sectionIds[index]);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = () => {
    setActiveSection(0);
    const element = document.getElementById('home');
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(element);
      else element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'auto';

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Observe 4 sections: home, benefits, gallery, contact
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) setActiveSection(index);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative bg-white">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[100]"
        style={{ scaleX }}
      />

      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onHomeClick={handleHomeClick}
      />

      {/* Main Content */}
      <main className="md:pl-20 w-full overflow-x-hidden">
        <HomeSection />
        <BenefitsSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const convexUrl = import.meta.env.VITE_CONVEX_URL;
        console.log("Analytics: Tracking visit...", { convexUrl });

        if (!convexUrl) {
          console.warn("Analytics: Missing VITE_CONVEX_URL");
          return;
        }

        // Convert VITE_CONVEX_URL (e.g. https://deployment.convex.cloud) to SITE URL (https://deployment.convex.site)
        // Site URL is required for httpRouter
        const httpUrl = convexUrl
          .replace("wss://", "https://")
          .replace("ws://", "http://")
          .replace(".convex.cloud", ".convex.site");

        console.log("Analytics: Sending to", httpUrl);

        const response = await fetch(`${httpUrl}/analytics/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: location.pathname }),
        });

        console.log("Analytics: Request sent", { status: response.status });
      } catch (err) {
        console.error("Analytics: Error", err);
      }
    };

    trackVisit();
  }, [location]);

  return null;
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  );
}
