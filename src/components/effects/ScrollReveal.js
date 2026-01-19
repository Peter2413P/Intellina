import React, { useState, useEffect, useRef } from 'react';
import { isLowEndDevice } from '../../utils/performance';

// Shared observer instance to avoid creating one per component
let sharedObserver = null;
const observersCache = new Map();

const getObserver = () => {
    if (sharedObserver) return sharedObserver;

    sharedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const callback = observersCache.get(entry.target);
                if (callback) {
                    callback();
                    observersCache.delete(entry.target);
                    sharedObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    return sharedObserver;
};

const ScrollReveal = ({ children, animation, delay = '0s' }) => {
    // If low end, default to visible immediately
    const [isVisible, setIsVisible] = useState(() => isLowEndDevice());
    const ref = useRef(null);
    const isLowEnd = useRef(isLowEndDevice());

    useEffect(() => {
        if (isLowEnd.current) return; // Skip observer if low end

        const element = ref.current;
        if (!element) return;

        const observer = getObserver();

        // Register callback
        observersCache.set(element, () => {
            setIsVisible(true);
        });

        observer.observe(element);

        return () => {
            if (element) {
                observersCache.delete(element);
                observer.unobserve(element);
            }
        };
    }, []);

    // For low end devices, we render without the animation class to avoid overhead,
    // OR we render with 'animated' immediately.
    // Let's render with 'animated' immediately but ensure animation-duration is 0s via style if needed, 
    // or just rely on CSS not having the 'animatable' class if we wanted to be cleaner.
    // However, to keep DOM structure consistent, we'll just force isVisible=true.

    const style = {
        animationDelay: isLowEnd.current ? '0s' : delay
    };

    return (
        <div
            ref={ref}
            className={`animatable ${animation} ${isVisible ? 'animated' : ''}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
