import { Reveal } from '../components/ui/Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import printerImage from '../assets/printer-f170.png';

interface HomeSectionProps {
  // onOpenGallery?: () => void; // Removed because the button now links to #benefits
}

export function HomeSection({ }: HomeSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -100]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-16 md:pt-0 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div style={{ opacity, y }} className="max-w-xl">
          {/* Label */}
          <Reveal delay={0.1}>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest">
              WYDRUKI 3D NA DRUKARKACH PRZEMYSŁOWYCH
            </span>
          </Reveal>

          {/* Name */}
          <Reveal delay={0.2} y={40}>
            <div className="mb-2">
              <h1 className="font-sans font-bold text-black text-5xl md:text-7xl lg:text-8xl tracking-tight">
                DrukMajster3D
              </h1>
            </div>
          </Reveal>

          {/* Printer Model */}
          <Reveal delay={0.3}>
            <div className="mb-10">
              <span className="font-mono text-gray-text text-lg md:text-xl uppercase tracking-tight">
                amerykańska technologia STRATASYS
              </span>
            </div>
          </Reveal>

          {/* Minimalist Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-black max-w-lg mb-10"
          />

          {/* Subtitle */}
          <Reveal delay={0.5}>
            <p className="font-sans text-black text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              Twój partner w przemysłowym druku 3D. Precyzyjna produkcja z materiałów: PLA, ABS, ASA, TPU.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-6">
              <a
                href="#contact"
                className="btn-underline font-sans font-bold text-black text-base py-2"
              >
                Zapytaj o cenę
              </a>
              <a
                href="#specs"
                className="btn-underline font-sans text-gray-text text-base py-2 hover:text-black transition-colors"
              >
                Przykłady zastosowań
              </a>
              <a
                href="#benefits"
                className="btn-underline font-sans text-gray-text text-base py-2 hover:text-black transition-colors"
              >
                Dlaczego my?
              </a>
            </div>
          </Reveal>

          {/* Stats Row */}
          <Reveal delay={0.7} width="100%">
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-x-12 lg:gap-x-16 max-w-3xl">
              <div>
                <span className="font-mono text-black text-3xl md:text-4xl block whitespace-nowrap">
                  3-5 dni
                </span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-1 block">Czas realizacji</span>
              </div>
              <div>
                <span className="font-mono text-black text-3xl md:text-4xl block whitespace-nowrap">
                  &gt;100 firm
                </span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-1 block">Drukowaliśmy dla</span>
              </div>
              <div>
                <span className="font-mono text-black text-3xl md:text-4xl block whitespace-nowrap">
                  całą Europę
                </span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-1 block">Obsługujemy</span>
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Printer Image - Enlarged */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            style={{ opacity, scale, y }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[500px] lg:max-w-[850px] lg:translate-x-16"
          >
            <img
              src={printerImage}
              alt="Stratasys F170 Printer"
              className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            />
            {/* Subtle glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-transparent via-gray-100 to-transparent rounded-full -z-10 blur-[100px] opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
