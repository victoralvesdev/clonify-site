import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, MousePointer, Zap, Search, TrendingUp, ArrowDown, ChevronRight, Copy, Map, Target, Sparkles, Globe, Star, Play } from 'lucide-react';
import GlowButton from './ui/GlowButton';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Lista de palavras/benefícios para alternar
  const words = ['Clone', 'Crie', 'Escale', 'Converta'];

  // Mock customer logos data
  const customerLogos = [
    { name: 'TechCorp', color: 'from-blue-400 to-blue-600' },
    { name: 'StartupX', color: 'from-green-400 to-green-600' },
    { name: 'Digital Co', color: 'from-purple-400 to-purple-600' },
    { name: 'Innovation Ltd', color: 'from-orange-400 to-orange-600' },
    { name: 'FutureVision', color: 'from-pink-400 to-pink-600' },
  ];

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) - 0.5;
      const y = ((e.clientY - top) / height) - 0.5;
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    setIsVisible(true);

    // Efeito de digitação avançado que alterna entre palavras
    if (isVisible) {
      const handleTyping = () => {
        const currentWord = words[currentWordIndex];
        
        // Velocidade de digitação - apagamento muito mais rápido que digitação
        const speed = isDeleting 
          ? 100 // extremamente rápido para deletar
          : typedText.length === currentWord.length 
            ? 500 // pausa de 5 segundos quando completar a palavra
            : 150; // velocidade moderada para digitação
        
        // Lógica de digitação
        if (!isDeleting && typedText === currentWord) {
          // Pausa de 5 segundos antes de começar a deletar
          setIsDeleting(true);
          setTypingSpeed(5000); // Pausa exatamente 5 segundos antes de começar a deletar
        } else if (isDeleting && typedText === '') {
          // Muda para a próxima palavra quando terminar de deletar
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
          setTypingSpeed(100); // Pequena pausa antes da próxima palavra
        } else {
          // Digitando ou deletando caracteres
          setTypedText(
            isDeleting
              ? currentWord.substring(0, typedText.length - 1)
              : currentWord.substring(0, typedText.length + 1)
          );
          setTypingSpeed(speed);
        }
      };
      
      const typingTimer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(typingTimer);
    }
  }, [isVisible, typedText, currentWordIndex, isDeleting, typingSpeed, words]);

  useEffect(() => {
    // Add animated particles
    const hero = heroRef.current;
    if (hero) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.setProperty('--size', `${Math.random() * 10 + 2}px`);
        particle.style.setProperty('--left', `${Math.random() * 100}%`);
        particle.style.setProperty('--top', `${Math.random() * 100}%`);
        particle.style.setProperty('--duration', `${Math.random() * 15 + 10}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        hero.appendChild(particle);
      }
    }
    
    return () => {
      if (hero) {
        const particles = hero.querySelectorAll('.hero-particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-36"
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Animated circles - reduzidos em mobile */}
        <div className="hero-circle hero-circle-1 hidden lg:block"></div>
        <div className="hero-circle hero-circle-2 hidden md:block"></div>
        <div className="hero-circle hero-circle-3 hidden lg:block"></div>
        
        {/* Grid lines - mais sutis em mobile */}
        <div className="hero-grid opacity-30 md:opacity-50"></div>
        
        {/* Geometric shapes - reduzidos em mobile */}
        <div className="hero-shape hero-triangle hidden lg:block"></div>
        <div className="hero-shape hero-square hidden md:block"></div>
        <div className="hero-shape hero-hexagon hidden lg:block"></div>
        
        {/* Light beams - apenas desktop */}
        <div className="hero-light-beam hero-light-beam-1 hidden lg:block"></div>
        <div className="hero-light-beam hero-light-beam-2 hidden lg:block"></div>
        
        {/* Enhanced gradient orbs with modern glow */}
        <div 
          className="absolute rounded-full blur-3xl bg-gradient-to-r from-phantom-purple/30 to-phantom-blue/30 w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          style={{ 
            left: `calc(20% + ${mousePosition.x * -40}px)`, 
            top: `calc(30% + ${mousePosition.y * -40}px)`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.5,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute rounded-full blur-3xl bg-gradient-to-r from-phantom-blue-light/30 to-phantom-purple-light/30 w-[200px] h-[200px] md:w-[400px] md:h-[400px]"
          style={{ 
            left: `calc(80% + ${mousePosition.x * 40}px)`, 
            top: `calc(70% + ${mousePosition.y * 40}px)`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.4,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        ></div>
        
        {/* New top glow inspired by 21st.dev */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-32 md:h-64 bg-gradient-radial from-phantom-purple/20 via-phantom-purple/10 to-transparent blur-3xl opacity-60"></div>
      </div>
      
      {/* Decorative elements - geometric designs - ocultados em mobile */}
      <div className="absolute left-5 md:left-10 top-1/3 w-16 h-16 md:w-24 md:h-24 border border-phantom-purple/30 rounded-full opacity-30 animate-pulse-slow hidden sm:block"></div>
      <div className="absolute right-5 md:right-16 bottom-1/4 w-24 h-24 md:w-40 md:h-40 border border-phantom-blue-light/20 rounded-full opacity-20 animate-pulse-slower hidden md:block"></div>
      <div className="absolute left-1/4 bottom-20 w-12 h-12 md:w-16 md:h-16 border-2 border-phantom-purple/20 rotate-45 opacity-30 animate-float-slow hidden sm:block"></div>
      <div className="absolute right-1/3 top-32 w-16 h-16 md:w-20 md:h-20 border border-phantom-blue/20 rounded-lg opacity-20 animate-float-reverse hidden lg:block"></div>
      
      {/* Animated geometric lines - apenas desktop */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0 hidden lg:block" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--phantom-purple)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--phantom-blue-light)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--phantom-purple-light)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path 
          d="M0,100 Q250,180 500,100 T1000,100" 
          fill="none" 
          stroke="url(#gridGradient)" 
          strokeWidth="1"
          className="animate-wave-slow"
        />
        <path 
          d="M0,200 Q250,280 500,200 T1000,200" 
          fill="none" 
          stroke="url(#gridGradient)" 
          strokeWidth="1"
          className="animate-wave-slower"
        />
        <path 
          d="M0,300 Q250,380 500,300 T1000,300" 
          fill="none" 
          stroke="url(#gridGradient)" 
          strokeWidth="1"
          className="animate-wave-slow"
        />
      </svg>

      {/* Enhanced Animated particles with icons - reduzidos em mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-3]">
        {/* Enhanced floating elements with better glassmorphism */}
        <div className="floating-icon absolute top-[15%] right-[5%] md:right-[15%] animate-float-medium delay-200">
          <div className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-phantom-purple/20 hover:scale-105 transition-transform duration-300">
            <Copy className="w-5 h-5 md:w-7 md:h-7 text-phantom-purple-light" />
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-phantom-purple to-phantom-blue animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <div className="floating-icon absolute bottom-[25%] left-[5%] md:left-[20%] animate-float-medium delay-700">
          <div className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-phantom-purple/20 hover:scale-105 transition-transform duration-300">
            <Globe className="w-5 h-5 md:w-7 md:h-7 text-phantom-blue-light" />
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-phantom-blue to-phantom-purple animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-phantom-blue/10 to-phantom-purple/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <div className="floating-icon absolute top-[60%] right-[10%] md:right-[25%] animate-float-medium delay-500 hidden sm:block">
          <div className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-phantom-purple/20 hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 md:w-7 md:h-7 text-phantom-purple-light" />
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-phantom-purple to-phantom-blue animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Linhas hexagonais - apenas desktop */}
        <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 w-[150px] h-[150px] md:w-[200px] md:h-[200px] opacity-20 hidden lg:block">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" stroke="url(#hexGradient)" fill="none" strokeWidth="0.5" className="animate-rotate-slow" />
            <polygon points="50,10 83.3,30 83.3,70 50,90 16.7,70 16.7,30" stroke="url(#hexGradient)" fill="none" strokeWidth="0.3" className="animate-rotate-slow" style={{animationDirection: 'reverse'}} />
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(157, 78, 221, 0.6)" />
                <stop offset="100%" stopColor="rgba(58, 80, 107, 0.6)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Background circles with enhanced gradients and animations */}
      <div 
        className="floating-circle absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-10 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.15) 0%, rgba(123, 44, 191, 0.1) 40%, transparent 70%)',
          top: '10%',
          left: '5%',
          transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
        }}
      ></div>

      {/* Resto do conteúdo do Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          {/* Enhanced modern badge announcement with staggered animation */}
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 mb-6 md:mb-8 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-phantom-purple/10 via-transparent to-phantom-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center gap-2 md:gap-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-phantom-purple animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 md:w-4 md:h-4">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-phantom-purple-light animate-ping opacity-30" />
                    </div>
                  </div>
                  <span className="text-white/90 text-xs md:text-sm font-medium">🚀 Novidade: Clone páginas em segundos</span>
                </div>
                <div className="flex items-center gap-1 text-phantom-purple hover:text-phantom-purple-light transition-colors">
                  <span className="text-xs md:text-sm font-semibold">Saiba mais</span>
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced title with modern gradient and staggered animation */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
              <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-phantom-purple via-phantom-purple-light to-phantom-blue bg-clip-text text-transparent animate-gradient">
                  {typedText}
                  {(typedText.length === words[currentWordIndex].length || (isDeleting && typingSpeed === 5000)) && (
                      <span className="inline-block w-0.5 md:w-1 h-8 md:h-12 lg:h-16 xl:h-20 bg-phantom-purple/80 ml-1 md:ml-2 animate-blink-ultrafast"></span>
                  )}
                  </span>
                </span>
                <span className="block mt-1 md:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"> páginas e hospede em segundos</span>
              </span>
            </h1>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto font-medium leading-relaxed px-4 sm:px-0">
                <span className="text-white font-semibold">Transforme</span> qualquer página em um funil de vendas poderoso com o 
                <span className="text-phantom-purple-light font-semibold"> Clonify</span> - a ferramenta mais rápida para clonar e hospedar páginas.
              </p>
            </div>
          </div>
            
          {/* Enhanced modern button group with staggered animation */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 justify-center">
              {/* Primary CTA with enhanced glow and new gradient variant */}
              <GlowButton 
                variant="gradient"
                size="lg"
                glow={true}
                ripple={true}
                animated={true}
                className="group relative overflow-hidden w-full sm:w-auto"
              >
                <span className="flex items-center gap-2 md:gap-3 justify-center">
                  <span><a href="">Saiba Mais</a> </span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </GlowButton>
              
            </div>
          </div>

          {/* Quick Stats Section - inspired by 21st.dev */}
          <div className={`transition-all duration-1000 delay-450 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} mb-8 md:mb-12 w-full max-w-4xl`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[
                { number: '10k+', label: 'Páginas Clonadas', icon: Copy, delay: '0ms' },
                { number: '30s', label: 'Tempo Médio', icon: Zap, delay: '100ms' },
                { number: '99.9%', label: 'Uptime', icon: TrendingUp, delay: '200ms' },
                { number: '24/7', label: 'Suporte', icon: Star, delay: '300ms' }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="group relative"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="relative p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-phantom-purple/50 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon with floating animation */}
                    <div className="relative z-10 mb-2 md:mb-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 mx-auto rounded-lg bg-gradient-to-r from-phantom-purple/20 to-phantom-blue/20 border border-phantom-purple/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-3 h-3 md:w-4 md:h-4 text-phantom-purple-light group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    
                    {/* Number with counter animation effect */}
                    <div className="relative z-10 text-center">
                      <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-phantom-purple-light transition-colors duration-300">
                        {stat.number}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-phantom-purple/0 group-hover:border-phantom-purple/30 transition-all duration-300"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-phantom-purple/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced mockup section with staggered animation */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} relative w-full max-w-5xl`}>
            <div className="relative">
              {/* Mockup frame with enhanced glow */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg md:rounded-xl border border-white/10 relative overflow-hidden">
                  {/* Simulated interface */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 flex gap-1 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-phantom-purple/20 to-phantom-blue/20 border border-phantom-purple/30 flex items-center justify-center backdrop-blur-xl">
                        <Globe className="w-8 h-8 md:w-12 md:h-12 text-phantom-purple-light" />
                      </div>
                      <h3 className="text-white text-lg md:text-xl font-semibold mb-1 md:mb-2">Clonify Dashboard</h3>
                      <p className="text-gray-400 text-xs md:text-sm">Clone, customize e hospede em minutos</p>
                    </div>
                  </div>
                  
                  {/* Animated elements */}
                  <div className="absolute top-12 md:top-20 left-4 md:left-8 w-20 md:w-32 h-1 md:h-2 bg-phantom-purple/30 rounded animate-pulse"></div>
                  <div className="absolute top-16 md:top-28 left-4 md:left-8 w-16 md:w-24 h-1 md:h-2 bg-phantom-blue/30 rounded animate-pulse delay-300"></div>
                  <div className="absolute bottom-12 md:bottom-20 right-4 md:right-8 w-20 md:w-28 h-6 md:h-8 bg-phantom-purple/20 rounded border border-phantom-purple/40 animate-pulse delay-500"></div>
                </div>
              </div>
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-phantom-purple/20 via-transparent to-phantom-blue/20 rounded-2xl md:rounded-3xl blur-2xl opacity-60 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Customer logos section inspired by 21st.dev */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'} mt-12 md:mt-16 w-full max-w-4xl`}>
            <p className="text-gray-400 text-xs md:text-sm mb-6 md:mb-8 font-medium">Confiado por empresas inovadoras</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 opacity-60 hover:opacity-80 transition-opacity duration-300">
              {customerLogos.map((logo, index) => (
                <div 
                  key={logo.name}
                  className={`flex items-center justify-center w-20 h-10 md:w-24 md:h-12 rounded-lg bg-gradient-to-r ${logo.color} opacity-20 hover:opacity-40 transition-all duration-300 hover:scale-105`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-white font-bold text-xs truncate px-2">
                    {logo.name}
                  </div>
                </div>
              ))}
            </div>
                </div>
          
          {/* Enhanced Scroll indicator with staggered animation */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'} mt-12 md:mt-16`}>
            <a href="#features" className="inline-flex flex-col items-center text-gray-300 hover:text-white transition-colors duration-300 group">
              <span className="text-xs md:text-sm mb-2 md:mb-3 font-medium">Descubra mais</span>
              <div className="relative w-5 h-8 md:w-6 md:h-10 border-2 border-phantom-purple/60 rounded-full flex items-center justify-center group-hover:border-phantom-purple group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-phantom-purple rounded-full animate-scroll-indicator"></div>
                <div className="absolute inset-0 rounded-full border border-phantom-purple/30 animate-ping-slow"></div>
              </div>
            </a>
            </div>
        </div>
      </div>
      
      {/* Enhanced 3D elements with mouse movement */}
      <div 
        className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-phantom-purple/15 to-phantom-blue/10 rounded-full blur-2xl"
        style={{ 
          left: `calc(25% + ${mousePosition.x * 50}px)`, 
          top: `calc(70% + ${mousePosition.y * 50}px)`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.4s ease-out, top 0.4s ease-out'
        }}
      ></div>
      <div 
        className="absolute w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-phantom-blue-light/15 to-transparent rounded-full blur-2xl"
        style={{ 
          right: `calc(30% + ${mousePosition.x * -40}px)`, 
          top: `calc(30% + ${mousePosition.y * -40}px)`,
          transform: 'translate(50%, -50%)',
          transition: 'right 0.4s ease-out, top 0.4s ease-out'
        }}
      ></div>
    </section>
  );
};

export default Hero;
