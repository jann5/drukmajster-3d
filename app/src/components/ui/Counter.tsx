import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    className?: string;
}

export const Counter = ({
    end,
    duration = 2,
    decimals = 0,
    suffix = '',
    className = ''
}: CounterProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        // EaseOutExpo: 1 - Math.pow(2, -10 * t)
        const easeOutExpo = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / (duration * 1000);

            if (progress < 1) {
                const value = easeOutExpo(progress) * end;
                setCount(value);
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className={className}>
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
};
