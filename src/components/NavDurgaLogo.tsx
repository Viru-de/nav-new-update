import React from 'react';

export interface NavDurgaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  imgClassName?: string;
  withCard?: boolean;
  heightClass?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const NavDurgaLogo: React.FC<NavDurgaLogoProps> = ({
  size = 'md',
  className = '',
  imgClassName = '',
  withCard = false,
  heightClass,
  onClick,
  priority = false,
}) => {
  const sizeMap = {
    xs: 'h-7 max-w-[110px]',
    sm: 'h-9 max-w-[140px]',
    md: 'h-11 max-w-[170px]',
    lg: 'h-14 max-w-[210px]',
    xl: 'h-20 max-w-[300px]',
    '2xl': 'h-28 max-w-[400px]',
  };

  const selectedHeight = heightClass || sizeMap[size];

  const logoImg = (
    <img
      src="/assets/nav_durga_logo.svg"
      alt="Nav Durga Group - Official Logo"
      className={`object-contain transition-transform select-none ${selectedHeight} ${imgClassName}`}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
    />
  );

  if (withCard) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center p-1.5 bg-white/95 rounded-xl border border-slate-200/90 shadow-xs backdrop-blur-xs ${onClick ? 'cursor-pointer hover:border-orange-300' : ''} ${className}`}
      >
        {logoImg}
      </div>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} className={`inline-flex items-center cursor-pointer ${className}`}>
        {logoImg}
      </div>
    );
  }

  return <div className={`inline-flex items-center ${className}`}>{logoImg}</div>;
};

export const OFFICIAL_NAV_DURGA_LOGO_PATH = '/assets/nav_durga_logo.svg';
export const OFFICIAL_NAV_DURGA_LOGO_SVG = '/assets/nav_durga_logo.svg';
