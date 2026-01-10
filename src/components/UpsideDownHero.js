import React from 'react';
import './UpsideDownHero.css';
const UpsideDownHero = ({ isUpsideDown = false }) => {
    return React.createElement(
        'section',
        {
            className: 'hero' + (isUpsideDown ? ' upside-down' : ''),
            id: 'upside-down-hero'
        },

        // Background image - changes based on world state
        React.createElement('img', {
            src: isUpsideDown ? '/assets/st_upsidedown.jpeg' : '/assets/St_main_world.png',
            alt: isUpsideDown ? 'Upside Down World' : 'Normal World',
            className: 'hero-bg'
        })
    );
};

export default UpsideDownHero;
