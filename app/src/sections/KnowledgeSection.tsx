import { Reveal } from '../components/ui/Reveal';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Zap, Cpu } from 'lucide-react';

const articles = [
    {
        icon: <Cpu size={24} />,
        title: 'Technologia FDM',
        content: 'Fused Deposition Modeling to proces wytwarzania warstwowego, w którym termoplastyczny materiał jest wyciskany przez dyszę. W maszynach Stratasys, takich jak F170, proces ten odbywa się w kontrolowanej temperaturze, co zapewnia niezrównaną spójność warstw i stabilność wymiarową.'
    },
    {
        icon: <Shield size={24} />,
        title: 'Materiały Przemysłowe',
        content: 'Stosujemy termoplasty klasy inżynieryjnej. ABS-M30 charakteryzuje się dużą wytrzymałością na rozciąganie, ASA zapewnia odporność na promieniowanie UV, a ABS-CF10 z włóknem węglowym oferuje sztywność niezbędną do produkcji lekkich oprzyrządowań.'
    },
    {
        icon: <Zap size={24} />,
        title: 'Rozpuszczalne Podpory QSR',
        content: 'Unikalna technologia Stratasys pozwala na drukowanie skomplikowanych geometrii z użyciem materiału podporowego QSR. Po zakończeniu druku, podpory są rozpuszczane w roztworze wodnym, pozostawiając idealnie czyste powierzchnie bez śladów usuwania mechanicznego.'
    },
    {
        icon: <BookOpen size={24} />,
        title: 'Zastosowania końcowe',
        content: 'Drukarka F170 to nie tylko prototypowanie. Dzięki wysokiej powtarzalności (±0,2 mm), wydruki mogą służyć jako gotowe części maszyn, uchwyty montażowe, sprawdziany oraz części zamienne pracujące w trudnych warunkach przemysłowych.'
    }
];

export function KnowledgeSection() {
    return (
        <section id="knowledge" className="min-h-screen py-32 px-6 md:px-16 lg:px-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="mb-24">
                    <Reveal>
                        <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
                            06 — Baza Wiedzy
                        </span>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-6">
                            Zrozumieć technologię
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="font-sans text-gray-text text-lg max-w-xl leading-relaxed">
                            Poznaj techniczne aspekty przemysłowego druku 3D i dowiedz się, jak technologia FDM od Stratasys zmienia procesy produkcyjne.
                        </p>
                    </Reveal>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-px bg-black mt-8"
                    />
                </div>

                {/* Knowledge Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {articles.map((article, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <div className="group">
                                <div className="w-12 h-12 flex items-center justify-center border border-black/5 bg-gray-50 mb-6 group-hover:border-black transition-colors duration-500">
                                    {article.icon}
                                </div>
                                <h3 className="font-sans font-bold text-black text-xl mb-4 tracking-tight">
                                    {article.title}
                                </h3>
                                <p className="font-sans text-gray-text leading-relaxed text-sm md:text-base">
                                    {article.content}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Technical Callout */}
                <Reveal delay={0.5} width="100%">
                    <div className="mt-24 p-8 md:p-12 bg-black text-white relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl">
                            <span className="font-mono text-white/50 text-[10px] uppercase tracking-[0.3em] block mb-4">Industrial standard</span>
                            <h4 className="font-sans font-bold text-2xl md:text-3xl mb-6 leading-tight">
                                Dlaczego Stratasys F170 to inny poziom niż drukarki desktopowe?
                            </h4>
                            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed mb-8">
                                W przeciwieństwie do tańszych urządzeń, seria F123 posiada szczelnie zamkniętą, podgrzewaną komorę roboczą oraz zaawansowane systemy dopasowania materiału, co eliminuje skurcz termiczny i deformacje. To różnica między "ładnym modelem" a "częścią funkcjonalną".
                            </p>
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="font-mono text-white text-xl font-bold">±0.2mm</span>
                                    <span className="font-mono text-white/40 text-[9px] uppercase tracking-widest">Precyzja</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-mono text-white text-xl font-bold">100%</span>
                                    <span className="font-mono text-white/40 text-[9px] uppercase tracking-widest">Powtarzalność</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual background decoration */}
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-[-20deg] translate-x-1/2" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
