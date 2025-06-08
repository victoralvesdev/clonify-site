import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: {
    r: number;
    g: number;
    b: number;
  };
  vx: number;
  vy: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameIdRef = useRef<number>(0);

  // Inicializa as partículas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajusta o tamanho do canvas para preencher a tela
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Reinicializa as partículas quando o tamanho da tela muda
        initParticles();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Inicializa as partículas
  const initParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 60); // Aumentado o número de partículas
    
    const newParticles: Particle[] = [];
    
    // Cores para as partículas (tons de roxo)
    const colors = [
      { r: 147, g: 51, b: 234 },  // phantom-purple
      { r: 168, g: 85, b: 247 },  // phantom-purple-light
      { r: 192, g: 132, b: 252 }, // phantom-purple-lighter
      { r: 126, g: 34, b: 206 },  // phantom-purple-dark
    ];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 30, // Tamanho entre 30 e 90 - aumentado
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.15, // Velocidade baixa para movimento suave
        vy: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.15, // Opacidade entre 0.15 e 0.55 - aumentada
      });
    }
    
    setParticles(newParticles);
  };

  // Anima as partículas
  useEffect(() => {
    if (particles.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const updatedParticles = [...particles];
      
      updatedParticles.forEach((particle) => {
        // Atualiza posição
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Verifica limites e reposiciona se necessário
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        // Cria gradiente para cada partícula
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        // Formato RGBA correto
        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
        
        // Desenha a partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [particles]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-3] pointer-events-none"
      style={{ opacity: 0.7 }} // Aumentada a opacidade
    />
  );
};

export default AnimatedBackground;
