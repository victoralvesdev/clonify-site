import React, { useEffect, useState } from 'react';

interface GlowProps {
  count?: number;
}

interface GlowElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

const FloatingGlow: React.FC<GlowProps> = ({ count = 3 }) => {
  const [glowElements, setGlowElements] = useState<GlowElement[]>([]);
  
  useEffect(() => {
    // Cria os elementos de brilho
    const elements: GlowElement[] = [];
    const colors = [
      'rgba(147, 51, 234, 0.4)',  // phantom-purple - increased opacity
      'rgba(168, 85, 247, 0.35)',  // phantom-purple-light - increased opacity
      'rgba(192, 132, 252, 0.3)',  // phantom-purple-lighter - increased opacity
    ];
    
    for (let i = 0; i < count; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 400 + 150, // Tamanho entre 150 e 550px - increased size
        opacity: Math.random() * 0.3 + 0.15, // Opacidade entre 0.15 e 0.45 - increased opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: Math.random() * 20 + 20, // Duração entre 20 e 40s
        animationDelay: Math.random() * -20, // Delay negativo para começar em pontos diferentes da animação
      });
    }
    
    setGlowElements(elements);
  }, [count]);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
      {glowElements.map((glow) => (
        <div
          key={glow.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            backgroundColor: glow.color,
            opacity: glow.opacity,
            filter: `blur(${glow.size / 2.5}px)`, // Increased blur
            animationDuration: `${glow.animationDuration}s`,
            animationDelay: `${glow.animationDelay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingGlow; 