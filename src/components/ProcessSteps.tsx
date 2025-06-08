import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, 
  Palette, 
  Rocket, 
  ArrowRight, 
  Copy,
  Sparkles,
  CheckCircle2,
  Play,
  Eye,
  Code,
  Zap
} from 'lucide-react';
import GlowButton from './ui/GlowButton';

const ProcessSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const steps = [
    {
      id: 1,
      icon: Globe,
      title: 'Cole a URL',
      subtitle: 'Simples e Rápido',
      description: 'Cole a URL da página que deseja clonar. Nossa IA detecta automaticamente todos os elementos e estruturas.',
      features: ['Detecção automática de elementos', 'Captura de estilos CSS', 'Preservação de funcionalidades'],
      time: '~5 segundos',
      color: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      demo: 'https://exemplo.com/landing-page'
    },
    {
      id: 2,
      icon: Palette,
      title: 'Customize',
      subtitle: 'Editor Visual',
      description: 'Use nosso editor visual para personalizar cores, textos, imagens e layout. Sem código necessário.',
      features: ['Editor drag & drop', 'Customização de cores', 'Edição de textos e imagens'],
      time: '~3 minutos',
      color: 'from-purple-400 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      demo: 'Editor Visual Avançado'
    },
    {
      id: 3,
      icon: Rocket,
      title: 'Publique',
      subtitle: 'Deploy Instantâneo',
      description: 'Com um clique, sua página está online com CDN global, SSL automático e analytics integrado.',
      features: ['CDN global automático', 'SSL/TLS incluído', 'Analytics em tempo real'],
      time: '~30 segundos',
      color: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      demo: 'sua-pagina.clonify.app'
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSteps(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const stepElements = document.querySelectorAll('[data-step-card]');
    stepElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, []);

  // Auto-rotate active step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="process" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 border border-phantom-purple/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-phantom-blue/20 rounded-lg rotate-45 animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 rounded-full blur-xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-phantom-purple/20 to-phantom-blue/20 border border-phantom-purple/30">
            <Sparkles className="w-4 h-4 text-phantom-purple animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Processo Simples</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-phantom-purple-light to-phantom-blue bg-clip-text text-transparent">
              3 passos para o sucesso
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Clone, customize e hospede páginas profissionais em <span className="text-phantom-purple-light font-semibold">menos de 5 minutos</span>, 
            sem conhecimento técnico necessário.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative mb-16">
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-phantom-purple/30 via-phantom-blue/30 to-phantom-purple/30"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.id}
                data-step-card
                data-index={index}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  visibleSteps.has(index) 
                    ? 'opacity-100 transform-none' 
                    : 'opacity-0 translate-y-10'
                } ${activeStep === index ? 'scale-105' : 'hover:scale-102'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => setActiveStep(index)}
              >
                {/* Step circle */}
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} p-0.5 z-10 ${activeStep === index ? 'scale-110 shadow-lg' : ''} transition-all duration-300`}>
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {activeStep === index && (
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                  )}
                </div>

                {/* Step number */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center text-xs font-bold z-20">
                  {step.id}
                </div>

                {/* Card content */}
                <div className={`relative mt-8 p-8 rounded-3xl bg-gradient-to-br ${step.bgGradient} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden ${activeStep === index ? 'border-white/30 shadow-2xl' : ''}`}>
                  {/* Background glow for active step */}
                  {activeStep === index && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`}></div>
                  )}
                  
                  {/* Time badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 font-medium">
                    {step.time}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-phantom-purple-light transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-phantom-purple-light text-sm font-medium">
                        {step.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {step.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex}
                          className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Demo section */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Exemplo</div>
                      <div className="font-mono text-sm text-phantom-purple-light break-all">
                        {step.demo}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection arrow for non-mobile */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-phantom-purple/60">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive demo section */}
        <div className="text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-r from-phantom-purple/10 via-phantom-blue/10 to-phantom-purple/10 border border-white/10 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-phantom-purple/5 to-phantom-blue/5 animate-pulse-slow"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Vamos começar agora?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Teste o Clonify gratuitamente e veja como é simples transformar qualquer página em um funil de conversão.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton variant="gradient" size="lg" ripple={true} animated={true}>
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Ver Planos e Preços
                  </span>
                </GlowButton>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubra nossos planos e veja como o Clonify pode transformar qualquer página em um funil de conversão.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps; 