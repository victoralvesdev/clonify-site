import React from 'react';

const SectionSeparator: React.FC = () => {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Gradient line with glow effect */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-phantom-purple/50 to-transparent relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-phantom-purple/30 to-transparent"></div>
        </div>
        
        {/* Center accent */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
          <div className="absolute inset-0 rotate-45 border border-phantom-purple/30 rounded-sm"></div>
          <div className="absolute inset-1 rotate-45 border border-phantom-purple/20 rounded-sm"></div>
          <div className="absolute inset-0 rotate-45 blur-md bg-phantom-purple/10 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionSeparator;
