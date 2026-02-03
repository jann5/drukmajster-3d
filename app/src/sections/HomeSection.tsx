import { Reveal } from '../components/ui/Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import printerImage from '../assets/printer-f170.png';

interface HomeSectionProps {
  onOpenGallery?: () => void;
}

export function HomeSection({ onOpenGallery }: HomeSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 0, -100]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 md:pt-0 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <motion.div style={{ opacity, y }} className="max-w-xl z-20">
          {/* Label */}
          <Reveal delay={0.1}>
            <span className="font-mono text-gray-text text-[10px] md:text-xs uppercase tracking-[0.2em]">
              WYDRUKI 3D NA DRUKARKACH PRZEMYSŁOWYCH
            </span>
          </Reveal>

          {/* Name */}
          <Reveal delay={0.2} y={40}>
            <div className="mb-4 md:mb-2">
              <h1 className="font-sans font-bold text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.9]">
                DrukMajster3D
              </h1>
            </div>
          </Reveal>

          {/* Printer Model & Location */}
          <Reveal delay={0.3}>
            <div className="mb-8 md:mb-10 flex flex-col gap-2 md:gap-1">
              <span className="font-mono text-gray-text text-[10px] md:text-xs uppercase tracking-widest">
                amerykańska technologia STRATASYS
              </span>
              <span className="font-sans text-gray-text text-[10px] md:text-xs uppercase tracking-widest">
                Wielkopolska rzetelność
              </span>
            </div>
          </Reveal>

          {/* Minimalist Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-black max-w-lg mb-8 md:mb-10"
          />

          {/* Subtitle */}
          <Reveal delay={0.5}>
            <p className="font-sans text-black text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mb-8">
              Twój partner w przemysłowym druku 3D. Precyzyjna produkcja z materiałów: PLA, ABS, ASA, TPU.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a
                href="#contact"
                className="btn-underline font-sans font-bold text-black text-sm md:text-base py-2"
              >
                Zapytaj o cenę
              </a>
              <a
                href="#specs"
                className="btn-underline font-sans text-gray-text text-sm md:text-base py-2 hover:text-black transition-colors"
              >
                Przykłady zastosowań
              </a>
              <button
                onClick={onOpenGallery}
                className="btn-underline font-sans text-gray-text text-sm md:text-base py-2 hover:text-black transition-colors"
              >
                Zobacz realizacje
              </button>
            </div>
          </Reveal>

          {/* Stats Row */}
          <Reveal delay={0.7} width="100%">
            <div className="mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10 max-w-2xl">
              <div>
                <span className="font-mono text-black text-3xl md:text-4xl lg:text-5xl block tracking-tighter">
                  3-5 dni
                </span>
                <span className="font-sans text-gray-text text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-3 block">Czas realizacji</span>
              </div>
              <div>
                <span className="font-mono text-black text-3xl md:text-4xl lg:text-5xl block tracking-tighter">
                  &gt;100 firm
                </span>
                <span className="font-sans text-gray-text text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-3 block">Drukowaliśmy dla</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-mono text-black text-3xl md:text-4xl lg:text-5xl block tracking-tighter">
                  cała Europa
                </span>
                <span className="font-sans text-gray-text text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-3 block">Obsługujemy</span>
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Printer Image - Massive & Cropped */}
        <div className="relative flex justify-end h-full pointer-events-none">
          <motion.div
            style={{ opacity, scale: useTransform(scrollYProgress, [0, 0.8], [1.1, 1]), y }}
            initial={{ opacity: 0, scale: 1, x: 100 }}
            animate={{ opacity: 1, scale: 1.1, x: 0 }}
            transition={{ delay: 0.4, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px] translate-x-[15%] sm:translate-x-[10%] md:translate-x-0 lg:translate-x-24 xl:translate-x-48 lg:-mb-56 relative"
          >
            <img
              src={printerImage}
              alt="Stratasys F170 Printer"
              className="w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.25)]"
            />
            {/* Massive glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-gray-100 to-transparent rounded-full -z-10 blur-[100px] md:blur-[150px] opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
