import React, { useState, useEffect, useRef } from 'react';
import './D20.css';

const STRANGER_COLORS = [
    'rgba(177, 6, 15, 0.75)',   // Classic Red/Reality
    'rgba(74, 144, 226, 0.75)', // Eleven Blue/Upside Down
    'rgba(107, 92, 231, 0.75)', // Void Purple
    'rgba(255, 69, 0, 0.75)',   // Burning Orange
    'rgba(46, 204, 113, 0.75)', // Lab Green
    'rgba(255, 215, 0, 0.75)'   // 80s Gold
];

const D20 = ({ onClick, isUpsideDown }) => {
    const [isRolling, setIsRolling] = useState(false);
    const [isCentered, setIsCentered] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const [currentFace, setCurrentFace] = useState(1);
    const containerRef = useRef(null);

    // Apply color dynamically
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--d20-color', STRANGER_COLORS[colorIndex]);
        }
    }, [colorIndex]);

    // Update face when world flips (if not manually triggered)
    useEffect(() => {
        if (!isRolling) {
            setCurrentFace(isUpsideDown ? 20 : 1);
            // Also sync color if it's just a state load, though we want manual clicks to cycle
            if (isUpsideDown && colorIndex === 0) setColorIndex(1); // Ensure blue for upside down initially
            if (!isUpsideDown && colorIndex === 1) setColorIndex(0); // Ensure red for reality initially
        }
    }, [isUpsideDown]);

    const handleClick = () => {
        if (isRolling || isCentered) return;

        // 1. Move to Center & Scale Up
        setIsCentered(true);

        // 2. Start Rolling after move transition (adjust timing as needed)
        setTimeout(() => {
            setIsRolling(true);

            // 3. Mid-Roll: Flip World & Change Color
            setTimeout(() => {
                if (onClick) onClick();
                setColorIndex((prev) => (prev + 1) % STRANGER_COLORS.length);
            }, 1000); // Trigger flip 1s into roll

            // 4. End Roll & Return
            setTimeout(() => {
                setIsRolling(false);
                // Force face to match new world state
                setCurrentFace(isUpsideDown ? 1 : 20); // Note: isUpsideDown is technically the OLD state here inside closure? 
                // actually onClick triggers parent update, but prop might not update instantly in this closure.
                // better to rely on useEffect for face, but we want to ensure animation landing.

                // Return to corner
                setTimeout(() => {
                    setIsCentered(false);
                }, 500); // Slight pause before returning
            }, 3000); // 3s roll duration matching CSS

        }, 800); // 0.8s for center transition
    };

    return (
        <div
            ref={containerRef}
            className={`d20-wrapper ${isCentered ? 'centered' : ''}`}
            title={isUpsideDown ? "Return to Reality" : "Roll for the Upside Down"}
        >
            <div className={`click-me-label ${isCentered ? 'hidden' : ''}`}>Click Me</div>
            <div
                className={`die ${isRolling ? 'rolling' : ''}`}
                data-face={currentFace}
                onClick={handleClick}
            >
                {Array.from({ length: 20 }, (_, i) => (
                    <figure key={i + 1} className={`face face-${i + 1}`} data-id={i + 1}></figure>
                ))}
            </div>
        </div>
    );
};

export default D20;
