import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Reveal } from './ui/Reveal';

interface GalleryOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
}

const DEFAULT_PROJECTS: Project[] = [
    { id: 1, title: 'Komponent Lotniczy', category: 'Aerospace', image: '/gallery_print_1.png' },
    { id: 2, title: 'Prototyp Automotive', category: 'Automotive', image: '/gallery_print_2.png' },
    { id: 3, title: 'Instrumentarium Medyczne', category: 'Medycyna', image: '/gallery_print_3.png' },
    { id: 4, title: 'Uchwyt Chwytaka PR', category: 'Robotyka', image: '/gallery_print_1.png' },
    { id: 5, title: 'Obudowa Prototypowa', category: 'Inżynieria', image: '/gallery_print_2.png' },
    { id: 6, title: 'Model Funkcjonalny', category: 'R&D', image: '/gallery_print_3.png' },
];

export function GalleryOverlay({ isOpen, onClose }: GalleryOverlayProps) {
    const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [zoom, setZoom] = useState(1);

    // Populate projects from localStorage on open
    useEffect(() => {
        if (isOpen) {
            const saved = localStorage.getItem('drukmajster_gallery');
            if (saved) {
                setProjects(JSON.parse(saved));
            }
        }
    }, [isOpen]);

    // Zoom Logic
    useEffect(() => {
        if (!selectedProject) {
            setZoom(1);
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'ArrowUp' || e.key === '+') {
                    e.preventDefault();
                    setZoom(prev => Math.min(prev + 0.25, 4));
                } else if (e.key === 'ArrowDown' || e.key === '-') {
                    e.preventDefault();
                    setZoom(prev => Math.max(prev - 0.25, 0.5));
                }
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 4));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [selectedProject]);

    // Lock body scroll when gallery or lightbox is open
    useEffect(() => {
        if (isOpen || selectedProject) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';

            const lenis = (window as any).lenis;
            if (lenis) lenis.stop();
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';

            const lenis = (window as any).lenis;
            if (lenis) lenis.start();
        }
    }, [isOpen, selectedProject]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
                        data-lenis-prevent="true"
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
                                        Wybrane projekty zrealizowane przy użyciu technologii FDM i drukarki Stratasys F170.
                                        Od funkcjonalnych prototypów po serie produkcyjne.
                                    </p>
                                </Reveal>

                                {/* Masonry Grid using CSS Columns */}
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                    {projects.map((project, index) => (
                                        <div key={project.id} className="break-inside-avoid mb-8">
                                            <Reveal delay={0.1 + index * 0.05} width="100%">
                                                <div
                                                    onClick={() => setSelectedProject(project)}
                                                    className="group relative overflow-hidden bg-gray-100 cursor-zoom-in border border-black/5"
                                                >
                                                    <img
                                                        src={project.image}
                                                        alt={`Realizacja druku 3D: ${project.title} - kategoria ${project.category}`}
                                                        className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-110"
                                                    />

                                                    {/* Better Overlay Info */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                                        <span className="font-mono text-white/80 text-[10px] uppercase tracking-[0.2em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                            {project.category}
                                                        </span>
                                                        <h3 className="font-sans font-bold text-white text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                                            {project.title}
                                                        </h3>
                                                    </div>

                                                    {/* Subtle Border Hover */}
                                                    <div className="absolute inset-0 border-0 group-hover:border-[16px] border-white/10 transition-all duration-700 pointer-events-none" />
                                                </div>
                                            </Reveal>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md overflow-hidden"
                        onClick={() => setSelectedProject(null)}
                    >
                        {/* Zoom Indicator */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[202] py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                            <span className="font-mono text-white text-[10px] uppercase tracking-widest">
                                Zoom: {Math.round(zoom * 100)}% <span className="text-white/40 ml-2">(Ctrl + Scroll / Arrows)</span>
                            </span>
                        </div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all z-[203]"
                            onClick={() => setSelectedProject(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full h-full flex flex-col items-center justify-center gap-8 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                src={selectedProject.image}
                                alt={`Pełnowymiarowy detal druku 3D: ${selectedProject.title}`}
                                animate={{ scale: zoom }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.5 }}
                                className="max-h-[80vh] w-auto object-contain shadow-2xl origin-center cursor-grab active:cursor-grabbing"
                                drag={zoom > 1}
                                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                                dragElastic={0.1}
                            />

                            {zoom === 1 && (
                                <div className="text-center">
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="font-mono text-white/50 text-xs uppercase tracking-[0.2em] block mb-2"
                                    >
                                        {selectedProject.category}
                                    </motion.span>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="font-sans font-bold text-white text-2xl md:text-3xl tracking-tight"
                                    >
                                        {selectedProject.title}
                                    </motion.h2>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
