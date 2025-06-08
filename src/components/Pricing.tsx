import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import GlowButton from './ui/GlowButton';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Usando requestAnimationFrame para melhorar performance
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Aumentando rootMargin para carregar mais cedo
    );

    const element = document.getElementById('pricing');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const plans = [
    {
      name: "Pro",
      description: "Ideal para empreendedores e pequenas empresas",
      monthlyPrice: "R$97",
      yearlyPrice: "R$970",
      yearlyMonthly: "R$81",
      paymentLink: "https://pay.cakto.com.br/no7opqn_423231",
      features: [
        { text: "10 clonagens de páginas por mês" },
        { text: "3 domínios próprios" },
        { text: "Espione anuncios escalados", description: "Clone páginas e ofertas validadas" },
        { text: "Suporte por email" }
      ],
      buttonText: "Começar com Pro",
      highlighted: false
    },
    {
      name: "Executive",
      description: "Para profissionais que buscam mais recursos",
      monthlyPrice: "R$147",
      yearlyPrice: "R$1.470",
      yearlyMonthly: "R$123",
      paymentLink: "https://pay.cakto.com.br/g6m57t5",
      features: [
        { text: "25 clonagens de páginas por mês" },
        { text: "6 domínios próprios" },
        { text: "3 domínios gratuitos inclusos" },
        { text: "Espione anuncios escalados", description: "Clone páginas e ofertas validadas" },
        { text: "Suporte prioritário" },
        { text: "Templates premium" }
      ],
      buttonText: "Escolher Executive",
      highlighted: true
    },
    {
      name: "Master",
      description: "Solução completa para grandes operações",
      monthlyPrice: "R$197",
      yearlyPrice: "R$1.970",
      yearlyMonthly: "R$164",
      paymentLink: "https://pay.cakto.com.br/35iuou3",
      features: [
        { text: "Clonagens ilimitadas" },
        { text: "25 domínios próprios" },
        { text: "6 domínios gratuitos inclusos" },
        { text: "Funis avançados" },
        { text: "Mapas mentais" },
        { text: "Espione anuncios escalados", description: "Clone páginas e ofertas validadas" },
        { text: "Suporte 24/7" },
        { text: "Consultoria personalizada" }
      ],
      buttonText: "Escolher Master",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Reduzindo a quantidade de efeitos de fundo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] -z-10 will-change-transform"></div>
      
      {/* Reduzindo a quantidade de partículas animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-phantom-purple/30 rounded-full animate-float-slow will-change-transform"></div>
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-phantom-purple/20 rounded-full animate-float-slow delay-500 will-change-transform"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Planos <span className="text-phantom-purple">Flexíveis</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta ao seu negócio e comece a criar funis que convertem hoje mesmo.
          </p>
          

        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 md:p-8 transition-all duration-700 relative ${
                isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              } ${plan.highlighted ? 'border-phantom-purple/50 shadow-md shadow-phantom-purple/10 scale-105' : 'border-gray-800/50'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-phantom-purple to-transparent"></div>
              )}
              
              <h3 className="text-2xl font-bold mb-2 text-white">Plano {plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{isYearly ? plan.yearlyMonthly : plan.monthlyPrice}</span>
                {isYearly && <span className="text-gray-400 ml-2">/mês</span>}
                {isYearly && (
                  <div className="text-sm text-gray-400 mt-1">
                    {plan.yearlyPrice} cobrado anualmente
                  </div>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-phantom-purple shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <span className="text-gray-300">{feature.text}</span>
                      {feature.description && (
                        <div className="text-gray-500 text-sm mt-1">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <GlowButton 
                className={`w-full py-3 ${
                  plan.highlighted 
                    ? 'bg-phantom-purple hover:bg-phantom-purple-dark text-white' 
                    : 'bg-phantom-black-light border border-phantom-purple/50 hover:bg-phantom-purple/10 text-white'
                }`}
                href={plan.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.buttonText}
              </GlowButton>
            </div>
          ))}
        </div>
        
        <div className={`mt-10 text-center text-gray-400 text-sm max-w-2xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0'
        }`} style={{ transitionDelay: '300ms' }}>
          <p>
          Todos os planos garantem acesso completo à plataforma Clonify. 
          Para mais informações sobre os planos ou dúvidas sobre funcionalidades, 
          entre em contato com nossa equipe de suporte.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
