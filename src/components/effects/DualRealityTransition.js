import React, { useEffect, useState } from 'react';
import './DualRealityTransition.css';

const PHASES = {
    IDLE: 'idle',
    DESTABILIZING: 'destabilizing',
    FLIPPING: 'flipping',
    STABILIZING: 'stabilizing'
};

const TIMINGS = {
    DESTABILIZE: 400, // 0.4s
    FLIP: 700,        // 0.7s
    STABILIZE: 500    // 0.5s
};

/**
 * Orchestrates the transition effects on the body and provides the overlay.
 * @param {boolean} isFlipping - Trigger to start transition
 * @param {boolean} isUpsideDown - The TARGET state we are going to
 * @param {function} onPhaseChange - Optional callback for phase updates
 */
export const DualRealityTransition = ({ isFlipping, isUpsideDown, onPhaseChange }) => {
    const [phase, setPhase] = useState(PHASES.IDLE);

    useEffect(() => {
        if (isFlipping) {
            // Start Sequence
            runTransitionSequence();
        } else {
            setPhase(PHASES.IDLE);
            cleanupClasses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFlipping]);

    const runTransitionSequence = async () => {
        // Phase 1: Destabilize
        setPhase(PHASES.DESTABILIZING);
        document.body.classList.add('transition-destabilizing');
        if (onPhaseChange) onPhaseChange(PHASES.DESTABILIZING);

        await wait(TIMINGS.DESTABILIZE);

        // Phase 2: World Flip
        cleanupClasses();
        setPhase(PHASES.FLIPPING);
        document.body.classList.add('transition-flipping');
        // If we are returning to reality, add a specific class for reverse animation if needed
        if (!isUpsideDown) {
            document.body.classList.add('returning');
        }
        if (onPhaseChange) onPhaseChange(PHASES.FLIPPING);

        // Wait half of flip duration to trigger state change (when rotation is at 90deg)
        await wait(TIMINGS.FLIP / 2);
        if (onPhaseChange) onPhaseChange('FLIP_POINT');

        await wait(TIMINGS.FLIP / 2);

        // Phase 3: Stabilization
        cleanupClasses();
        setPhase(PHASES.STABILIZING);
        document.body.classList.add('transition-stabilizing');

        // This is when the "State" officially lands
        if (onPhaseChange) onPhaseChange(PHASES.STABILIZING);

        await wait(TIMINGS.STABILIZE);

        // End
        cleanupClasses();
        setPhase(PHASES.IDLE);
        if (onPhaseChange) onPhaseChange(PHASES.IDLE);
    };

    const cleanupClasses = () => {
        document.body.classList.remove(
            'transition-destabilizing',
            'transition-flipping',
            'transition-stabilizing',
            'returning'
        );
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    if (phase === PHASES.IDLE) return null;

    return (
        <div className={`dual-reality-overlay phase-${phase}`}>
            {/* Optional inner elements for vignette or dust can go here */}
        </div>
    );
};

export default DualRealityTransition;
