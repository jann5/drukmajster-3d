import { useEffect, useState } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { FramerThumbnailCarousel } from '../components/ui/framer-thumbnail-carousel';

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

export function GallerySection() {
    const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);

    // Load projects from localStorage (admin-managed)
    useEffect(() => {
        const saved = localStorage.getItem('drukmajster_gallery');
        if (saved) {
            setProjects(JSON.parse(saved));
        }
    }, []);

    // Convert projects to carousel format
    const carouselItems = projects.map((p) => ({
        id: p.id,
        url: p.image,
        title: p.title,
    }));

    return (
        <section
            id="gallery"
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 bg-white"
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="mb-12 md:mb-16">
                    <Reveal>
                        <span className="font-mono text-gray-text text-xs uppercase tracking-widest block mb-4">
                            02 — Realizacje
                        </span>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="font-sans font-bold text-black text-3xl md:text-5xl mb-6">
                            Nasze projekty
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="font-sans text-gray-text text-lg max-w-2xl leading-relaxed">
                            Wybrane projekty zrealizowane przy użyciu technologii FDM i drukarki Stratasys F170.
                            Od funkcjonalnych prototypów po serie produkcyjne.
                        </p>
                    </Reveal>
                </div>

                {/* Framer Thumbnail Carousel */}
                <Reveal delay={0.3} width="100%">
                    <FramerThumbnailCarousel items={carouselItems} />
                </Reveal>
            </div>
        </section>
    );
}
