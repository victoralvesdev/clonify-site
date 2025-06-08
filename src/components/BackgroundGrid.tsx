import React, { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  delay: number;
  duration: number;
}

const BackgroundGrid: React.FC = () => {
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Criar elementos flutuantes
    const elements: FloatingElement[] = [];
    for (let i = 0; i < 5; i++) {
      elements.push({
        id: i,
        size: Math.random() * 200 + 100, // Tamanho entre 100px e 300px
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.05 + 0.02, // Opacidade entre 0.02 e 0.07
        delay: Math.random() * -20,
        duration: Math.random() * 10 + 15, // Duração entre 15s e 25s
      });
    }
    setFloatingElements(elements);
  }, []);

  return (
    <>
      <div className="bg-grid-pattern"></div>
      <div className="bg-gradient-grid"></div>
      
      {/* Elementos flutuantes */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="fixed rounded-full pointer-events-none z-neg-5"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.x}%`,
            top: `${element.y}%`,
            background: `radial-gradient(circle, rgba(157, 78, 221, ${element.opacity}) 0%, rgba(30, 42, 58, ${element.opacity / 2}) 70%, transparent 100%)`,
            transform: 'translate(-50%, -50%)',
            animation: `float-slow ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`,
          }}
        />
      ))}
    </>
  );
};

export default BackgroundGrid; 