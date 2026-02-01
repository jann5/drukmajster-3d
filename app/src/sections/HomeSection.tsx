import { Reveal } from '../components/ui/Reveal';
import { Counter } from '../components/ui/Counter';
import { motion } from 'framer-motion';

interface HomeSectionProps {
  onOpenGallery?: () => void;
}

export function HomeSection({ onOpenGallery }: HomeSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-16 md:pt-0"
    >
      <div className="max-w-5xl">
        {/* Label */}
        <Reveal delay={0.1}>
          <span className="font-mono text-gray-text text-xs uppercase tracking-widest">
            Przemysłowy druk 3D
          </span>
        </Reveal>

        {/* Name */}
        <Reveal delay={0.2} y={40}>
          <h1 className="font-sans font-bold text-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4">
            DrukMajster3D
          </h1>
        </Reveal>

        {/* Printer Model */}
        <Reveal delay={0.3}>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-gray-text text-xl md:text-2xl">
              Statysus F170
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
            Twój partner w przemysłowym druku 3D.
            Precyzyjna produkcja części, serwis i wsparcie dla Twojego biznesu.
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={0.6}>
          <div className="flex flex-wrap gap-6">
            <a
              href="#contact"
              className="btn-underline font-sans font-bold text-black text-base py-2"
            >
              Skontaktuj się
            </a>
            <a
              href="#specs"
              className="btn-underline font-sans text-gray-text text-base py-2 hover:text-black transition-colors"
            >
              Zobacz parametry
            </a>
            <button
              onClick={onOpenGallery}
              className="btn-underline font-sans text-gray-text text-base py-2 hover:text-black transition-colors group"
            >
              <span>Zobacz realizacje</span>
            </button>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.7} width="100%">
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl">
            <div>
              <span className="font-mono text-black text-3xl md:text-4xl block">
                F170
              </span>
              <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-1 block">Model</span>
            </div>
            <div>
              <span className="font-mono text-black text-3xl md:text-4xl block flex">
                <Counter end={254} suffix="³" />
              </span>
              <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-1 block">mm komora</span>
            </div>
            <div>
              <span className="font-mono text-black text-3xl md:text-4xl block flex">
                <Counter end={300} suffix="°C" />
              </span>
              <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-1 block">Max temp</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
