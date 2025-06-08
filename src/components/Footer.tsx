import React from 'react';
import { Facebook, Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';
import GlowButton from './ui/GlowButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-20 pb-10 relative overflow-hidden bg-transparent">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="mb-6">
              <a href="#" className="text-2xl font-bold text-white flex items-center">
                <div className="relative mr-2">
                  <img 
                    src="./logo-clonify.png" 
                    alt="Clonify Logo" 
                    className="w-16 h-16"
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
                    className="w-16 h-16 bg-gradient-to-br from-phantom-purple to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ display: 'none' }}
                  >
                    C
                  </div>
                </div>
                <span className="text-white">Clonify</span>
              </a>
            </div>
            <p className="text-gray-400 mb-6">
            Clone páginas de alta conversão e crie funis poderosos com mapas mentais que transformam estratégias em resultados reais.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Início
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Preços
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Recursos</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Clonagem de Páginas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Criação de Funis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Mapas Mentais
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Domínios Personalizados
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} Clonify. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-sm">
              Termos de Serviço
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-sm">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
