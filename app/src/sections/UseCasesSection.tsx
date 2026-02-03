import { Reveal } from '../components/ui/Reveal';
import { Counter } from '../components/ui/Counter';
import { motion } from 'framer-motion';

export function UseCasesSection() {
  return (
    <section
      id="usecases"
      className="min-h-[50vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 bg-gray-50/50"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              04 — Technologia
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8">
              Wydajność i wyniki
            </h2>
          </Reveal>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-black mb-4"
          />
        </div>

        {/* Info Stats */}
        <div className="grid md:grid-cols-3 gap-12 relative">
          <Reveal delay={0.4} className="pt-8">
            <div className="border-l-2 border-black pl-6">
              <span className="font-mono text-black text-4xl block mb-2">
                <Counter end={50} suffix="%+" />
              </span>
              <span className="font-sans text-gray-text text-sm">Redukcja czasu prototypowania</span>
            </div>
          </Reveal>

          <Reveal delay={0.5} className="pt-8">
            <div className="border-l-2 border-black pl-6">
              <span className="font-mono text-black text-4xl block mb-2">
                <Counter end={90} suffix="%" />
              </span>
              <span className="font-sans text-gray-text text-sm">Oszczędność na narzędziach</span>
            </div>
          </Reveal>

          <Reveal delay={0.6} className="pt-8">
            <div className="border-l-2 border-black pl-6">
              <span className="font-mono text-black text-4xl block mb-2">
                <Counter end={24} suffix="h" />
              </span>
              <span className="font-sans text-gray-text text-sm">Średni czas realizacji części</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.7} width="100%">
          <div className="mt-24 p-8 md:p-12 border border-gray-100 bg-white">
            <p className="font-sans text-gray-text text-lg leading-relaxed max-w-3xl">
              Wykorzystujemy przemysłową technologię FDM marki Stratasys, która gwarantuje powtarzalność geometryczną i parametry wytrzymałościowe niedostępne dla drukarek klasy desktop. Każdy wydruk przechodzi kontrolę jakości przed wysyłką do klienta.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
