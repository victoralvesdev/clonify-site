import React, { useState, useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  maxTilt?: number;
  glareColor?: string;
  perspective?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glareEnabled = true,
  maxTilt = 10,
  glareColor = 'rgba(255, 255, 255, 0.15)',
  perspective = 1000,
}) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    glarePosition: { x: '50%', y: '50%' },
  });
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      glarePosition: { x: `${glareX}%`, y: `${glareY}%` },
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glarePosition: { x: '50%', y: '50%' },
    });
  };
  
  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ${className}`}
      style={{ transform: tiltStyle.transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {glareEnabled && (
        <div
          className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
          style={{ borderRadius: 'inherit' }}
        >
          <div
            className="absolute w-[200%] h-[200%] top-0 left-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              transform: `translate(-50%, -50%) translate(${tiltStyle.glarePosition.x}, ${tiltStyle.glarePosition.y})`,
              background: `radial-gradient(circle at ${tiltStyle.glarePosition.x} ${tiltStyle.glarePosition.y}, ${glareColor}, transparent 70%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TiltCard; 