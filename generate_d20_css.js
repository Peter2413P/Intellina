
const fs = require('fs');

const containerWidth = 200;
const faceWidth = containerWidth * 0.5;
const faceHeight = faceWidth * 0.86;
const angle = 53;
const ringAngle = -11;
const sideAngle = 360 / 5;

const translateZ = faceWidth * 0.335;
const translateY = -faceHeight * 0.15;
const translateRingZ = faceWidth * 0.75;
const translateRingY = faceHeight * 0.78 + translateY;
const translateLowerZ = translateZ;
const translateLowerY = faceHeight * 0.78 + translateRingY;

let css = `
.d20-wrapper {
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  width: ${containerWidth}px;
  height: ${containerWidth}px;
  perspective: 1500px;
  z-index: 100;
  scale: 0.4; /* Scale down to fit as a button */
  pointer-events: none; /* Let clicks pass to button wrapper if needed, or handle on wrapper */
}

/* On mobile, move to bottom right */
@media (max-width: 768px) {
  .d20-wrapper {
    right: 20px;
    top: auto;
    bottom: 20px;
    transform: none;
    scale: 0.3;
  }
}

.die {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-out;
  cursor: pointer;
  pointer-events: auto;
}

.die.rolling {
  animation: roll 3s linear;
}

@keyframes roll {
  10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
  30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
  50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
  70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
  90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
}

.face {
  position: absolute;
  left: 50%;
  top: 0;
  margin: 0 -${faceWidth * 0.5}px;
  border-left: ${faceWidth * 0.5}px solid transparent;
  border-right: ${faceWidth * 0.5}px solid transparent;
  border-bottom: ${faceHeight}px solid rgba(177, 6, 15, 0.75); /* Red for Stranger Things */
  width: 0px;
  height: 0px;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  counter-increment: steps 1;
}

.face:before {
  content: attr(data-id);
  position: absolute;
  top: ${faceHeight * 0.25}px;
  left: -${faceWidth}px;
  color: #fff;
  text-shadow: 1px 1px 3px #000;
  font-size: ${faceHeight * 0.5}px;
  text-align: center;
  line-height: ${faceHeight * 0.9}px;
  width: ${faceWidth * 2}px;
  height: ${faceHeight}px;
  font-family: 'StrangerThingsOutlined', sans-serif;
}
`;

// Faces 1-5
for (let i = 1; i <= 5; i++) {
  const angleMultiplier = i - 1;
  css += `
.die[data-face="${i}"] {
  transform: rotateX(${-angle}deg) rotateY(${sideAngle * angleMultiplier}deg);
}
.face:nth-child(${i}) {
  transform: rotateY(${-sideAngle * angleMultiplier}deg) translateZ(${translateZ}px) translateY(${translateY}px) rotateX(${angle}deg);
}
`;
}

// Faces 16-20
for (let i = 16; i <= 20; i++) {
  const angleMultiplier = i - 15;
  css += `
.die[data-face="${i}"] {
  transform: rotateX(${-angle + 180}deg) rotateY(${-sideAngle * angleMultiplier}deg);
}
.face:nth-child(${i}) {
  transform: rotateY(${sideAngle * (i - 18) + sideAngle / 2}deg) translateZ(${translateLowerZ}px) translateY(${translateLowerY}px) rotateZ(180deg) rotateX(${angle}deg);
}
`;
}

// Faces 6-10
for (let i = 6; i <= 10; i++) {
  const angleMultiplier = i - 6;
  css += `
.die[data-face="${i}"] {
  transform: rotateX(${-ringAngle}deg) rotateZ(180deg) rotateY(${sideAngle * angleMultiplier}deg);
}
.face:nth-child(${i}) {
  transform: rotateY(${-sideAngle * (i - 11)}deg) translateZ(${translateRingZ}px) translateY(${translateRingY}px) rotateZ(180deg) rotateX(${ringAngle}deg);
}
`;
}

// Faces 11-15
for (let i = 11; i <= 15; i++) {
  const angleMultiplier = i - 8;
  css += `
.die[data-face="${i}"] {
  transform: rotateX(${-ringAngle}deg) rotateY(${-sideAngle * angleMultiplier - sideAngle / 2}deg);
}
.face:nth-child(${i}) {
  transform: rotateY(${sideAngle * (i - 8) + sideAngle / 2}deg) translateZ(${translateRingZ}px) translateY(${translateRingY}px) rotateX(${ringAngle}deg);
}
`;
}


// Write directly to file to ensure UTF-8
fs.writeFileSync('src/components/D20/D20.css', css, 'utf8');
console.log('CSS generated successfully');

