export const isLowEndDevice = () => {
    if (typeof window === 'undefined') return false;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return true;

    // Simple heuristic for mobile/tablet devices which might have weaker GPUs
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return true;

    // Check hardware concurrency (low core count often implies older device)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;

    return false;
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
