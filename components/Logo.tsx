import React from 'react';

export const Logo = ({ className = 'w-12 h-12' }: { className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/images/logo.png"
    alt="Ramy Khairy"
    className={`object-contain transition-[filter] duration-300 ${className}`}
    style={{ filter: 'var(--logo-filter)' }}
  />
);

