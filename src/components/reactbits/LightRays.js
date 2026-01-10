import React from 'react';

const LightRays = ({ color = '#b1060f' }) => {
    const rays = Array.from({ length: 8 }, (_, i) => i);

    const containerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2
    };

    const rayStyle = (index) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '2px',
        height: '100%',
        background: `linear-gradient(to bottom, ${color}00, ${color}40, ${color}00)`,
        transformOrigin: 'top center',
        transform: `translateX(-50%) rotate(${index * 45}deg)`,
        opacity: 0.3,
        animation: `rayPulse ${3 + index * 0.2}s ease-in-out infinite alternate`,
        filter: 'blur(1px)'
    });

    // Inject keyframes
    React.useEffect(() => {
        const styleId = 'light-rays-keyframes';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
        @keyframes rayPulse {
          0% { opacity: 0.2; transform: translateX(-50%) rotate(var(--rotation)) scaleY(0.8); }
          100% { opacity: 0.5; transform: translateX(-50%) rotate(var(--rotation)) scaleY(1.2); }
        }
      `;
            document.head.appendChild(style);
        }
    }, []);

    return React.createElement(
        'div',
        { style: containerStyle },
        ...rays.map((_, index) =>
            React.createElement('div', {
                key: index,
                style: {
                    ...rayStyle(index),
                    '--rotation': `${index * 45}deg`
                }
            })
        )
    );
};

export default LightRays;
