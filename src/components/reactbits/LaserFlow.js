import React from 'react';

const LaserFlow = ({ color = '#ff2a2a' }) => {
    const lines = Array.from({ length: 6 }, (_, i) => i);

    const containerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 3
    };

    const lineStyle = (index) => ({
        position: 'absolute',
        top: `${index * 20}%`,
        left: '-100%',
        width: '100%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${color}80, ${color}, ${color}80, transparent)`,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        animation: `laserFlow ${4 + index * 0.5}s linear infinite`,
        animationDelay: `${index * 0.3}s`,
        opacity: 0.6
    });

    // Inject keyframes
    React.useEffect(() => {
        const styleId = 'laser-flow-keyframes';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
        @keyframes laserFlow {
          0% { 
            left: -100%; 
            opacity: 0; 
          }
          10% { 
            opacity: 0.6; 
          }
          90% { 
            opacity: 0.6; 
          }
          100% { 
            left: 100%; 
            opacity: 0; 
          }
        }
      `;
            document.head.appendChild(style);
        }
    }, []);

    return React.createElement(
        'div',
        { style: containerStyle },
        ...lines.map((_, index) =>
            React.createElement('div', {
                key: index,
                style: lineStyle(index)
            })
        )
    );
};

export default LaserFlow;
