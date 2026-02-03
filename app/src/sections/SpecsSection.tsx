import { Reveal } from '../components/ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

const specs: SpecItem[] = [
  { label: 'Obszar roboczy', value: '254 x 254 x 254', unit: 'mm' },
  { label: 'Materiały modelowe', value: 'ABS, PLA, ASA, ABS-CF10, TPU 92A' },
  { label: 'Materiał podporowy', value: 'Rozpuszczalny QSR' },
  { label: 'Wysokość warstwy', value: '0.127 | 0.178 | 0.254 | 0.330', unit: 'mm' },
  { label: 'Dokładność części', value: '±0,200 mm lub ±0,002 mm/mm' },
  { label: 'Liczba kieszeni', value: '2 (1 model / 1 support)' },
  { label: 'Wymiary zewnętrzne', value: '1626 x 864 x 711', unit: 'mm' },
  { label: 'Waga urządzenia', value: '227', unit: 'kg (z materiałami)' },
  { label: 'Głośność pracy', value: 'Max. 46 dB (tryb jałowy: 35 dB)' },
  { label: 'Oprogramowanie', value: 'GrabCAD Print / Print Pro' },
  { label: 'Łączność', value: 'Ethernet / Wi-Fi (WPA2-PSK)' },
  { label: 'System operacyjny', value: 'Windows 10/11 (min. 8GB RAM)' },
  { label: 'Zasilanie', value: '100–132V/15A lub 200–240V/7A' },
  { label: 'Temperatura pracy', value: '15 – 30', unit: '°C' },
  { label: 'Certyfikat emisji', value: 'GREENGUARD (UL 2904)' },
  { label: 'Zgodność prawna', value: 'CE, FCC, RoHS, REACH' },
];

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

export function SpecsSection() {
  const [showSpecs, setShowSpecs] = useState(false);
  const leftColumn = specs.filter((_, i) => i % 2 === 0);
  const rightColumn = specs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="specs"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-20 md:mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-[0.2em] block mb-4">
              02 — Przykłady zastosowań
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8 tracking-tight">
              Zastosowania przemysłowe
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

        {/* Collapsible Specs */}
        <div className="border-t border-gray-100 pt-16 md:pt-20">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="flex items-center justify-between w-full md:w-auto md:justify-start gap-6 group hover:text-gray-600 transition-colors py-4"
          >
            <span className="font-sans font-bold text-black text-xs md:text-sm uppercase tracking-[0.15em] transition-colors group-hover:text-gray-600">
              Parametry techniczne (rozwiń)
            </span>
            <motion.div
              animate={{ rotate: showSpecs ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChevronDown size={20} className="text-black group-hover:text-gray-600 transition-colors" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showSpecs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 pt-12 md:pt-16">
                  {/* Left Column */}
                  <div className="space-y-0">
                    {leftColumn.map((spec) => (
                      <div key={spec.label} className="micro-border py-5 md:py-6 flex justify-between items-baseline group hover:bg-gray-50 transition-colors duration-300 px-2">
                        <span className="font-mono text-gray-text text-[9px] md:text-[10px] uppercase tracking-wider group-hover:text-black transition-colors">
                          {spec.label}
                        </span>
                        <span className="font-sans text-black text-sm md:text-base text-right font-medium">
                          {spec.value}
                          {spec.unit && <span className="font-mono text-gray-text text-[10px] md:text-xs ml-1">{spec.unit}</span>}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-0">
                    {rightColumn.map((spec) => (
                      <div key={spec.label} className="micro-border py-5 md:py-6 flex justify-between items-baseline group hover:bg-gray-50 transition-colors duration-300 px-2">
                        <span className="font-mono text-gray-text text-[9px] md:text-[10px] uppercase tracking-wider group-hover:text-black transition-colors">
                          {spec.label}
                        </span>
                        <span className="font-sans text-black text-sm md:text-base text-right font-medium">
                          {spec.value}
                          {spec.unit && <span className="font-mono text-gray-text text-[10px] md:text-xs ml-1">{spec.unit}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
