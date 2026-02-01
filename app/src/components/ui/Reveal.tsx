import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%' | 'auto';
    delay?: number;
    duration?: number;
    y?: number;
    className?: string; // Added className prop
}

export const Reveal = ({
    children,
    width = 'fit-content',
    delay = 0,
    duration = 0.8,
    y = 40,
    className = ''
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className={className} style={{ position: 'relative', width, overflow: 'visible' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: y },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{
                    duration: duration,
                    ease: [0.16, 1, 0.3, 1], // Premium easing
                    delay: delay
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
