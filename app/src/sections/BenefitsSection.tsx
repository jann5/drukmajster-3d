import { Reveal } from '../components/ui/Reveal';
import { motion } from 'framer-motion';

const benefits = [
  {
    number: '01',
    title: 'Szybkie prototypowanie',
    description: 'Skróć czas od koncepcji do fizycznego prototypu z tygodni do godzin. Testuj projekty natychmiast i iteruj bez opóźnień.'
  },
  {
    number: '02',
    title: 'Produkcja niskoseryjna',
    description: 'Wytwarzaj małe serie produktów bez kosztownych form wtryskowych. Idealne dla customizacji i produktów niszowych.'
  },
  {
    number: '03',
    title: 'Części zamienne na żądanie',
    description: 'Drukuj części zamienne w momencie potrzeby, eliminując magazynowanie i skracając przestoje produkcyjne.'
  },
  {
    number: '04',
    title: 'Narzędzia i przyrządy',
    description: 'Produkuj wsporniki, przyrządy montażowe, szablony i narzędzia pomocnicze w ułamku czasu i kosztów.'
  },
  {
    number: '05',
    title: 'Geometrie niemożliwe tradycyjnie',
    description: 'Twórz wewnętrzne kanały, komory, struktury lattice i skomplikowane kształty niedostępne dla obróbki tradycyjnej.'
  },
  {
    number: '06',
    title: 'Personalizacja produktów',
    description: 'Każda sztuka może być inna - personalizuj dla klientów bez dodatkowych kosztów produkcyjnych.'
  }
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24">
          <Reveal>
            <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
              01 — Dlaczego my
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-8">
              Dlaczego warto wybrać nasz druk 3D?
            </h2>
          </Reveal>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-black mb-4"
          />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.number} delay={0.2 + index * 0.1} width="100%">
              <div className="group hover:-translate-y-2 transition-transform duration-500 ease-premium">
                <span className="font-mono text-gray-text text-[10px] md:text-xs block mb-3 md:mb-4">
                  {benefit.number}
                </span>
                <h3 className="font-sans font-bold text-black text-xl md:text-2xl mb-3 group-hover:underline decoration-1 underline-offset-[8px] transition-all duration-500">
                  {benefit.title}
                </h3>
                <p className="font-sans text-gray-text text-sm md:text-base leading-relaxed max-w-[35ch]">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.6} width="100%">
          <div className="mt-32 pt-10 border-t border-gray-border">
            <p className="font-sans text-black text-xl mb-8">
              Chcesz wiedzieć, jak druk 3D może usprawnić Twoją produkcję?
            </p>
            <a
              href="#contact"
              className="btn-underline font-sans font-bold text-lg py-2 inline-block"
            >
              Umów konsultację
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
