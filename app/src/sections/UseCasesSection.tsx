import { Reveal } from '../components/ui/Reveal';
import { Counter } from '../components/ui/Counter';
import { motion } from 'framer-motion';

const useCases = [
  {
    number: '01',
    industry: 'Automotive',
    title: 'Przemysł motoryzacyjny',
    applications: [
      'Prototypy elementów wnętrza',
      'Przyrządy montażowe',
      'Części zamienne custom'
    ]
  },
  {
    number: '02',
    industry: 'Manufacturing',
    title: 'Produkcja przemysłowa',
    applications: [
      'Narzędzia produkcyjne',
      'Formy i wkładki',
      'Elementy automatyzacji'
    ]
  },
  {
    number: '03',
    industry: 'Medical',
    title: 'Medycyna',
    applications: [
      'Modele anatomiczne',
      'Przyrządy chirurgiczne',
      'Protezy i ortezy custom'
    ]
  }
];

export function UseCasesSection() {

  return (
    <section
      id="usecases"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              02 — Przykłady zastosowań
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8">
              Gdzie sprawdzi się F170?
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

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 mb-24 md:mb-32">
          {useCases.map((useCase, index) => (
            <Reveal key={useCase.industry} delay={0.2 + index * 0.1} width="100%">
              <div className="group hover:-translate-y-2 transition-transform duration-500 ease-premium">
                <span className="font-mono text-gray-text text-[10px] uppercase tracking-[0.2em] block mb-4">
                  {useCase.number} — {useCase.industry}
                </span>
                <h3 className="font-sans font-bold text-black text-2xl mb-6 group-hover:underline decoration-1 underline-offset-[12px] transition-all duration-500">
                  {useCase.title}
                </h3>
                <ul className="space-y-4">
                  {useCase.applications.map((app, appIndex) => (
                    <li key={appIndex} className="font-sans text-gray-text text-sm md:text-base flex items-start gap-3 group/item">
                      <span className="text-black opacity-30 mt-1 transition-opacity group-hover/item:opacity-100">—</span>
                      <span className="group-hover/item:text-black transition-colors duration-300">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>



        {/* Info Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative border-t border-gray-100 pt-20 mt-16">
          <Reveal delay={0.4} className="pt-8">
            <div className="border-l-2 border-black pl-6">
              <span className="font-mono text-black text-3xl md:text-4xl block mb-2">
                <Counter end={50} suffix="%+" />
              </span>
              <span className="font-sans text-gray-text text-xs md:text-sm uppercase tracking-wider">Redukcja czasu prototypowania</span>
            </div>
          </Reveal>

          <Reveal delay={0.5} className="pt-8">
            <div className="border-l-2 border-black pl-6">
              <span className="font-mono text-black text-3xl md:text-4xl block mb-2">
                <Counter end={90} suffix="%" />
              </span>
              <span className="font-sans text-gray-text text-xs md:text-sm uppercase tracking-wider">Oszczędność na narzędziach</span>
            </div>
          </Reveal>

          <Reveal delay={0.6} className="pt-8">
            <div className="border-l-2 border-black pl-6">
              <span className="font-mono text-black text-3xl md:text-4xl block mb-2">
                <Counter end={24} suffix="h" />
              </span>
              <span className="font-sans text-gray-text text-xs md:text-sm uppercase tracking-wider">Średni czas realizacji części</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
