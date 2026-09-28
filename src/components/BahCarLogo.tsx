import React from 'react';

interface BahCarLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBadge?: boolean;
}

export const BahCarLogo: React.FC<BahCarLogoProps> = ({
  size = 'md',
  className = '',
  showBadge = false,
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/bahcar-logo-white.png?v=2"
        alt="BahCar"
        className={`${sizeClasses[size]} w-auto object-contain drop-shadow-[0_2px_10px_rgba(184,255,0,0.18)]`}
      />
      {showBadge && (
        <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/30">
          SM
        </span>
      )}
    </div>
  );
};

export default BahCarLogo;
