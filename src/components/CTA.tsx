import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import GlowButton from './ui/GlowButton';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('cta-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="cta-section" className="py-20 relative overflow-hidden bg-transparent">
      {/* Enhanced background glow effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/15 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-700/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto glass-card rounded-2xl backdrop-blur-sm border border-gray-800 p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          {/* Card inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-900/5 opacity-50"></div>
          
          {/* Corner glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white glow-text">
              Comece a criar funis que convertem hoje mesmo
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Clone páginas de alta conversão e construa funis poderosos com mapas mentais estratégicos. 
              Transforme visitantes em clientes com as ferramentas certas.
            </p>
            
            <div className="flex justify-center">
              <GlowButton href="#pricing" className="px-8 py-3 text-lg">
                Começar Agora <ArrowRight className="w-5 h-5 ml-2 inline" />
              </GlowButton>
            </div>
            
            <p className="mt-6 text-gray-400 text-sm">
              Escolha o plano ideal para seu negócio. Sem período de teste - comece criando agora mesmo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
