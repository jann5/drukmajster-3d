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
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 lg:pt-0 relative overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Text Content */}
        <motion.div style={{ opacity, y }} className="flex flex-col items-start text-left order-2 lg:order-1">
          {/* Label */}
          <Reveal delay={0.1}>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-2">
              WYDRUKI 3D NA DRUKARKACH PRZEMYSŁOWYCH
            </span>
          </Reveal>

          {/* Name */}
          <Reveal delay={0.2} y={40}>
            <div className="mb-6">
              <h1 className="font-sans font-bold text-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9]">
                DrukMajster3D
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-px w-12 bg-gray-300" />
                <span className="font-sans text-gray-text text-lg md:text-xl tracking-tight italic">
                  Wielkopolska rzetelność
                </span>
              </div>
            </div>
          </Reveal>

          {/* Printer Model - Sub-heading style */}
          <Reveal delay={0.3}>
            <div className="mb-10">
              <span className="font-mono text-black text-xl md:text-2xl uppercase tracking-tighter border-b-2 border-black pb-1">
                amerykańska technologia STRATASYS
              </span>
            </div>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.5}>
            <p className="font-sans text-black text-xl md:text-2xl max-w-xl leading-relaxed mb-10">
              Twój partner w przemysłowym druku 3D.
              Precyzyjna produkcja z materiałów <span className="font-bold underline decoration-1 underline-offset-4">PLA, ABS, ASA, TPU</span>.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-8 items-center mb-16">
              <a
                href="#contact"
                className="bg-black text-white px-8 py-4 font-sans font-bold text-base hover:bg-gray-900 transition-colors duration-300 shadow-xl"
              >
                Zapytaj o cenę
              </a>
              <div className="flex gap-6">
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
            </div>
          </Reveal>

          {/* Stats Row - Left aligned */}
          <Reveal delay={0.7} width="100%">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12">
              <div className="border-l border-gray-200 pl-4">
                <span className="font-mono text-black text-3xl block whitespace-nowrap">
                  3-5 dni
                </span>
                <span className="font-sans text-gray-text text-[10px] uppercase tracking-widest mt-1 block">Czas realizacji</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="font-mono text-black text-3xl block whitespace-nowrap">
                  &gt;100 firm
                </span>
                <span className="font-sans text-gray-text text-[10px] uppercase tracking-widest mt-1 block">Drukowaliśmy dla</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="font-mono text-black text-3xl block whitespace-nowrap">
                  całą Europę
                </span>
                <span className="font-sans text-gray-text text-[10px] uppercase tracking-widest mt-1 block">Obsługujemy</span>
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Printer Image - Strictly Right */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 h-full lg:min-h-[600px] items-center">
          <motion.div
            style={{ opacity, scale, y }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[450px] lg:max-w-[550px]"
          >
            <img
              src={printerImage}
              alt="Stratasys F170 Printer"
              className="w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
            />
            {/* Dynamic decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-transparent via-gray-50 to-transparent rounded-full -z-10 blur-[80px] opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
