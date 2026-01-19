import { useEffect, useState, useCallback } from 'react';
import './BlackHoleTransition.css';

const PHASES = {
    IDLE: 'idle',
    SUCKING: 'sucking',
    EXPELLING: 'expelling'
};

export const BlackHoleTransition = ({ isFlipping, onPhaseChange }) => {
    const [phase, setPhase] = useState(PHASES.IDLE);

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const runTransition = useCallback(async () => {
        if (phase !== PHASES.IDLE) return;

        // Phase 1: Suck into Black Hole
        setPhase(PHASES.SUCKING);
        document.body.classList.add('blackhole-sucking');
        if (onPhaseChange) onPhaseChange(PHASES.SUCKING);

        // Wait for suck animation (simulated 1.5s to middle of die roll)
        await wait(1500);

        // Trigger the Flip Point (State Toggle happened in die logic, but we can signal here too)
        if (onPhaseChange) onPhaseChange('FLIP_POINT');

        // Phase 2: Expel from Black Hole
        document.body.classList.remove('blackhole-sucking');
        document.body.classList.add('blackhole-expelling');
        setPhase(PHASES.EXPELLING);
        if (onPhaseChange) onPhaseChange(PHASES.EXPELLING);

        await wait(1500); // Wait for expel animation

        // Cleanup
        document.body.classList.remove('blackhole-expelling');
        setPhase(PHASES.IDLE);
        if (onPhaseChange) onPhaseChange('idle');
    }, [phase, onPhaseChange]);

    useEffect(() => {
        if (isFlipping) {
            runTransition();
        }
    }, [isFlipping, runTransition]);



    return null; // Logic-only component that affects global BODY classes
};

export default BlackHoleTransition;
