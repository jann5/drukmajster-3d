import { Reveal } from '../components/ui/Reveal';
import { FramerThumbnailCarousel } from '../components/ui/framer-thumbnail-carousel';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Project {
    _id: string; // Convex ID
    title: string;
    category: string;
    image: string;
}

export function GallerySection() {
    const convexProjects = useQuery(api.gallery.get);

    // Fallback or loading state handled implicitly by undefined check later if desired,
    // or we can show a skeleton. For now default to empty array if loading.
    const projects = convexProjects || [];

    // Convert projects to carousel format
    const carouselItems = projects.map((p: any) => ({
        id: p._id,
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
