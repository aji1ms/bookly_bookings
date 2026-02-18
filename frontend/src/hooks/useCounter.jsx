import { useRef, useState, useEffect } from "react";

export const useCounter = (end, duration = 1800, start = 0) => {
    const [count, setCount] = useState(start);
    const [triggered, setTriggered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered) setTriggered(true);
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
        let startTime = null;

        const step = (ts) => {
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