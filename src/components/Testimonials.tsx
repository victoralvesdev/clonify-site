import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

// Dados expandidos de testimonials
const testimonials = [
    {
      name: "Carlos Silva",
      role: "Empreendedor Digital",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "O Clonify revolucionou minha estratégia de vendas. Consegui clonar páginas de alta conversão e criar funis que aumentaram minhas vendas em 40%.",
      stars: 5
    },
    {
      name: "Mariana Costa",
      role: "Especialista em Marketing",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Economizo horas de desenvolvimento com o Clonify. A ferramenta me permite clonar páginas rapidamente e criar funis eficientes para meus projetos.",
      stars: 5
    },
    {
      name: "Rafael Mendes",
      role: "Consultor de E-commerce",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      content: "Recomendo o Clonify para todos que querem acelerar sua criação de funis. É uma ferramenta essencial para quem trabalha com vendas online.",
      stars: 5
  },
  {
    name: "Ana Paula",
    role: "CEO Startup Tech",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    content: "Com o Clonify conseguimos validar nossas ideias de produto muito mais rápido. Criar landing pages nunca foi tão simples e eficiente.",
    stars: 5
  },
  {
    name: "Bruno Santos",
    role: "Designer UX/UI",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "A qualidade das páginas clonadas é impressionante. O Clonify mantém todos os detalhes de design e funcionalidade perfeitamente.",
    stars: 5
  },
  {
    name: "Luciana Ferreira",
    role: "Gerente de Produtos",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    content: "Implementamos o Clonify na nossa estratégia de lançamento e os resultados foram excepcionais. Aumento de 65% na conversão!",
    stars: 5
  },
  {
    name: "Diego Oliveira",
    role: "Desenvolvedor Full Stack",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    content: "Como desenvolvedor, fico impressionado com a qualidade do código gerado. O Clonify economiza semanas de trabalho manual.",
    stars: 5
  },
  {
    name: "Camila Rocha",
    role: "Social Media Manager",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    content: "Uso o Clonify para criar páginas de campanhas sociais. A velocidade de criação me permite testar mais variações e otimizar resultados.",
    stars: 5
  },
  {
    name: "Fernando Lima",
    role: "Growth Hacker",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    content: "O Clonify é fundamental para nossos testes A/B. Conseguimos iterar muito mais rápido e encontrar os padrões que convertem melhor.",
    stars: 5
  },
  {
    name: "Juliana Alves",
    role: "Head de Marketing",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    content: "Nossa agência adotou o Clonify e triplicamos nossa capacidade de entrega. Clientes ficam impressionados com a velocidade dos projetos.",
    stars: 5
  },
  {
    name: "Ricardo Barbosa",
    role: "E-commerce Manager",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    content: "Clonei as melhores páginas de produto do mercado e adaptei para nossa marca. As vendas online aumentaram 80% em 3 meses.",
    stars: 5
  },
  {
    name: "Patricia Souza",
    role: "Consultora Digital",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    content: "Recomendo o Clonify para todos meus clientes. É a ferramenta mais eficiente para criar presenças digitais que realmente convertem.",
    stars: 5
  }
];

// Componente de linha com animação marquee horizontal
const TestimonialRow = ({ 
  testimonials: rowTestimonials, 
  duration = 60, 
  direction = 'left',
  className = "" 
}: {
  testimonials: typeof testimonials,
  duration?: number,
  direction?: 'left' | 'right',
  className?: string
}) => {
    return (
    <div className={`overflow-hidden ${className}`}>
      <div 
        className={`flex gap-6 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          width: 'max-content'
        }}
      >
        {/* Duplicamos os testimonials para criar loop infinito */}
        {[...Array(3)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {rowTestimonials.map((testimonial, i) => (
              <div key={`${index}-${i}`} className="testimonial-card glass-card rounded-xl p-4 md:p-6 w-[280px] md:w-[320px] flex-shrink-0">
                {/* Bordas decorativas */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-phantom-purple-light/20 rounded-tl-lg"></span>
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-phantom-purple-light/20 rounded-br-lg"></span>
                
                {/* Quote icon */}
                <Quote className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 text-phantom-purple/30" />
                
                {/* Stars */}
                <div className="mb-3 md:mb-4 flex">
                  {[...Array(testimonial.stars)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-300 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-4">
                  {testimonial.content}
                </p>
                
                {/* Author */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-phantom-purple/30 mr-3 md:mr-4 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white text-xs md:text-sm truncate">{testimonial.name}</h3>
                    <p className="text-gray-400 text-xs truncate">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detecta quando a seção entra na viewport
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

    const element = document.getElementById('testimonials');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Dividir testimonials em linhas para o efeito horizontal
  const firstRow = testimonials.slice(0, 6);
  const secondRow = testimonials.slice(6, 12);
  const thirdRow = [...testimonials.slice(0, 6)]; // Reutilizar primeira parte para terceira linha

  return (
    <section 
      id="testimonials" 
      className="py-12 md:py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] lg:w-[1000px] h-[400px] md:h-[600px] lg:h-[800px] bg-phantom-purple/5 blur-[60px] md:blur-[100px] rounded-full"></div>
      
      {/* Decorative elements - responsivos */}
      <div className="absolute top-20 left-10 w-16 h-16 md:w-20 md:h-20 border border-phantom-purple/20 rounded-full animate-pulse-slow hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 md:w-16 md:h-16 border border-phantom-blue/20 rounded-lg rotate-45 animate-float-slow hidden lg:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 bg-phantom-purple/10 border border-phantom-purple/20 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-phantom-purple" />
            <span className="text-phantom-purple text-xs md:text-sm font-medium">Depoimentos</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white leading-tight">
            O Que Nossos <span className="text-phantom-purple">Clientes</span> Dizem
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
            Veja como o Clonify tem transformado negócios e acelerado o crescimento de empresas em todo o Brasil
          </p>
        </div>
        
        {/* Testimonials Rows - Horizontal Marquee */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            className="testimonials-container space-y-4 md:space-y-6 relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}
          >
            {/* Primeira linha - movendo para esquerda */}
            <TestimonialRow 
              testimonials={firstRow} 
              duration={80}
              direction="left"
              className="hover:pause-animation"
            />
            
            {/* Segunda linha - movendo para direita (efeito contrário) - apenas md+ */}
            <div className="hidden md:block">
              <TestimonialRow 
                testimonials={secondRow} 
                duration={90}
                direction="right"
                className="hover:pause-animation"
              />
            </div>
            
            {/* Terceira linha - movendo para esquerda - apenas lg+ */}
            <div className="hidden lg:block">
              <TestimonialRow 
                testimonials={thirdRow} 
                duration={85}
                direction="left"
                className="hover:pause-animation"
              />
            </div>
          </div>
        </div>

        {/* Call to action opcional */}
        <div className={`text-center mt-8 md:mt-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-gray-400 text-xs md:text-sm">
            Junte-se a mais de <span className="text-phantom-purple font-semibold">10.000+</span> clientes satisfeitos
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
