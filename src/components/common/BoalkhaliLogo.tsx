import React from 'react';

interface BoalkhaliLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BoalkhaliLogo: React.FC<BoalkhaliLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Official Boalkhali Shop Logo Emblem */}
      <div className={`relative shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs flex items-center justify-center ${
        isSm ? 'w-8 h-8' : isLg ? 'w-12 h-12' : 'w-9 h-9 sm:w-10 sm:h-10'
      }`}>
        <img 
          src="/logo.png" 
          alt="Boalkhali Shop" 
          className="w-full h-full object-contain p-0.5"
          onError={(e) => {
            // Fallback SVG if image not yet loaded
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />
        {/* SVG Fallback */}
        <div style={{ display: 'none' }} className="w-full h-full items-center justify-center bg-[#0F4A2E] text-white font-black text-sm">
          B
        </div>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1 font-black tracking-tight">
          <span className={`text-[#0F4A2E] font-bold ${
            isSm ? 'text-base' : isLg ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}>
            Boalkhali
          </span>
          <span className={`text-[#EA580C] font-black ${
            isSm ? 'text-base' : isLg ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}>
            Shop
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#65676B] font-medium pt-0.5">
            <span>Trendy Products</span>
            <span>•</span>
            <span className="text-emerald-700">Trusted</span>
          </div>
        )}
      </div>
    </div>
  );
};
