import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, useState, useRef } from 'react';

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'shimmer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
  ripple?: boolean;
  animated?: boolean;
}

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

type GlowButtonProps = ButtonProps | AnchorProps;

const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'ghost',
  size = 'md',
  className = '',
  children,
  glow = true,
  ripple = false,
  animated = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  const baseClasses = "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 overflow-hidden group select-none";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-phantom-purple to-phantom-purple-dark text-white shadow-lg shadow-phantom-purple/25 hover:shadow-xl hover:shadow-phantom-purple/35 hover:scale-105",
    secondary: "bg-gradient-to-r from-phantom-black-light to-phantom-black text-white border border-phantom-purple/30 hover:border-phantom-purple/60 hover:shadow-lg shadow-black/20",
    outline: "bg-transparent hover:bg-phantom-purple/10 text-phantom-purple border-2 border-phantom-purple hover:border-phantom-purple-light hover:text-phantom-purple-light",
    ghost: "bg-white/5 backdrop-blur-xl text-white border border-white/20 hover:border-phantom-purple/70 hover:bg-white/10",
    gradient: "bg-gradient-to-r from-phantom-purple via-phantom-purple-light to-phantom-blue text-white shadow-xl shadow-phantom-purple/30 hover:shadow-2xl hover:shadow-phantom-purple/40 hover:scale-105",
    shimmer: "bg-gradient-to-r from-phantom-purple/90 via-white/20 to-phantom-blue/90 text-white shadow-xl hover:shadow-2xl hover:scale-105"
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  // Determine if it's a button or anchor based on the presence of href
  const isAnchor = 'href' in props;
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  
  const handleMouseDown = () => {
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = { 
        id: Date.now(), 
        x, 
        y, 
        size 
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    // Call original onClick if it exists
    if ('onClick' in props && props.onClick) {
      props.onClick(e as any);
    }
  };
  
  const content = (
    <>
      {/* Main content */}
      <span className={`relative z-20 transition-all duration-300 ${isPressed ? 'scale-95' : 'scale-100'} ${animated ? 'group-hover:scale-105' : ''}`}>
        {children}
      </span>
      
      {/* Enhanced background effects */}
      {variant === 'gradient' && (
        <span 
          className="absolute inset-0 bg-gradient-to-r from-phantom-purple via-phantom-purple-light to-phantom-blue opacity-100 transition-all duration-500 group-hover:opacity-90"
          style={{
            background: isHovered 
              ? 'linear-gradient(45deg, #7B2CBF, #9D4EDD, #3A506B, #7B2CBF)'
              : 'linear-gradient(90deg, #7B2CBF, #9D4EDD, #3A506B)',
            backgroundSize: isHovered ? '400% 400%' : '200% 200%',
            animation: isHovered ? 'animate-gradient 2s ease infinite' : 'none'
          }}
        />
      )}
      
      {/* Shimmer effect for shimmer variant */}
      {variant === 'shimmer' && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-phantom-purple/90 via-white/20 to-phantom-blue/90" />
          <span 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? 'translateX(200%)' : 'translateX(-200%)',
              width: '50%',
            }}
          />
        </>
      )}
      
      {/* Ripple effects */}
      {ripple && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '0.6s',
            animationFillMode: 'forwards'
          }}
        />
      ))}
      
      {/* Enhanced glow effect */}
      {glow && (
      <span 
          className="absolute inset-0 rounded-xl transition-all duration-300 z-0"
        style={{ 
            background: isHovered 
              ? 'radial-gradient(circle at center, rgba(157, 78, 221, 0.3) 0%, rgba(157, 78, 221, 0.1) 50%, transparent 100%)'
              : 'radial-gradient(circle at center, rgba(157, 78, 221, 0.1) 0%, transparent 70%)',
            filter: isHovered ? 'blur(8px)' : 'blur(4px)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            opacity: isHovered ? 1 : 0.6
        }}
      />
      )}
      
      {/* Particle effects on hover */}
      {animated && isHovered && (
        <>
          <span className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
          <span className="absolute top-1/2 right-2 w-1 h-1 bg-phantom-purple-light/80 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          <span className="absolute bottom-2 left-1/3 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
          <span className="absolute top-3 right-1/3 w-0.5 h-0.5 bg-phantom-blue-light/70 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
        </>
      )}
      
      {/* Enhanced border glow */}
      <span 
        className="absolute inset-0 rounded-xl border transition-all duration-300 z-10"
        style={{ 
          borderColor: isHovered 
            ? variant === 'gradient' || variant === 'shimmer' 
              ? 'rgba(157, 78, 221, 0.8)' 
              : 'rgba(157, 78, 221, 0.6)'
            : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered && glow
            ? `0 0 20px 2px rgba(157, 78, 221, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)`
            : glow 
              ? '0 0 8px 0 rgba(157, 78, 221, 0.2)'
              : 'none'
        }}
      />
      
      {/* Corner accents - enhanced */}
      <span 
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-xl transition-all duration-300"
        style={{ 
          borderColor: isHovered ? 'rgba(157, 78, 221, 1)' : 'rgba(255, 255, 255, 0.3)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          filter: isHovered ? 'drop-shadow(0 0 4px rgba(157, 78, 221, 0.8))' : 'none'
        }}
      />
      <span 
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-xl transition-all duration-300"
        style={{ 
          borderColor: isHovered ? 'rgba(157, 78, 221, 1)' : 'rgba(255, 255, 255, 0.3)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          filter: isHovered ? 'drop-shadow(0 0 4px rgba(157, 78, 221, 0.8))' : 'none'
        }}
      />
      
      {/* Top accent line */}
      <span 
        className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </>
  );
  
  const commonProps = {
    ref: buttonRef as any,
    className: classes,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick: handleClick
  };
  
  if (isAnchor) {
    return (
      <a {...props as AnchorProps} {...commonProps}>
        {content}
      </a>
    );
  }
  
  return (
    <button {...props as ButtonProps} {...commonProps}>
      {content}
    </button>
  );
};

export default GlowButton; 