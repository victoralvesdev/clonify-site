import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  isVisible?: boolean;
  alignment?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  isVisible = true,
  alignment = 'center'
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  return (
    <div className={`max-w-3xl ${alignmentClasses[alignment]} mb-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
    }`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        <span className="relative inline-block">
          <span className="relative z-10 text-phantom-purple-light glow-text">{title}</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-phantom-purple-dark/20 -z-10 transform -skew-x-12"></span>
        </span>
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle; 