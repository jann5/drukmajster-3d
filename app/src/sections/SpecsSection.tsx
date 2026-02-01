import { Reveal } from '../components/ui/Reveal';
import { motion } from 'framer-motion';

interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

const specs: SpecItem[] = [
  { label: 'Model', value: 'Statysus F170' },
  { label: 'Komora robocza', value: '254 × 254 × 254', unit: 'mm' },
  { label: 'Temperatura głowicy', value: 'do 300', unit: '°C' },
  { label: 'Temperatura stołu', value: 'do 110', unit: '°C' },
  { label: 'Temperatura komory', value: 'do 70', unit: '°C' },
  { label: 'Materiały', value: 'PLA, ABS, PETG, ASA, TPU, NYLON, PC' },
  { label: 'Rozdzielczość warstwy', value: '0.05 - 0.4', unit: 'mm' },
  { label: 'Średnica filamentu', value: '1.75', unit: 'mm' },
  { label: 'Prędkość druku', value: 'do 150', unit: 'mm/s' },
  { label: 'Prędkość przemieszczania', value: 'do 300', unit: 'mm/s' },
  { label: 'System poziomowania', value: 'Automatyczny BL-Touch' },
  { label: 'Ekstruder', value: 'Direct Drive' },
  { label: 'Wyświetlacz', value: '5" kolorowy touchscreen' },
  { label: 'Łączność', value: 'USB, SD, WiFi, Ethernet' },
  { label: 'Wymiary urządzenia', value: '600 × 600 × 700', unit: 'mm' },
  { label: 'Waga', value: '45', unit: 'kg' },
];

export function SpecsSection() {
  const leftColumn = specs.filter((_, i) => i % 2 === 0);
  const rightColumn = specs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="specs"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32" // Increased padding
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              02 — Specyfikacja
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8">
              Parametry techniczne
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

        {/* Two Column Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0">
          {/* Left Column */}
          <div>
            {leftColumn.map((spec, index) => (
              <Reveal key={spec.label} delay={0.1 + index * 0.05} width="100%">
                <div className="micro-border py-6 flex justify-between items-baseline group hover:bg-gray-50 transition-colors duration-300 px-2">
                  <span className="font-mono text-gray-text text-xs uppercase tracking-wider group-hover:text-black transition-colors">
                    {spec.label}
                  </span>
                  <span className="font-sans text-black text-base text-right font-medium">
                    {spec.value}
                    {spec.unit && <span className="font-mono text-gray-text text-sm ml-1">{spec.unit}</span>}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Column */}
          <div>
            {rightColumn.map((spec, index) => (
              <Reveal key={spec.label} delay={0.2 + index * 0.05} width="100%">
                <div className="micro-border py-6 flex justify-between items-baseline group hover:bg-gray-50 transition-colors duration-300 px-2">
                  <span className="font-mono text-gray-text text-xs uppercase tracking-wider group-hover:text-black transition-colors">
                    {spec.label}
                  </span>
                  <span className="font-sans text-black text-base text-right font-medium">
                    {spec.value}
                    {spec.unit && <span className="font-mono text-gray-text text-sm ml-1">{spec.unit}</span>}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <Reveal delay={0.4} className="mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 font-sans text-black text-sm group"
          >
            <span className="btn-underline py-1 font-medium">Pełna specyfikacja techniczna na żądanie</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
