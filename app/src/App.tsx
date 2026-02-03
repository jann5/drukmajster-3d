import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomeSection } from './sections/HomeSection';
import { SpecsSection } from './sections/SpecsSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { UseCasesSection } from './sections/UseCasesSection';
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

  const scrollToSection = (index: number) => {
    setActiveSection(index); // Immediate update
    const sectionIds = ['home', 'specs', 'benefits', 'usecases', 'contact'];
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

  useEffect(() => {
    // Listen for URL changes (simple way without a router lib)
    const handleLocationChange = () => {
      setIsAdmin(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);

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

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIds = ['home', 'specs', 'benefits', 'usecases', 'contact'];
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) setActiveSection(index);
        }
      });
    }, observerOptions);

    const sectionIds = ['home', 'specs', 'benefits', 'usecases', 'contact'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="relative bg-white">
      <GalleryOverlay isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[100]"
        style={{ scaleX }}
      />

      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Main Content Container - removed overflow-hidden to fix shadow clipping */}
      <main className="md:pl-20 w-full overflow-x-hidden">
        <HomeSection onOpenGallery={() => setIsGalleryOpen(true)} />
        <SpecsSection />
        <BenefitsSection />
        <UseCasesSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

