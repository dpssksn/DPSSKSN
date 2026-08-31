import React, { useState, useEffect } from 'react';
import { fetchSchoolPhotos } from '../services/api';
import { schoolEmblemImg } from '../assets/images';

let cachedLogoUrl: string | null | undefined = schoolEmblemImg;
const logoListeners = new Set<(url: string | null) => void>();

export function notifyLogoUpdated(url: string | null) {
  cachedLogoUrl = url || schoolEmblemImg;
  logoListeners.forEach((fn) => {
    try {
      fn(cachedLogoUrl);
    } catch (e) {
      // ignore
    }
  });
}

interface SchoolLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'emblem-only' | 'monochrome-white';
  showBadge?: boolean;
  customLogoUrl?: string | null;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 48,
  variant = 'full',
  showBadge = false,
  customLogoUrl,
}) => {
  const [fetchedLogo, setFetchedLogo] = useState<string | null>(cachedLogoUrl || schoolEmblemImg);
  const [imageError, setImageError] = useState(false);
  const dimension = typeof size === 'number' ? `${size}px` : size;

  useEffect(() => {
    if (customLogoUrl !== undefined) {
      setImageError(false);
      return;
    }

    if (cachedLogoUrl !== undefined) {
      setFetchedLogo(cachedLogoUrl);
    } else {
      fetchSchoolPhotos()
        .then((data) => {
          cachedLogoUrl = data.logoPhoto?.url || schoolEmblemImg;
          setFetchedLogo(cachedLogoUrl);
        })
        .catch(() => {
          cachedLogoUrl = schoolEmblemImg;
          setFetchedLogo(schoolEmblemImg);
        });
    }

    const listener = (url: string | null) => {
      setImageError(false);
      setFetchedLogo(url || schoolEmblemImg);
    };
    logoListeners.add(listener);
    return () => {
      logoListeners.delete(listener);
    };
  }, [customLogoUrl]);

  const activeLogoUrl = customLogoUrl !== undefined ? customLogoUrl : (fetchedLogo || schoolEmblemImg);
  const hasCustomImage = !!activeLogoUrl && !imageError;

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dimension, height: dimension }}
      title="DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN Emblem"
    >
      {hasCustomImage ? (
        <img
          src={activeLogoUrl}
          alt="School Emblem Logo"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain rounded-full drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full drop-shadow-sm transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Upper Text Path for Bengali Institution Title */}
            <path id="svg-upper-text-path" d="M 45,250 A 205,205 0 1,1 455,250" fill="none" />
            {/* Lower Text Path for Sanskrit / Bengali Motto */}
            <path id="svg-lower-text-path" d="M 100,385 A 210,210 0 0,0 400,385" fill="none" />
          </defs>

          {/* Outer White Disc */}
          <circle cx="250" cy="250" r="242" fill="#ffffff" stroke="#0f172a" strokeWidth="12" />
          <circle cx="250" cy="250" r="232" fill="none" stroke="#0f172a" strokeWidth="3" />

          {/* Upper Bengali School Name */}
          <text 
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" 
            fontSize="27" 
            fontWeight="900" 
            fill="#0f172a" 
            letterSpacing="1.5"
          >
            <textPath href="#svg-upper-text-path" startOffset="50%" textAnchor="middle">
              দেশবন্ধু পল্লী সেবা সংঘ সন্তোষ কুমারী শিক্ষা নিকেতন
            </textPath>
          </text>

          {/* Central Red Gear / Cogwheel (Progress & Technical Knowledge) */}
          <g stroke="#d8231a" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" fill="none">
            <path d="
              M 230,120 L 270,120 L 270,152
              A 115,115 0 0,1 328,175
              L 358,154 L 388,184 L 366,213
              A 115,115 0 0,1 380,275
              L 412,284 L 398,326 L 366,326
              A 115,115 0 0,1 328,375
              L 338,406 L 298,422 L 280,394
              A 115,115 0 0,1 220,394
              L 202,422 L 162,406 L 172,375
              A 115,115 0 0,1 134,326
              L 102,326 L 88,284 L 120,275
              A 115,115 0 0,1 134,213
              L 112,184 L 142,154 L 172,175
              A 115,115 0 0,1 230,152
              Z
            " />
            <circle cx="250" cy="275" r="95" stroke="#d8231a" strokeWidth="5" fill="#ffffff" />
          </g>

          {/* Open Book of Knowledge (Red Contours at bottom) */}
          <g stroke="#d8231a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff">
            <path d="M 250,375 C 200,345 150,355 115,372 C 145,392 195,385 250,412 Z" />
            <path d="M 250,390 C 205,365 160,372 120,388" fill="none" strokeWidth="4" />
            <path d="M 250,375 C 300,345 350,355 385,372 C 355,392 305,385 250,412 Z" />
            <path d="M 250,390 C 295,365 340,372 380,388" fill="none" strokeWidth="4" />
          </g>

          {/* Pradeep / Diya / Standing Brass Lamp of Enlightenment */}
          <g stroke="#d8231a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 240,375 L 240,240 Q 240,230 250,230 Q 260,230 260,240 L 260,375" fill="#ffffff" />
            
            <ellipse cx="250" cy="250" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="265" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="280" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="295" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="310" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="325" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="340" rx="12" ry="4" strokeWidth="4" />
            <ellipse cx="250" cy="355" rx="12" ry="4" strokeWidth="4" />

            {/* Lamp Oil Basin */}
            <path d="M 228,225 C 228,205 272,205 272,225 C 272,238 228,238 228,225 Z" fill="#ffffff" strokeWidth="6" />
            <path d="M 235,215 C 245,208 278,200 295,190" strokeWidth="5" />

            {/* Radiant Flame / Jyoti */}
            <path d="M 295,190 C 315,160 305,140 295,130 C 285,145 275,165 295,190 Z" fill="#ffffff" stroke="#d8231a" strokeWidth="6" />
            <path d="M 295,178 C 302,165 298,152 295,145 C 291,155 288,168 295,178 Z" fill="#d8231a" stroke="none" />
          </g>

          {/* Two Red Side Accent Dots */}
          <circle cx="102" cy="378" r="8" fill="#d8231a" />
          <circle cx="398" cy="378" r="8" fill="#d8231a" />

          {/* Lower Motto Text */}
          <text 
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" 
            fontSize="24" 
            fontWeight="900" 
            fill="#0f172a" 
            letterSpacing="1"
          >
            <textPath href="#svg-lower-text-path" startOffset="50%" textAnchor="middle">
              শ্রদ্ধাবান্ লভতে জ্ঞানম্
            </textPath>
          </text>
        </svg>
      )}

      {showBadge && (
        <span className="absolute -bottom-2 bg-blue-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-blue-200 shadow whitespace-nowrap">
          ESTD. 1968
        </span>
      )}
    </div>
  );
};

export default SchoolLogo;
