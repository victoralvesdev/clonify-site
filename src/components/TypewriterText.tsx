import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  delayAfterComplete?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  speed = 100,
  delayAfterComplete = 2000,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayAfterComplete);
      
      return () => clearTimeout(timeout);
    }
    
    const currentText = texts[currentIndex];
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, speed / 2);
        
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText === currentText) {
        setIsWaiting(true);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speed);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, currentIndex, isDeleting, isWaiting, texts, speed, delayAfterComplete]);
  
  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-phantom-purple animate-blink ml-1 align-middle"></span>
    </span>
  );
};

export default TypewriterText; 