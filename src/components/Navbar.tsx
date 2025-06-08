import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      
      // Determine active section based on scroll position
      const sections = ['features', 'pricing', 'testimonials', 'cta-section'];
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Map section names to display text
  const sectionNames: Record<string, string> = {
    'features': 'Recursos',
    'pricing': 'Preços',
    'testimonials': 'Depoimentos',
    'cta-section': 'Contato'
  };
  
  const NavLink = ({ id, children }: { id: string, children: React.ReactNode }) => {
    const isActive = activeSection === id;
    
    return (
      <a 
        href={`#${id}`} 
        className="relative py-2 px-1 group nav-link-hover-effect"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
          {children}
        </span>
        
        {/* Active indicator - apenas para links ativos */}
        {isActive && (
          <span 
            className="absolute bottom-0 left-0 h-0.5 bg-phantom-purple rounded-full w-full"
            style={{ 
              opacity: 1,
              boxShadow: '0 0 8px rgba(157, 78, 221, 0.5)'
            }}
          />
        )}
      </a>
    );
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-phantom-black-dark/80 backdrop-blur-md shadow-lg border-b border-phantom-purple/10' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-2xl font-bold group">
          <div className="relative">
            {/* Logo Clonify - imagem da pasta public */}
            <img 
              src="./logo-clonify.png" 
              alt="Clonify Logo" 
              className="w-16 h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
              onError={(e) => {
                // Fallback caso a imagem não carregue
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'flex';
                }
              }}
            />
            {/* Fallback logo SVG */}
            <div 
              className="w-16 h-16 bg-gradient-to-br from-phantom-purple to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
              style={{ display: 'none' }}
            >
              C
            </div>
          </div>
          <span className="phantom-gradient-text relative">
            Clonify
            <span className="absolute -bottom-1 left-0 right-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-gradient-to-r from-phantom-purple/0 via-phantom-purple to-phantom-purple/0"></span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink id="features">
            {sectionNames['features']}
          </NavLink>
          <NavLink id="pricing">
            {sectionNames['pricing']}
          </NavLink>
          <NavLink id="testimonials">
            {sectionNames['testimonials']}
          </NavLink>
        </div>
        
        <button 
          className="md:hidden relative text-white/80 hover:text-white p-2 focus:outline-none group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <Menu size={24} className="transition-transform duration-300 group-hover:scale-110" />
          )}
          <span className="absolute inset-0 rounded-full bg-phantom-purple/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-phantom-black-dark/95 backdrop-blur-md py-4 px-6 shadow-lg animate-fade-in border-t border-phantom-purple/10">
          <div className="flex flex-col space-y-4">
            <div className="animate-slide-in-right" style={{ animationDelay: '100ms' }}>
              <NavLink id="features">
                {sectionNames['features']}
              </NavLink>
            </div>
            <div className="animate-slide-in-right" style={{ animationDelay: '200ms' }}>
              <NavLink id="pricing">
                {sectionNames['pricing']}
              </NavLink>
            </div>
            <div className="animate-slide-in-right" style={{ animationDelay: '300ms' }}>
              <NavLink id="testimonials">
                {sectionNames['testimonials']}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
