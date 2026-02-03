'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValue,
    animate,
} from 'motion/react';

interface CarouselItem {
    id: number;
    url: string;
    title: string;
}

interface FramerThumbnailCarouselProps {
    items: CarouselItem[];
}

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

export function FramerThumbnailCarousel({ items }: FramerThumbnailCarouselProps) {
    const [index, setIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);

    useEffect(() => {
        if (!isDragging && containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth || 1;
            const targetX = -index * containerWidth;

            animate(x, targetX, {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            });
        }
    }, [index, x, isDragging]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1));
            } else if (e.key === 'ArrowRight') {
                setLightboxIndex((i) => Math.min(items.length - 1, (i ?? 0) + 1));
            } else if (e.key === 'Escape') {
                setLightboxIndex(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, items.length]);

    if (items.length === 0) {
        return (
            <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
                <p className="font-sans text-gray-text">Brak zdjęć w galerii</p>
            </div>
        );
    }

    return (
        <>
            <div className='w-full'>
                <div className='flex flex-col gap-3'>
                    {/* Main Carousel */}
                    <div className='relative overflow-hidden rounded-lg' ref={containerRef}>
                        <motion.div
                            className='flex'
                            drag='x'
                            dragElastic={0.2}
                            dragMomentum={false}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(_, info) => {
                                setIsDragging(false);
                                const containerWidth = containerRef.current?.offsetWidth || 1;
                                const offset = info.offset.x;
                                const velocity = info.velocity.x;

                                let newIndex = index;

                                // If fast swipe, use velocity
                                if (Math.abs(velocity) > 500) {
                                    newIndex = velocity > 0 ? index - 1 : index + 1;
                                }
                                // Otherwise use offset threshold (30% of container width)
                                else if (Math.abs(offset) > containerWidth * 0.3) {
                                    newIndex = offset > 0 ? index - 1 : index + 1;
                                }

                                // Clamp index
                                newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
                                setIndex(newIndex);
                            }}
                            style={{ x }}
                        >
                            {items.map((item, i) => (
                                <div
                                    key={item.id}
                                    className='shrink-0 w-full h-[400px] md:h-[500px] lg:h-[600px] cursor-zoom-in'
                                    onClick={() => setLightboxIndex(i)}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className='w-full h-full object-cover rounded-lg select-none pointer-events-none'
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </motion.div>

                        {/* Current Image Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pointer-events-none">
                            <motion.h3
                                key={items[index]?.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-sans font-bold text-white text-xl md:text-2xl"
                            >
                                {items[index]?.title}
                            </motion.h3>
                        </div>

                        {/* Navigation Buttons */}
                        <motion.button
                            disabled={index === 0}
                            onClick={() => setIndex((i) => Math.max(0, i - 1))}
                            className={`absolute left-4 text-black top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10
                ${index === 0
                                    ? 'opacity-40 cursor-not-allowed bg-white/50'
                                    : 'bg-white hover:scale-110 hover:opacity-100 opacity-80'
                                }`}
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 19l-7-7 7-7'
                                />
                            </svg>
                        </motion.button>

                        {/* Next Button */}
                        <motion.button
                            disabled={index === items.length - 1}
                            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
                            className={`absolute text-black right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10
                ${index === items.length - 1
                                    ? 'opacity-40 cursor-not-allowed bg-white/50'
                                    : 'bg-white hover:scale-110 hover:opacity-100 opacity-80'
                                }`}
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 5l7 7-7 7'
                                />
                            </svg>
                        </motion.button>
                    </div>

                    <Thumbnails items={items} index={index} setIndex={setIndex} />
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && items[lightboxIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md"
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all z-[203]"
                            onClick={() => setLightboxIndex(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Previous Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            disabled={lightboxIndex === 0}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1));
                            }}
                            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full transition-all z-[203]
                                ${lightboxIndex === 0
                                    ? 'opacity-30 cursor-not-allowed bg-white/10 text-white/50'
                                    : 'bg-white/10 hover:bg-white text-white hover:text-black'
                                }`}
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        {/* Next Button */}
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            disabled={lightboxIndex === items.length - 1}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex((i) => Math.min(items.length - 1, (i ?? 0) + 1));
                            }}
                            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full transition-all z-[203]
                                ${lightboxIndex === items.length - 1
                                    ? 'opacity-30 cursor-not-allowed bg-white/10 text-white/50'
                                    : 'bg-white/10 hover:bg-white text-white hover:text-black'
                                }`}
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>

                        {/* Image and Title */}
                        <motion.div
                            key={items[lightboxIndex].id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full h-full flex flex-col items-center justify-center gap-6 px-16 md:px-24"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={items[lightboxIndex].url}
                                alt={items[lightboxIndex].title}
                                className="max-h-[75vh] max-w-full object-contain shadow-2xl rounded-lg"
                            />
                            <div className="text-center">
                                <h2 className="font-sans font-bold text-white text-2xl md:text-3xl">
                                    {items[lightboxIndex].title}
                                </h2>
                                <p className="font-mono text-white/60 text-sm mt-2">
                                    {lightboxIndex + 1} / {items.length}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function Thumbnails({
    items,
    index,
    setIndex,
}: {
    items: CarouselItem[];
    index: number;
    setIndex: (index: number) => void;
}) {
    const thumbnailsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (thumbnailsRef.current) {
            let scrollPosition = 0;
            for (let i = 0; i < index; i++) {
                scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
            }

            scrollPosition += MARGIN_PX;

            const containerWidth = thumbnailsRef.current.offsetWidth;
            const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
            scrollPosition -= centerOffset;

            thumbnailsRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
        }
    }, [index]);

    return (
        <div
            ref={thumbnailsRef}
            className='overflow-x-auto scrollbar-hide'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className='flex gap-1 h-20 pb-2' style={{ width: 'fit-content' }}>
                {items.map((item, i) => (
                    <motion.button
                        key={item.id}
                        onClick={() => setIndex(i)}
                        initial={false}
                        animate={i === index ? 'active' : 'inactive'}
                        variants={{
                            active: {
                                width: FULL_WIDTH_PX,
                                marginLeft: MARGIN_PX,
                                marginRight: MARGIN_PX,
                            },
                            inactive: {
                                width: COLLAPSED_WIDTH_PX,
                                marginLeft: 0,
                                marginRight: 0,
                            },
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='relative shrink-0 h-full overflow-hidden rounded-md'
                    >
                        <img
                            src={item.url}
                            alt={item.title}
                            className='w-full h-full object-cover pointer-events-none select-none'
                        />
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
