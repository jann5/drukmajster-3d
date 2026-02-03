import { Reveal } from '../components/ui/Reveal';
import { Counter } from '../components/ui/Counter';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Precyzja',
    description: 'Rozdzielczość warstwy od 0.05mm zapewnia wysoką jakość powierzchni i dokładność wymiarową.'
  },
  {
    title: 'Powtarzalność',
    description: 'Automatyczne poziomowanie i zamknięta komora gwarantują identyczne wyniki v każdej serii.'
  },
  {
    title: 'Wszechstronność',
    description: 'Wsparcie dla PLA, ABS, PETG, ASA, TPU i NYLON - od prototypów po części produkcyjne.'
  },
  {
    title: 'Niezawodność',
    description: 'Konstrukcja przemysłowa zaprojektowana do ciągłej pracy w środowisku produkcyjnym.'
  }
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              01 — O technologii
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8">
              Druk przemysłowy 3D
            </h2>
          </Reveal>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-black mb-10"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column - Description */}
          <div>
            <Reveal delay={0.2}>
              <p className="font-sans text-black text-xl leading-relaxed mb-8">
                Drukarki przemysłowe 3D rewolucjonizują produkcję, umożliwiając szybkie prototypowanie i wytwarzanie końcowych części z precyzją na poziomie mikrometrów.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-sans text-gray-text text-lg leading-relaxed mb-8">
                Technologia FDM przemysłowa zapewnia powtarzalność, wytrzymałość i skalowalność procesów wytwórczych w środowiskach produkcyjnych.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="font-sans text-gray-text text-lg leading-relaxed">
                Statysus F170 to rozwiązanie dla firm przemysłowych, prototypowni i działów R&D, które wymagają niezawodności i profesjonalnego wsparcia technicznego.
              </p>
            </Reveal>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={0.2 + index * 0.1} width="100%">
                <div className="border-l-2 border-gray-border pl-6 hover:border-black transition-colors duration-300 group">
                  <h3 className="font-sans font-bold text-black text-xl mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-gray-text text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <Reveal delay={0.6} width="100%">
          <div className="mt-32 pt-10 border-t border-gray-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                <span className="font-mono text-black text-3xl block flex items-baseline">
                  <Counter end={0.05} decimals={2} suffix="mm" duration={1.5} />
                </span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-2 block">Min. warstwa</span>
              </div>
              <div>
                <span className="font-mono text-black text-3xl block flex items-baseline">
                  <Counter end={150} suffix="mm/s" />
                </span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-2 block">Prędkość</span>
              </div>
              <div>
                <span className="font-mono text-black text-3xl block flex items-baseline">
                  <Counter end={6} suffix="+" />
                </span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-2 block">Materiały</span>
              </div>
              <div>
                <span className="font-mono text-black text-3xl block">24/7</span>
                <span className="font-sans text-gray-text text-xs uppercase tracking-wider mt-2 block">Praca ciągła</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
