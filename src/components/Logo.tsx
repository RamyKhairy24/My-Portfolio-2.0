import React from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text 
      x="50%" 
      y="65%" 
      textAnchor="middle" 
      fontFamily="Cormorant Garamond, serif" 
      fontSize="70" 
      fontWeight="300" 
      fontStyle="italic"
      fill="currentColor"
      letterSpacing="-0.05em"
    >
      RK
    </text>
    <line x1="10" y1="75" x2="45" y2="75" stroke="currentColor" strokeWidth="0.5" />
    <line x1="55" y1="75" x2="90" y2="75" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);
