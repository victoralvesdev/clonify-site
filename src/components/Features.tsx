import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, 
  Globe, 
  Shield, 
  Sparkles, 
  Code, 
  Rocket, 
  Target, 
  Layers, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  Cloud,
  Lock,
  BarChart
} from 'lucide-react';
import GlowButton from './ui/GlowButton';

const Features = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set());
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const features = [
    {
      icon: Zap,
      title: 'Clone Instantâneo',
      description: 'Clone qualquer página em segundos com nossa tecnologia avançada de captura e replicação.',
      details: ['Captura de DOM completa', 'Preservação de estilos', 'Otimização automática'],
      color: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-500/10 to-orange-500/10',
      category: 'Velocidade'
    },
    {
      icon: Globe,
      title: 'Hospedagem Global',
      description: 'CDN mundial com edge computing para performance máxima em qualquer lugar do mundo.',
      details: ['99.9% uptime garantido', 'Edge computing', 'SSL automático'],
      color: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      category: 'Infraestrutura'
    },
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Proteção completa com criptografia end-to-end e monitoramento 24/7.',
      details: ['Criptografia SSL/TLS', 'Backup automático', 'Monitoramento contínuo'],
      color: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      category: 'Segurança'
    },
    {
      icon: Code,
      title: 'Personalização Total',
      description: 'Editor visual avançado para customizar cada elemento da sua página clonada.',
      details: ['Editor drag & drop', 'CSS customizado', 'Componentes reutilizáveis'],
      color: 'from-purple-400 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      category: 'Customização'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avançado',
      description: 'Métricas detalhadas e insights acionáveis para otimizar suas conversões.',
      details: ['Heatmaps em tempo real', 'A/B testing', 'Funis de conversão'],
      color: 'from-indigo-400 to-purple-500',
      bgGradient: 'from-indigo-500/10 to-purple-500/10',
      category: 'Analytics'
    },
    {
      icon: Rocket,
      title: 'Deploy Automático',
      description: 'Publicação instantânea com otimização automática para todos os dispositivos.',
      details: ['Deploy em 1 clique', 'Otimização mobile', 'Cache inteligente'],
      color: 'from-red-400 to-pink-500',
      bgGradient: 'from-red-500/10 to-pink-500/10',
      category: 'Deploy'
    }
  ];

  const stats = [
    { number: '10k+', label: 'Páginas Clonadas', icon: Target },
    { number: '99.9%', label: 'Uptime', icon: Cloud },
    { number: '50ms', label: 'Load Time', icon: Zap },
    { number: '24/7', label: 'Suporte', icon: Shield }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleFeatures(prev => new Set([...prev, index]));
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
    const featureElements = document.querySelectorAll('[data-feature-card]');
    featureElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, []);

  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="features-grid-pattern"></div>
        <div className="absolute top-20 right-20 w-40 h-40 border border-phantom-purple/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 border border-phantom-blue/20 rounded-lg rotate-45 animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 rounded-full blur-2xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-phantom-purple/20 to-phantom-blue/20 border border-phantom-purple/30">
            <Sparkles className="w-4 h-4 text-phantom-purple animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Recursos Poderosos</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-phantom-purple-light to-phantom-blue bg-clip-text text-transparent">
              Tudo que você precisa
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Uma plataforma completa para <span className="text-phantom-purple-light font-semibold">clonar, customizar e hospedar</span> páginas 
            com a mais alta performance e segurança.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="group relative text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-phantom-purple/50 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                {/* Background glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-phantom-purple/20 to-phantom-blue/20 border border-phantom-purple/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-phantom-purple-light group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-phantom-purple-light transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-feature-card
              data-index={index}
              className={`group relative transition-all duration-700 ${
                visibleFeatures.has(index) 
                  ? 'opacity-100 transform-none' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group-hover:shadow-2xl overflow-hidden`}>
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Category tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 font-medium">
                  {feature.category}
                </div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-phantom-purple-light transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Details list */}
                  <ul className="space-y-2 mb-6">
                    {feature.details.map((detail, detailIndex) => (
                      <li 
                        key={detailIndex}
                        className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Action button */}
                  <div className={`transition-all duration-500 ${hoveredFeature === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <GlowButton 
                      variant="ghost" 
                      size="sm" 
                      className="w-full group-hover:border-phantom-purple/50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Saiba mais
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </GlowButton>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>


        {/* CTA Section */}
        <div className="text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-r from-phantom-purple/10 via-phantom-blue/10 to-phantom-purple/10 border border-white/10 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-phantom-purple/5 to-phantom-blue/5 animate-pulse-slow"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Pronto para começar?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Experimente o Clonify hoje e descubra como é fácil clonar e hospedar páginas profissionais em minutos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton variant="gradient" size="lg" ripple={true} animated={true}>
                  <span className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Ver Nossos Planos
                  </span>
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
