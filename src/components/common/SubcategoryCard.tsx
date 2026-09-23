import React from 'react';
import { Subcategory } from '../../types.js';
import { DynamicIcon } from './DynamicIcon.js';

interface SubcategoryCardProps {
  subcategory: Subcategory;
  categorySlug?: string;
  onClick: () => void;
}

export const SubcategoryCard: React.FC<SubcategoryCardProps> = ({ subcategory, onClick }) => {
  return (
    <div
      id={`subcat-card-${subcategory.slug}`}
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-2 sm:p-3 bg-[#F0F2F5] hover:bg-white rounded-xl border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all duration-150 cursor-pointer active:scale-95 text-center min-h-[86px] sm:min-h-[96px] w-full"
    >
      {/* Illustrated Icon Container */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center mb-1 transition-transform duration-150 group-hover:scale-105">
        <DynamicIcon 
          name={subcategory.icon} 
          slug={subcategory.slug} 
          title={subcategory.name} 
          className="w-9 h-9 sm:w-10 sm:h-10 object-contain" 
        />
      </div>

      {/* Bengali Title */}
      <span className="text-[11px] sm:text-xs font-bold text-[#050505] group-hover:text-[#1877F2] leading-tight transition-colors line-clamp-1">
        {subcategory.name}
      </span>

      {/* Optional English Subtitle */}
      {subcategory.name_en && (
        <span className="text-[10px] text-[#65676B] leading-none mt-0.5 hidden sm:block truncate max-w-full">
          {subcategory.name_en}
        </span>
      )}
    </div>
  );
};
