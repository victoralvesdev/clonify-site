import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Share2, 
  Sparkles, 
  Eye, 
  Download, 
  Link, 
  TrendingUp, 
  Grid, 
  Type, 
  Image as ImageIcon, 
  Layout,
  Move,
  Settings,
  Plus,
  Trash2,
  Layers
} from 'lucide-react';
import GlowButton from './ui/GlowButton';

const CodeShowcase = () => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dropZoneActive, setDropZoneActive] = useState<string | null>(null);
  const [pageElements, setPageElements] = useState([
    { id: 'hero', type: 'hero', title: 'Hero Section', position: 0 },
    { id: 'features', type: 'features', title: 'Features Grid', position: 1 },
    { id: 'testimonials', type: 'testimonials', title: 'Testimonials', position: 2 }
  ]);
  const [animationStep, setAnimationStep] = useState(0);

  // Elementos disponíveis para arrastar
  const availableElements = [
    { type: 'hero', icon: Layout, title: 'Hero Section', color: 'bg-purple-500' },
    { type: 'text', icon: Type, title: 'Text Block', color: 'bg-blue-500' },
    { type: 'image', icon: ImageIcon, title: 'Image Block', color: 'bg-green-500' },
    { type: 'grid', icon: Grid, title: 'Content Grid', color: 'bg-orange-500' },
    { type: 'features', icon: Layers, title: 'Features', color: 'bg-red-500' },
    { type: 'testimonials', icon: Type, title: 'Testimonials', color: 'bg-teal-500' }
  ];

  // Animação automática da demonstração
  useEffect(() => {
    const demoSteps = [
      { step: 0, delay: 2000 }, // Estado inicial
      { step: 1, delay: 3000 }, // Destacar elemento para arrastar
      { step: 2, delay: 2000 }, // Simular drag
      { step: 3, delay: 2000 }, // Simular drop
      { step: 4, delay: 3000 }, // Mostrar resultado
      { step: 0, delay: 2000 }  // Reiniciar
    ];

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const runDemo = () => {
      const currentStep = demoSteps[currentIndex];
      setAnimationStep(currentStep.step);

      // Simular ações baseadas no step
      if (currentStep.step === 1) {
        // Destacar elemento text
        const textElement = document.querySelector('[data-element="text"]');
        textElement?.classList.add('animate-pulse');
      } else if (currentStep.step === 2) {
        // Simular drag
        setDraggedElement('text');
        setDropZoneActive('2');
      } else if (currentStep.step === 3) {
        // Simular drop - adicionar novo elemento
        setPageElements(prev => [
          ...prev.slice(0, 2),
          { id: 'new-text', type: 'text', title: 'New Text Block', position: 2 },
          ...prev.slice(2).map(el => ({ ...el, position: el.position + 1 }))
        ]);
        setDraggedElement(null);
        setDropZoneActive(null);
      } else if (currentStep.step === 4) {
        // Destacar resultado
      } else if (currentStep.step === 0) {
        // Reset
        setPageElements([
          { id: 'hero', type: 'hero', title: 'Hero Section', position: 0 },
          { id: 'features', type: 'features', title: 'Features Grid', position: 1 },
          { id: 'testimonials', type: 'testimonials', title: 'Testimonials', position: 2 }
        ]);
        document.querySelectorAll('.animate-pulse').forEach(el => {
          el.classList.remove('animate-pulse');
        });
      }

      currentIndex = (currentIndex + 1) % demoSteps.length;
      timeoutId = setTimeout(runDemo, currentStep.delay);
    };

    timeoutId = setTimeout(runDemo, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleDragStart = (elementType: string) => {
    setDraggedElement(elementType);
  };

  const handleDragOver = (position: string) => {
    if (draggedElement) {
      setDropZoneActive(position);
    }
  };

  const handleDrop = (position: number) => {
    if (draggedElement) {
      const newElement = {
        id: `${draggedElement}-${Date.now()}`,
        type: draggedElement,
        title: availableElements.find(el => el.type === draggedElement)?.title || 'New Element',
        position
      };

      setPageElements(prev => [
        ...prev.slice(0, position),
        newElement,
        ...prev.slice(position).map(el => ({ ...el, position: el.position + 1 }))
      ]);

      setDraggedElement(null);
      setDropZoneActive(null);
    }
  };

  const getElementIcon = (type: string) => {
    const element = availableElements.find(el => el.type === type);
    return element ? element.icon : Layout;
  };

  const getElementColor = (type: string) => {
    const element = availableElements.find(el => el.type === type);
    return element ? element.color : 'bg-gray-500';
  };

  return (
    <section id="showcase" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900"></div>
      
      {/* Animated background patterns - reduzidos em mobile */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 border border-phantom-purple/20 rounded-full animate-pulse-slow hidden md:block"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 md:w-24 md:h-24 border border-phantom-blue/20 rounded-lg rotate-45 animate-float-slow hidden lg:block"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-phantom-purple/10 to-phantom-blue/10 rounded-full blur-xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 mb-4 md:mb-6 rounded-full bg-gradient-to-r from-phantom-purple/20 to-phantom-blue/20 border border-phantom-purple/30">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-phantom-purple animate-pulse" />
            <span className="text-white/90 text-xs md:text-sm font-medium">Editor Visual</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-white via-phantom-purple-light to-phantom-blue bg-clip-text text-transparent">
              Edite com Drag & Drop
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Construa páginas visuais como no Elementor. 
            <span className="text-phantom-purple-light font-semibold"> Arraste, solte e personalize</span> elementos em tempo real.
          </p>
        </div>

        {/* Main showcase container */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Visual Editor */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              {/* Editor header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gray-800/50 border-b border-gray-700/50">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex gap-1 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-300 text-xs md:text-sm font-medium">Editor Clonify</span>
                </div>
                
                <div className="flex items-center gap-1 md:gap-2">
                  <button className="p-1.5 md:p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Settings className="w-3 h-3 md:w-4 md:h-4 text-gray-400 hover:text-white" />
                  </button>
                  <button className="p-1.5 md:p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Share2 className="w-3 h-3 md:w-4 md:h-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Editor content */}
              <div className="flex flex-col md:flex-row h-64 md:h-96">
                {/* Sidebar com elementos */}
                <div className="w-full md:w-1/3 bg-gray-800/30 border-b md:border-b-0 md:border-r border-gray-700/50 p-3 md:p-4 elements-sidebar overflow-auto">
                  <h3 className="text-white text-xs md:text-sm font-medium mb-3 md:mb-4">Elementos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {availableElements.map((element) => {
                      const IconComponent = element.icon;
                      return (
                        <div
                          key={element.type}
                          data-element={element.type}
                          className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg draggable-element transition-all duration-200 cursor-pointer ${
                            animationStep === 1 && element.type === 'text' ? 'ring-2 ring-phantom-purple animate-glow-pulse' : ''
                          } ${
                            draggedElement === element.type ? 'dragging opacity-50' : 'hover:bg-gray-700/50'
                          }`}
                          draggable
                          onDragStart={() => handleDragStart(element.type)}
                        >
                          <div className={`w-6 h-6 md:w-8 md:h-8 ${element.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                          <span className="text-gray-300 text-xs md:text-sm truncate">{element.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Canvas de edição */}
                <div className="flex-1 p-3 md:p-4 bg-gray-900/30 overflow-hidden">
                  <div className="h-full bg-white/5 rounded-lg border-2 border-dashed border-gray-600/30 p-3 md:p-4 overflow-auto editor-canvas">
                    <div className="space-y-2">
                      {pageElements.map((element, index) => {
                        const IconComponent = getElementIcon(element.type);
                        const colorClass = getElementColor(element.type);
                        
                        return (
                          <React.Fragment key={element.id}>
                            {/* Drop zone */}
                            <div
                              className={`h-1 md:h-2 rounded drop-zone transition-all duration-200 ${
                                dropZoneActive === index.toString() 
                                  ? 'drop-zone-active h-4 md:h-8' 
                                  : 'hover:bg-gray-600/20'
                              }`}
                              onDragOver={(e) => {
                                e.preventDefault();
                                handleDragOver(index.toString());
                              }}
                              onDrop={() => handleDrop(index)}
                            />
                            
                            {/* Element */}
                            <div 
                              className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-phantom-purple/50 transition-all duration-200 group ${
                                animationStep === 4 && element.id === 'new-text' ? 'preview-element-new animate-bounce-in' : 'preview-element'
                              }`}
                            >
                              <div className="flex items-center gap-1 md:gap-2">
                                <Move className="w-3 h-3 md:w-4 md:h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-move hidden md:block" />
                                <div className={`w-4 h-4 md:w-6 md:h-6 ${colorClass} rounded flex items-center justify-center flex-shrink-0`}>
                                  <IconComponent className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                                </div>
                              </div>
                              <span className="text-gray-300 text-xs md:text-sm flex-1 truncate">{element.title}</span>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                <button className="p-1 hover:bg-gray-600/50 rounded drag-drop-button">
                                  <Settings className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400" />
                                </button>
                                <button className="p-1 hover:bg-red-500/50 rounded drag-drop-button">
                                  <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400" />
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                      
                      {/* Drop zone final */}
                      <div
                        className={`h-6 md:h-8 border-2 border-dashed border-gray-600/30 rounded flex items-center justify-center drop-zone transition-all duration-200 ${
                          dropZoneActive === pageElements.length.toString() 
                            ? 'drop-zone-active' 
                            : 'hover:border-gray-500/50'
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          handleDragOver(pageElements.length.toString());
                        }}
                        onDrop={() => handleDrop(pageElements.length)}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              {/* Preview header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
                <div className="flex items-center gap-2 md:gap-3">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-phantom-purple" />
                  <span className="text-white font-medium text-sm md:text-base">Preview Ao Vivo</span>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                
                <div className="flex items-center gap-1 md:gap-2">
                  <GlowButton variant="ghost" size="sm" className="p-1.5 md:p-2">
                    <Link className="w-3 h-3 md:w-4 md:h-4" />
                  </GlowButton>
                  <GlowButton variant="primary" size="sm" className="p-1.5 md:p-2">
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                  </GlowButton>
                </div>
              </div>

              {/* Preview content */}
              <div className="p-4 md:p-6">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg md:rounded-xl border border-white/10 relative overflow-hidden">
                  {/* Simulated page preview */}
                  <div className="absolute inset-0 p-3 md:p-4 space-y-2 md:space-y-4 overflow-auto">
                    {pageElements.map((element, index) => (
                      <div 
                        key={element.id}
                        className={`rounded-lg p-2 md:p-4 transition-all duration-300 ${
                          animationStep === 4 && element.id === 'new-text' 
                            ? 'bg-green-500/20 border border-green-500/50 animate-pulse' 
                            : 'bg-white/10 border border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <div className={`w-2 h-2 md:w-3 md:h-3 rounded ${getElementColor(element.type)}`}></div>
                          <div className="h-1.5 md:h-2 bg-white/30 rounded flex-1"></div>
                        </div>
                        {element.type === 'hero' && (
                          <div className="space-y-1 md:space-y-2">
                            <div className="h-2 md:h-3 bg-white/40 rounded w-3/4"></div>
                            <div className="h-1.5 md:h-2 bg-white/20 rounded w-1/2"></div>
                          </div>
                        )}
                        {element.type === 'text' && (
                          <div className="space-y-1">
                            <div className="h-1.5 md:h-2 bg-white/30 rounded"></div>
                            <div className="h-1.5 md:h-2 bg-white/20 rounded w-2/3"></div>
                          </div>
                        )}
                        {element.type === 'features' && (
                          <div className="grid grid-cols-2 gap-1 md:gap-2">
                            {[1, 2].map(i => (
                              <div key={i} className="h-4 md:h-6 bg-white/20 rounded"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animation indicator */}
                <div className="mt-3 md:mt-4 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-phantom-purple animate-pulse"></div>
                  <span className="text-gray-400 text-xs md:text-sm">
                    {animationStep === 0 && "Estado inicial"}
                    {animationStep === 1 && "Selecionando elemento"}
                    {animationStep === 2 && "Arrastando..."}
                    {animationStep === 3 && "Soltando elemento"}
                    {animationStep === 4 && "Elemento adicionado!"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-12">
          <GlowButton 
            variant="gradient" 
            size="lg" 
            ripple={true} 
            animated={true}
            className="w-full sm:w-auto"
          >
            <span className="flex items-center gap-2 justify-center">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              Experimentar Editor
            </span>
          </GlowButton>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase; 