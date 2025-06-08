import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CodeShowcase from '../components/CodeShowcase';
import ProcessSteps from '../components/ProcessSteps';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import SectionSeparator from '../components/ui/section-separator';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingGlow from '../components/FloatingGlow';
import '../animations.css';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Show page after a short delay for smoother animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Change page title
    document.title = 'Clonify - Clone Páginas e Crie Funis';
    
    // Setup scroll reveal animation
    const setupScrollReveal = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    };
    
    setupScrollReveal();
    
    // Cursor effects for interactive elements
    const handleLinkHover = () => setCursorVariant('link');
    const handleButtonHover = () => setCursorVariant('button');
    const handleDefaultCursor = () => setCursorVariant('default');
    
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleDefaultCursor);
    });
    
    document.querySelectorAll('.btn-phantom, .btn-phantom-outline, button[type="submit"]').forEach(el => {
      el.addEventListener('mouseenter', handleButtonHover);
      el.addEventListener('mouseleave', handleDefaultCursor);
    });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleDefaultCursor);
      });
      document.querySelectorAll('.btn-phantom, .btn-phantom-outline, button[type="submit"]').forEach(el => {
        el.removeEventListener('mouseenter', handleButtonHover);
        el.removeEventListener('mouseleave', handleDefaultCursor);
      });
    };
  }, []);
  
  // Update custom cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);
  
  // Determine cursor style based on variant
  const getCursorStyle = () => {
    switch (cursorVariant) {
      case 'link':
        return 'w-8 h-8 bg-phantom-purple/30 mix-blend-screen';
      case 'button':
        return 'w-12 h-12 bg-phantom-purple/20 mix-blend-screen';
      default:
        return 'w-6 h-6 bg-phantom-purple/40 mix-blend-screen';
    }
  };
  
  return (
    <div className={`min-h-screen bg-phantom-black text-white transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Custom cursor - only show on desktop */}
      {!isMobile && (
        <div 
          ref={cursorRef} 
          className={`cursor-trace hidden md:block ${getCursorStyle()}`}
          style={{ 
            left: mousePosition.x, 
            top: mousePosition.y,
            transition: 'width 0.2s, height 0.2s, background-color 0.3s, transform 0.05s',
            zIndex: 9999 // Ensure cursor is always on top
          }}
        />
      )}
      
      {/* Enhanced background effects - Always visible regardless of loading state */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        {/* Main central glow - increased intensity */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] bg-phantom-purple/15 rounded-full blur-[250px]" />
        
        {/* Additional glows with increased intensity */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-phantom-purple/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[900px] h-[900px] bg-phantom-purple/15 rounded-full blur-[200px]" />
        <div className="absolute top-3/4 right-1/3 w-[700px] h-[700px] bg-phantom-purple/18 rounded-full blur-[150px]" />
        
        {/* Smaller accent glows with increased intensity */}
        <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] bg-phantom-purple/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[30%] left-[20%] w-[350px] h-[350px] bg-phantom-purple/20 rounded-full blur-[90px]" />
        <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-phantom-purple/22 rounded-full blur-[80px]" />
        
        {/* Light beams */}
        <div className="absolute top-0 left-1/4 w-[2px] h-[300px] bg-phantom-purple/30 blur-[3px] animate-pulse-glow" />
        <div className="absolute top-0 right-1/3 w-[3px] h-[400px] bg-phantom-purple/20 blur-[4px] animate-pulse-glow delay-300" />
        <div className="absolute bottom-0 left-1/3 w-[2px] h-[350px] bg-phantom-purple/25 blur-[3px] animate-pulse-glow delay-700" />
        
        {/* Animated elements with higher z-index */}
        <AnimatedBackground />
        <FloatingGlow count={8} />
      </div>
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        <SectionSeparator />
        
        <div className="reveal-on-scroll">
          <CodeShowcase />
        </div>
        
        <SectionSeparator />
        
        <div className="reveal-on-scroll">
          <ProcessSteps />
        </div>
        
        <SectionSeparator />
        
        <div className="reveal-on-scroll">
          <Features />
        </div>
        
        <SectionSeparator />
        
        <div className="reveal-on-scroll">
          <Pricing />
        </div>
        
        <SectionSeparator />
        
        <div className="reveal-on-scroll">
          <Testimonials />
        </div>
        
        <SectionSeparator />
        
        <div className="reveal-on-scroll">
          <CTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
