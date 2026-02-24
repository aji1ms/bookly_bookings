import { useRef, useState, useEffect } from "react";

export const useCounter = (end: number, duration: number = 1800, start: number = 0) => {
    const [count, setCount] = useState<number>(start);
    const [triggered, setTriggered] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting && !triggered) setTriggered(true);
            },
            { threshold: 0.3 }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [triggered]);

    useEffect(() => {
        if (!triggered) return;
        let startTime: number | null = null;

        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * (end - start) + start));

            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [triggered, end, start, duration]);

    return { count, ref };
};