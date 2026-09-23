import React from 'react';
import { Phone, CheckCircle2, MapPin, Star, Bookmark } from 'lucide-react';
import { Listing } from '../../types.js';

interface ListingCardProps {
  listing: Listing & { 
    category_name?: string; 
    category_slug?: string; 
    subcategory_name?: string; 
    subcategory_slug?: string;
    is_bookmarked?: boolean;
  };
  variant?: 'list' | 'card';
  onClick: () => void;
  onBookmarkToggle?: (e: React.MouseEvent) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  variant = 'card',
  onClick, 
  onBookmarkToggle 
}) => {
  const isPerson = listing.display_type === 'person';

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${listing.phone}`;
  };

  // High-Density List Row
  if (variant === 'list') {
    return (
      <div
        id={`listing-row-${listing.id}`}
        onClick={onClick}
        className="group bg-white hover:bg-[#F0F2F5]/80 p-3 sm:p-3.5 rounded-xl border border-[#E4E6EB] hover:border-[#1877F2]/60 hover:shadow-xs transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 w-full"
      >
        {/* Left: Avatar or Icon */}
        <div className="relative shrink-0">
          <img
            src={listing.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&auto=format&fit=crop&q=80'}
            alt={listing.title}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover border border-[#E4E6EB] shadow-2xs bg-gray-100"
            referrerPolicy="no-referrer"
          />
          {listing.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2] fill-blue-50" />
            </div>
          )}
        </div>

        {/* Center: Title and Description / Area */}
        <div className="flex-1 min-w-0 pr-1">
          <h3 className="text-xs sm:text-sm font-bold text-[#050505] group-hover:text-[#1877F2] transition-colors leading-tight line-clamp-1">
            {listing.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#65676B] line-clamp-1 mt-0.5 leading-snug">
            {listing.short_description || listing.designation || (listing.area ? `${listing.area}, ${listing.union || 'বোয়ালখালী'}` : listing.address || 'বোয়ালখালী, চট্টগ্রাম')}
          </p>
          {listing.phone && (
            <span className="text-[10px] text-[#65676B] font-mono sm:hidden block mt-0.5">
              {listing.phone}
            </span>
          )}
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onBookmarkToggle && (
            <button
              id={`bookmark-btn-${listing.id}`}
              onClick={onBookmarkToggle}
              className="p-2 text-[#65676B] hover:text-[#1877F2] rounded-full hover:bg-gray-100 transition-colors hidden sm:block cursor-pointer"
              aria-label="Bookmark listing"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  listing.is_bookmarked ? 'fill-[#1877F2] text-[#1877F2]' : ''
                }`}
              />
            </button>
          )}

          <button
            id={`call-btn-${listing.id}`}
            onClick={handleCallClick}
            aria-label={`Call ${listing.title}`}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1877F2] hover:bg-[#166FE5] active:scale-90 text-white flex items-center justify-center shadow-2xs transition-all duration-150 cursor-pointer"
            title={`কল করুন: ${listing.phone}`}
          >
            <Phone className="w-4.5 h-4.5 text-white" />
          </button>
        </div>
      </div>
    );
  }

  // Grid Card View
  return (
    <div
      id={`listing-card-${listing.id}`}
      onClick={onClick}
      className="group bg-white rounded-xl border border-[#E4E6EB] p-3.5 hover:border-[#1877F2]/60 hover:shadow-xs transition-all duration-150 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top: Image, Titles & Badges */}
        <div className="flex items-start gap-3">
          {/* Image / Avatar */}
          <div className="relative shrink-0">
            <img
              src={listing.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&auto=format&fit=crop&q=80'}
              alt={listing.title}
              className={`w-14 h-14 sm:w-16 sm:h-16 object-cover border border-[#E4E6EB] shadow-2xs ${
                isPerson ? 'rounded-full' : 'rounded-lg'
              }`}
              referrerPolicy="no-referrer"
            />
            {listing.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-2xs" title="যাচাইকৃত">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2] fill-blue-50" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-[#050505] group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2">
                {listing.title}
              </h3>
              {onBookmarkToggle && (
                <button
                  id={`bookmark-btn-${listing.id}`}
                  onClick={onBookmarkToggle}
                  className="p-1 text-[#65676B] hover:text-[#1877F2] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Bookmark listing"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      listing.is_bookmarked ? 'fill-[#1877F2] text-[#1877F2]' : ''
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Subcategory / Type Badge */}
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              {listing.subcategory_name && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#1877F2]">
                  {listing.subcategory_name}
                </span>
              )}
            </div>

            {/* Short Description */}
            {listing.short_description && (
              <p className="text-xs text-[#65676B] line-clamp-2 mt-1 leading-relaxed">
                {listing.short_description}
              </p>
            )}
          </div>
        </div>

        {/* Location & Opening Hours info */}
        <div className="mt-2.5 pt-2 border-t border-[#E4E6EB] text-[11px] text-[#65676B] flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-1 text-[#65676B] truncate max-w-[180px]">
            <MapPin className="w-3 h-3 text-[#1877F2] shrink-0" />
            <span className="truncate">{listing.area ? `${listing.area}, ` : ''}{listing.union || 'বোয়ালখালী'}</span>
          </div>

          {listing.opening_hours && (
            <span className="text-[10px] text-[#65676B] font-medium truncate max-w-[120px]">
              {listing.opening_hours}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="mt-2.5 pt-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[#050505] bg-[#F0F2F5] px-2 py-0.5 rounded text-[11px]">
          {listing.phone}
        </span>

        <button
          id={`call-btn-${listing.id}`}
          onClick={handleCallClick}
          className="flex items-center gap-1 bg-[#1877F2] hover:bg-[#166FE5] active:scale-95 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-2xs transition-all cursor-pointer"
        >
          <Phone className="w-3 h-3" />
          কল করুন
        </button>
      </div>
    </div>
  );
};
