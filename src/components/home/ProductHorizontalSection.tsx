import React, { useRef, useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Plus, 
  ShoppingBag, 
  Check, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  X,
  LucideIcon
} from 'lucide-react';
import { Product } from '../../data/staticData.js';
import { useData } from '../../context/DataContext.js';

interface ProductHorizontalSectionProps {
  title: string;
  subtitle?: string;
  categoryId: string;
  icon: LucideIcon;
  iconBgClass: string;
  navigate: (path: string) => void;
  products: Product[];
}

export const ProductHorizontalSection: React.FC<ProductHorizontalSectionProps> = ({
  title,
  subtitle,
  categoryId,
  icon: IconComponent,
  iconBgClass,
  navigate,
  products,
}) => {
  const { addToCart, setIsCartOpen, showToast } = useData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`"${product.name.slice(0, 18)}..." কার্টে যোগ হয়েছে`, 'success');
  };

  const handleDirectOrder = (product: Product) => {
    addToCart(product);
    setActiveProduct(null);
    setIsCartOpen(true);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-3xl p-3 sm:p-4 md:p-5 border border-[#E4E6EB] shadow-2xs space-y-2.5 relative">
      {/* Header with Title & View All */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${iconBgClass}`}>
            <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-[#050505] tracking-tight truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[10px] sm:text-[11px] text-[#65676B] truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Action Controls: Desktop Scroll Arrows + View All Button */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="hidden sm:flex items-center gap-1 mr-1">
            <button
              onClick={() => scroll('left')}
              className="w-6 h-6 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              title="পূর্ববর্তী"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-6 h-6 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              title="পরবর্তী"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => navigate(`/products/${categoryId}`)}
            className="text-[11px] sm:text-xs font-bold text-[#1877F2] hover:text-blue-700 flex items-center gap-0.5 cursor-pointer bg-blue-50 hover:bg-blue-100 px-2 sm:px-2.5 py-1 rounded-lg transition-all"
          >
            <span>সব ({products.length})</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Product Cards - AT LEAST 3 VISIBLE AT ONCE */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5 -mx-1 px-1 sm:mx-0 sm:px-0"
      >
        {products.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="w-[calc(33.333%-6px)] min-w-[104px] sm:w-[155px] md:w-[175px] shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl border border-[#E4E6EB] hover:border-[#1877F2] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative h-24 xs:h-28 sm:h-36 w-full overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {product.discountPercent && (
                    <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 bg-rose-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      -{product.discountPercent}%
                    </div>
                  )}

                  {product.unit && (
                    <div className="hidden xs:block absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded truncate max-w-[85%]">
                      {product.unit}
                    </div>
                  )}
                </div>

                {/* Info (Reduced Text) */}
                <div className="p-1.5 sm:p-2.5 space-y-1">
                  <h3 className="font-semibold text-[11px] sm:text-xs text-[#050505] line-clamp-1 group-hover:text-[#1877F2] transition-colors leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs sm:text-sm font-black text-[#1877F2]">
                      ৳{product.price.toLocaleString('bn-BD')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[9px] sm:text-[10px] text-gray-400 line-through">
                        ৳{product.originalPrice.toLocaleString('bn-BD')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button: Compact Add to Cart */}
              <div className="p-1.5 sm:p-2 pt-0">
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full py-1 sm:py-1.5 bg-blue-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-blue-200 hover:border-transparent rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-2xs active:scale-95 cursor-pointer"
                  title="কার্টে যোগ করুন"
                >
                  <Plus className="w-3 h-3" />
                  <span>কার্ট</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-150">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveProduct(null)}
          />

          <div className="relative mx-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E4E6EB] z-10 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-3.5 border-b border-[#E4E6EB] flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {title} • বিবরণ
              </span>
              <button
                onClick={() => setActiveProduct(null)}
                className="w-7 h-7 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-3.5 max-h-[75vh] overflow-y-auto no-scrollbar">
              <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {activeProduct.discountPercent && (
                  <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-xs font-black px-2 py-0.5 rounded-md shadow-md">
                    {activeProduct.discountPercent}% ছাড়
                  </div>
                )}
                <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                  {activeProduct.unit}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs text-[#65676B] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {activeProduct.seller} ({activeProduct.union})
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-xs font-bold text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{activeProduct.rating}</span>
                    <span className="text-gray-400">({activeProduct.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#050505] leading-snug">
                  {activeProduct.name}
                </h2>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-gray-500">মূল্য:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-[#1877F2]">
                      ৳{activeProduct.price.toLocaleString('bn-BD')}
                    </span>
                    {activeProduct.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{activeProduct.originalPrice.toLocaleString('bn-BD')}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    <Check className="w-3 h-3" />
                    স্টকে আছে
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">পণ্যের বিবরণ:</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
                  {activeProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl border border-gray-200 flex items-center gap-2 bg-white">
                  <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-800 text-[11px]">ডেলিভারি</div>
                    <div className="text-[10px] text-gray-500">{activeProduct.deliveryTime}</div>
                  </div>
                </div>
                <div className="p-2 rounded-xl border border-gray-200 flex items-center gap-2 bg-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-800 text-[11px]">কোয়ালিটি</div>
                    <div className="text-[10px] text-gray-500">১০০% ভেরিফাইড</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3 border-t border-[#E4E6EB] bg-slate-50 flex items-center gap-2.5">
              <button
                onClick={(e) => {
                  handleAddToCart(e, activeProduct);
                  setActiveProduct(null);
                }}
                className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-[#1877F2] font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors border border-blue-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>কার্ট</span>
              </button>
              <button
                onClick={() => handleDirectOrder(activeProduct)}
                className="flex-1 py-2 bg-[#1877F2] hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>এখনই অর্ডার</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
