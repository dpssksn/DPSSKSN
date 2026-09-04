import React from 'react';

/**
 * Traditional Ancient Indian Art Elements & Bengali Alpana Motifs
 * Styled in an elegant Royal Blue and Crisp White institutional theme
 */

export const CornerFlourish: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string; color?: string }> = ({
  position,
  className = '',
  color = '#2563eb'
}) => {
  const rotationMap = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90'
  };

  return (
    <div className={`pointer-events-none absolute w-8 h-8 opacity-60 ${rotationMap[position]} ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 32V14C8 10.6863 10.6863 8 14 8H32" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="3" fill={color} />
        <path d="M2 2C8 8 8 8 16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="4" r="1.5" fill={color} />
        <circle cx="4" cy="24" r="1.5" fill={color} />
      </svg>
    </div>
  );
};

export const AlpanaDivider: React.FC<{ className?: string; light?: boolean }> = ({ className = '', light = false }) => (
  <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
    <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${light ? 'via-blue-300 to-blue-400' : 'via-blue-600/40 to-blue-700/80'}`} />
    
    <div className="flex items-center gap-1.5 px-2">
      {/* Traditional Indian Lotus Alpana SVG */}
      <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={light ? 'text-blue-200' : 'text-blue-600'}>
        <path d="M18 2C18 2 13 8 13 14C13 17 15.5 19 18 19C20.5 19 23 17 23 14C23 8 18 2 18 2Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 19C14 19 6 15 4 8C7 10 11 12 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 19C22 19 30 15 32 8C29 10 25 12 22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="11" r="2" fill="currentColor" />
        <path d="M9 22C14 20 22 20 27 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>

    <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${light ? 'via-blue-300 to-blue-400' : 'via-blue-600/40 to-blue-700/80'}`} />
  </div>
);

export const MandalaEmblem: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 48,
  color = '#1d4ed8'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Outer Sacred Ring */}
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx="50" cy="50" r="41" stroke={color} strokeWidth="2" />
    
    {/* 8-Petal Ancient Indian Lotus / Mandala */}
    <g transform="translate(50,50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <path
            d="M0 -38 C7 -26 14 -14 0 0 C-14 -14 -7 -26 0 -38 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="1.2"
          />
          <circle cx="0" cy="-28" r="2.5" fill={color} />
          <line x1="0" y1="-38" x2="0" y2="-41" stroke={color} strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="0" cy="0" r="14" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
      <circle cx="0" cy="0" r="6" fill={color} />
    </g>
  </svg>
);

export const TerracottaArchFrame: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  innerClassName?: string;
}> = ({
  children,
  className = '',
  innerClassName = 'bg-white'
}) => (
  <div className={`relative p-1 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 rounded-3xl shadow-xl ${className}`}>
    <div className={`relative rounded-[22px] overflow-hidden ${innerClassName}`}>
      {/* Ancient Indian Ornamental Arch Top */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-blue-500/10 via-amber-400/30 to-blue-500/10 border-b border-amber-300/40 flex items-center justify-around px-4 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
      </div>
      {children}
    </div>
  </div>
);

