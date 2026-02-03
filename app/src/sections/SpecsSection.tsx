import { Reveal } from '../components/ui/Reveal';
import { motion } from 'framer-motion';

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

export function SpecsSection() {
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
              02 — Parametry
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8 tracking-tight">
              Specyfikacja Stratasys F170
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

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 pt-4 md:pt-8">
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

        {/* Note about technology */}
        <Reveal delay={0.5} width="100%">
          <div className="mt-16 text-gray-text font-sans text-sm italic">
            * Wszystkie parametry zgodnie ze specyfikacją producenta Stratasys Ltd.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
