import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { STATIC_STORIES, StoryPromo } from '../../data/staticData.js';

interface BoalkhaliHeroSliderProps {
  navigate: (path: string) => void;
}

export const BoalkhaliHeroSlider: React.FC<BoalkhaliHeroSliderProps> = ({ navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: StoryPromo[] = STATIC_STORIES;

  // Auto slide rotation
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section 
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slide Carousel Container */}
      <div 
        className="relative w-full h-48 xs:h-56 sm:h-64 md:h-72 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => navigate(currentSlide.linkAction)}
      >
        {/* Slide Images with smooth fade/zoom */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          </div>
        ))}

        {/* Minimal Text Overlay: strictly NO bulky paragraphs */}
        <div className="absolute inset-0 z-20 p-3.5 sm:p-5 flex flex-col justify-between text-white pointer-events-none">
          {/* Top Tag & Slide Indicators & Badge */}
          <div className="flex items-center justify-between">
            <span className="bg-[#0F4A2E] text-[#F39C12] border border-[#F39C12]/40 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              {currentSlide.tag}
            </span>

            {/* Slide Dots inside banner */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full pointer-events-auto">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 transition-all rounded-full cursor-pointer ${
                    currentIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {currentSlide.badge && (
              <span className="bg-[#EA580C] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                {currentSlide.badge}
              </span>
            )}
          </div>

          {/* Bottom Title & Action Chip - Concise! */}
          <div className="flex items-end justify-between gap-3">
            <div className="max-w-[75%]">
              <h3 className="text-sm sm:text-lg md:text-xl font-black text-white leading-snug drop-shadow-md">
                {currentSlide.title}
              </h3>
            </div>

            <div className="pointer-events-auto shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(currentSlide.linkAction);
                }}
                className="bg-white/95 hover:bg-white text-[#0F4A2E] hover:text-[#EA580C] text-[11px] sm:text-xs font-black px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1 transition-all group-hover:scale-105 cursor-pointer"
              >
                <span>{currentSlide.linkText || 'দেখুন'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrow Controls (Desktop & tablet) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
