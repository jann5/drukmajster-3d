import { Reveal } from '../components/ui/Reveal';
import { Counter } from '../components/ui/Counter';
import { motion } from 'framer-motion';

const useCases = [
  {
    industry: 'Automotive',
    title: 'Przemysł motoryzacyjny',
    applications: [
      'Prototypy elementów wnętrza',
      'Przyrządy montażowe',
      'Części zamienne custom',
      'Testowanie ergonomii'
    ]
  },
  {
    industry: 'Aerospace',
    title: 'Lotnictwo i kosmonautyka',
    applications: [
      'Lekkie komponenty strukturalne',
      'Wsporniki i uchwyty',
      'Modele aerodynamiczne',
      'Części o wysokiej wytrzymałości'
    ]
  },
  {
    industry: 'Medical',
    title: 'Medycyna',
    applications: [
      'Modele anatomiczne do planowania',
      'Przyrządy chirurgiczne',
      'Protezy i ortezy custom',
      'Opakowania medyczne'
    ]
  },
  {
    industry: 'Manufacturing',
    title: 'Produkcja przemysłowa',
    applications: [
      'Narzędzia produkcyjne',
      'Formy i wkładki',
      'Elementy automatyzacji',
      'Części maszyn'
    ]
  }
];

export function UseCasesSection() {
  return (
    <section
      id="usecases"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              04 — Zastosowania
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8">
              Przykłady zastosowań
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

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {useCases.map((useCase, index) => (
            <Reveal key={useCase.industry} delay={0.2 + index * 0.1} width="100%">
              <div className="glass-panel border border-gray-border p-8 md:p-12 hover-lift transition-all duration-500">
                <span className="font-mono text-gray-text text-xs uppercase tracking-wider block mb-6">
                  {useCase.industry}
                </span>
                <h3 className="font-sans font-bold text-black text-2xl mb-6">
                  {useCase.title}
                </h3>
                <ul className="space-y-3">
                  {useCase.applications.map((app, appIndex) => (
                    <li
                      key={appIndex}
                      className="font-sans text-gray-text text-sm flex items-start gap-3 group"
                    >
                      <span className="text-black mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                      <span className="group-hover:text-black transition-colors duration-300">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Additional Info Stats */}
        <div className="mt-24 grid md:grid-cols-3 gap-12 relative">
          {/* Micro border top for stats */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

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
      </div>
    </section>
  );
}
