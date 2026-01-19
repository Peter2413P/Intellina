import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// --- Constants & Math ---
const SIDE_ANGLE = 360 / 5; // 72deg
const ANGLE = 53;
const RING_ANGLE = -11;

const generateFaces = (size) => {
  const containerWidth = size;
  const faceWidth = containerWidth * 0.5;
  const faceHeight = faceWidth * 0.86;

  // Translation values based on SCSS
  const translateZ = faceWidth * 0.335;
  const translateY = -faceHeight * 0.15;
  const translateRingZ = faceWidth * 0.75;
  const translateRingY = faceHeight * 0.78 + translateY;
  const translateLowerZ = translateZ;
  const translateLowerY = faceHeight * 0.78 + translateRingY;

  let styles = '';

  // Faces 1-5 (Top Cap)
  for (let i = 1; i <= 5; i++) {
    const angleMultiplier = i - 1;
    styles += `
      &:nth-child(${i}) {
        transform: rotateY(${-SIDE_ANGLE * angleMultiplier}deg) translateZ(${translateZ}px) translateY(${translateY}px) rotateX(${ANGLE}deg);
      }
    `;
  }

  // Faces 16-20 (Bottom Cap)
  for (let i = 16; i <= 20; i++) {
    const angleMultiplier = i - 18;
    styles += `
      &:nth-child(${i}) {
        transform: rotateY(${SIDE_ANGLE * angleMultiplier + SIDE_ANGLE / 2}deg) translateZ(${translateLowerZ}px) translateY(${translateLowerY}px) rotateZ(180deg) rotateX(${ANGLE}deg);
      }
    `;
  }

  // Faces 6-10 (Middle Ring Upper)
  for (let i = 6; i <= 10; i++) {
    const angleMultiplier = i - 11;
    styles += `
      &:nth-child(${i}) {
        transform: rotateY(${-SIDE_ANGLE * angleMultiplier}deg) translateZ(${translateRingZ}px) translateY(${translateRingY}px) rotateZ(180deg) rotateX(${RING_ANGLE}deg);
      }
    `;
  }

  // Faces 11-15 (Middle Ring Lower)
  for (let i = 11; i <= 15; i++) {
    const angleMultiplier = i - 8;
    styles += `
      &:nth-child(${i}) {
        transform: rotateY(${SIDE_ANGLE * angleMultiplier + SIDE_ANGLE / 2}deg) translateZ(${translateRingZ}px) translateY(${translateRingY}px) rotateX(${RING_ANGLE}deg);
      }
    `;
  }

  return styles;
};

// --- Keyframes ---
const rollAnimation = keyframes`
  10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
  30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
  50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
  70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
  90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotateX(-${ANGLE}deg); }
  50% { transform: translateY(-15px) rotateX(-${ANGLE}deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.5; transform: scale(0.9); }
  50% { opacity: 0.8; transform: scale(1.1); }
  100% { opacity: 0.5; transform: scale(0.9); }
`;

const pulseRing = keyframes`
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; border-width: 2px; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; border-width: 0px; }
`;

const swirl = keyframes`
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1.2); }
`;


// --- Styled Components ---

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Dynamic Positioning */
  ${props => props.rolling ? css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2.5);
  ` : css`
    right: 30px;
    bottom: 30px;
    width: ${props.size}px;
    height: ${props.size}px;
    transform: translate(0, 0) scale(1);
    
    @media (max-width: 768px) {
      right: 20px;
      bottom: 20px;
      width: ${props.size * 0.8}px;
      height: ${props.size * 0.8}px;
    }
  `}
`;

// Tooltip removed

const PulseRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid ${props => props.color};
  box-shadow: 0 0 10px ${props => props.color};
  pointer-events: none;
  z-index: -2;
  
  animation: ${pulseRing} 3s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-delay: ${props => props.delay}s;
`;

const Blackhole = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, #000000 30%, #1a0520 50%, transparent 70%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: -2;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;

  ${props => props.active && css`
    opacity: 1;
    animation: ${pulse} 2s infinite ease-in-out;
    
    &::before {
      content: '';
      position: absolute;
      inset: -20px;
      background: conic-gradient(from 0deg, transparent, #4a00e0, #ff0055, transparent);
      border-radius: 50%;
      animation: ${swirl} 3s linear infinite;
      mask: radial-gradient(circle, transparent 40%, black 60%);
      -webkit-mask: radial-gradient(circle, transparent 40%, black 60%);
    }
  `}
`;

const DieWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-out;
  cursor: pointer;
  
  transform: rotateX(-${ANGLE}deg);

  ${props => props.rolling ? css`
    animation: ${rollAnimation} 3s linear;
  ` : css`
    animation: ${float} 4s ease-in-out infinite;
  `}

  &:hover {
     animation-play-state: ${props => props.rolling ? 'running' : 'paused'};
     transform: ${props => props.rolling ? `rotateX(-${ANGLE}deg)` : `rotateX(-${ANGLE}deg) scale(1.1)`};
  }
`;

const Face = styled.figure`
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 -${props => props.size * 0.25}px;
  
  border-left: ${props => props.size * 0.25}px solid transparent;
  border-right: ${props => props.size * 0.25}px solid transparent;
  border-bottom: ${props => props.size * 0.5 * 0.86}px solid ${props => props.color};
  
  width: 0px;
  height: 0px;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  
  filter: drop-shadow(0 0 5px ${props => props.glowColor});

  &::after {
      content: '';
      position: absolute;
      top: ${props => props.size * 0.15}px;
      left: -${props => props.size * 0.25}px;
      width: ${props => props.size * 0.5}px;
      height: ${props => props.size * 0.5}px;
      background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.4), transparent 60%);
      pointer-events: none;
      transform: scaleY(0.5);
  }

  &::before {
    content: "${props => props.index}";
    position: absolute;
    top: ${props => props.size * 0.5 * 0.86 * 0.25}px;
    left: -${props => props.size * 0.5}px;
    width: ${props => props.size}px;
    text-align: center;
    color: rgba(255, 255, 255, 0.95);
    font-size: ${props => props.size * 0.2}px;
    font-family: 'Cinzel', 'Arial', sans-serif;
    font-weight: bold;
    text-shadow: 0 0 2px rgba(0,0,0,0.8);
    z-index: 2;
  }

  ${props => generateFaces(props.size)}
`;

const GlowEffect = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(circle, ${props => props.glowColor} 0%, transparent 60%);
    opacity: 0.8;
    pointer-events: none;
    mix-blend-mode: screen; 
    filter: blur(15px);
    z-index: -1;
    transition: background 0.5s ease;
    
    animation: ${pulse} 3s infinite ease-in-out reverse;
`;


const MagicalDie = ({ size = 80, isUpsideDown, onRoll }) => {
  const [rolling, setRolling] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);

  // Gemstone Colors
  const colors = [
    'rgba(40, 200, 60, 0.9)',   // Emerald
    'rgba(220, 20, 30, 0.9)',    // Ruby
    'rgba(30, 120, 250, 0.9)',  // Sapphire
    'rgba(255, 215, 0, 0.9)',    // Gold
    'rgba(160, 40, 240, 0.9)'    // Amethyst
  ];

  const glowColors = [
    'rgba(40, 255, 60, 0.6)',
    'rgba(255, 40, 50, 0.6)',
    'rgba(50, 150, 255, 0.6)',
    'rgba(255, 230, 50, 0.6)',
    'rgba(200, 80, 255, 0.6)'
  ];

  useEffect(() => {
    // Randomize color on mount or world change (if desired, or just keep it random)
    // User requested "random", so we'll pick a random one from the palette
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColorIndex(randomIndex);
  }, [isUpsideDown, colors.length]); // Added colors.length to dependencies


  const handleClick = () => {
    if (rolling) return;

    setInteracted(true);
    setRolling(true);

    setTimeout(() => {
      // Pick a NEW random color after the roll
      const randomColorAfterRoll = Math.floor(Math.random() * colors.length);
      setColorIndex(randomColorAfterRoll);

      if (onRoll) onRoll();
    }, 1500);

    setTimeout(() => {
      setRolling(false);
    }, 3000);
  };

  return (
    <Container size={size} rolling={rolling} onClick={handleClick} title={isUpsideDown ? "Return to Reality" : "Enter the Upside Down"}>
      <Blackhole active={rolling} />

      {/* Pulse Rings - Only show when idle and not upside down (to encourage first click) */}
      {!rolling && !isUpsideDown && !interacted && (
        <>
          <PulseRing color={glowColors[colorIndex]} delay={0} />
          <PulseRing color={glowColors[colorIndex]} delay={1.5} />
        </>
      )}

      <GlowEffect glowColor={glowColors[colorIndex]} />
      <DieWrapper rolling={rolling}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Face
            key={i}
            index={i + 1}
            size={size}
            color={colors[colorIndex]}
            glowColor={glowColors[colorIndex]}
          />
        ))}
      </DieWrapper>
    </Container>
  );
};

export default MagicalDie;
