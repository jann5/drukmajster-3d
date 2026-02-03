import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomeSection } from './sections/HomeSection';
import { BenefitsSection } from './sections/BenefitsSection';
// import { UseCasesSection } from './sections/UseCasesSection';
import { ContactSection } from './sections/ContactSection';
import { GalleryOverlay } from './components/GalleryOverlay';
import { AdminPage } from './sections/AdminPage';
import Lenis from 'lenis';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3 dots: home (index 0), benefits (index 1), contact (index 2)
  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const sectionIds = ['home', 'benefits', 'contact'];
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
    const handleLocationChange = () => {
      setIsAdmin(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const syncGalleryState = () => {
      setIsGalleryOpen(window.location.hash === '#realizacje');
    };
    window.addEventListener('hashchange', syncGalleryState);
    window.addEventListener('popstate', syncGalleryState);
    syncGalleryState();
    return () => {
      window.removeEventListener('hashchange', syncGalleryState);
      window.removeEventListener('popstate', syncGalleryState);
    };
  }, []);

  useEffect(() => {
    if (isAdmin) {
      document.body.style.overflow = 'auto';
      return;
    }

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

    // Observe 3 sections: home, benefits, contact
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIds = ['home', 'benefits', 'contact'];
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) setActiveSection(index);
        }
      });
    }, observerOptions);

    const observedIds = ['home', 'benefits', 'contact'];
    observedIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="relative bg-white">
      <div className="grain-overlay" aria-hidden="true" />
      <GalleryOverlay
        isOpen={isGalleryOpen}
        onClose={() => {
          if (window.location.hash === '#realizacje') {
            window.history.back();
          } else {
            setIsGalleryOpen(false);
          }
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[100]"
        style={{ scaleX }}
      />

      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onHomeClick={handleHomeClick}
        onOpenGallery={() => {
          window.location.hash = 'realizacje';
          setIsGalleryOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="md:pl-20 w-full overflow-x-hidden">
        <HomeSection />
        {/* UseCasesSection commented out */}
        <BenefitsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
