import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Reveal } from './ui/Reveal';

interface GalleryOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

// Placeholder data - normally this would come from props or an API
const projects = [
    { id: 1, title: 'Komponent Lotniczy', category: 'Aerospace', image: '/gallery_print_1.png', size: 'large' },
    { id: 2, title: 'Prototyp Automotive', category: 'Automotive', image: '/gallery_print_2.png', size: 'small' },
    { id: 3, title: 'Instrumentarium Medyczne', category: 'Medycyna', image: '/gallery_print_3.png', size: 'medium' },
    { id: 4, title: 'Uchwyt Robota', category: 'Przemysł', image: '/gallery_print_1.png', size: 'medium' }, // Reusing for demo
    { id: 5, title: 'Obudowa Elektroniki', category: 'Prototyping', image: '/gallery_print_3.png', size: 'small' }, // Reusing for demo
    { id: 6, title: 'Model Architektoniczny', category: 'Architektura', image: '/gallery_print_2.png', size: 'large' }, // Reusing for demo
];

export function GalleryOverlay({ isOpen, onClose }: GalleryOverlayProps) {

    // Lock body scroll when gallery is open
    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling on the html element to handle mobile Safari and other edge cases
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';

            // Stop Lenis if it exists
            const lenis = (window as any).lenis;
            if (lenis) lenis.stop();
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';

            const lenis = (window as any).lenis;
            if (lenis) lenis.start();
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            const lenis = (window as any).lenis;
            if (lenis) lenis.start();
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
                    data-lenis-prevent="true" // Critical for Lenis to ignore this container
                >
                    {/* Header / Close Button */}
                    <div className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-[101]">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-sans font-bold text-black text-xl tracking-tight"
                        >
                            Realizacje
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-black group transition-colors duration-300"
                        >
                            <svg
                                className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Content */}
                    <div className="min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-24">
                        <div className="max-w-7xl mx-auto">
                            <Reveal className="mb-16">
                                <p className="font-sans text-gray-text text-xl max-w-2xl">
                                    Wybrane projekty zrealizowane przy użyciu technologii FDM i drukarki Statysus F170.
                                    Od funkcjonalnych prototypów po serie produkcyjne.
                                </p>
                            </Reveal>

                            {/* Masonry Grid Simulation using CSS Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project, index) => (
                                    <Reveal key={project.id} delay={0.1 + index * 0.05} width="100%">
                                        <div
                                            className={`group relative overflow-hidden bg-gray-100 ${project.size === 'large' ? 'aspect-[4/5]' :
                                                project.size === 'small' ? 'aspect-square' : 'aspect-[4/3]'
                                                }`}
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            {/* Overlay Info */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                                <span className="font-mono text-white/80 text-xs uppercase tracking-wider mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                    {project.category}
                                                </span>
                                                <h3 className="font-sans font-bold text-white text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
