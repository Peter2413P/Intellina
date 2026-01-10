import React from 'react';
import LightRays from '../reactbits/LightRays';
import LaserFlow from '../reactbits/LaserFlow';
import './GlobalEffects.css';

const GlobalEffects = () => {
    return React.createElement(
        'div',
        {
            id: 'global-effects',
            className: 'global-effects-container'
        },
        [
            React.createElement(LightRays, { key: 'rays', color: '#b1060f' }),
            React.createElement(LaserFlow, { key: 'laser', color: '#ff2a2a' })
        ]
    );
};

export default GlobalEffects;
