import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  Plus, 
  ShoppingBag, 
  Star, 
  Check, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  X, 
  Loader2 
} from 'lucide-react';
import { Product, STATIC_PRODUCTS } from '../../data/staticData.js';
import { useData } from '../../context/DataContext.js';

interface InfiniteProductFeedProps {
  navigate: (path: string) => void;
}

export const InfiniteProductFeed: React.FC<InfiniteProductFeedProps> = ({ navigate }) => {
  const { addToCart, setIsCartOpen, showToast } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Infinite Scroll State
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter categories
  const filterTabs = [
    { id: 'all', name: 'সব পণ্য' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'shirt', name: 'Shirt' },
    { id: 'panjabi', name: 'Panjabi' },
    { id: 'toys', name: 'Toys' },
    { id: 'digital-products', name: 'Digital' },
    { id: 'groceries', name: 'মুদি ও চাল' },
    { id: 'fruits', name: 'ফলমূল' },
    { id: 'electronics', name: 'ইলেকট্রনিক্স' },
  ];

  // Base list according to selected filter
  const baseProducts = React.useMemo(() => {
    if (selectedFilter === 'all') return STATIC_PRODUCTS;
    return STATIC_PRODUCTS.filter((p) => p.category === selectedFilter);
  }, [selectedFilter]);

  // Reset feed on filter change
  useEffect(() => {
    const initialBatch = baseProducts.slice(0, 9);
    setDisplayedProducts(initialBatch);
    setPage(1);
    setHasMore(true);
    setIsLoadingMore(false);
  }, [selectedFilter, baseProducts]);

  // Load next batch
  const loadMoreItems = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayedProducts((prev) => {
        const batchSize = 6;
        const currentLength = prev.length;
        
        // Cycle through products smoothly so user can scroll indefinitely
        const nextItems: Product[] = [];
        for (let i = 0; i < batchSize; i++) {
          const itemIndex = (currentLength + i) % baseProducts.length;
          const original = baseProducts[itemIndex];
          // Create unique clone for endless continuous scrolling
          nextItems.push({
            ...original,
            id: `${original.id}-inf-${currentLength + i}`,
          });
        }
        return [...prev, ...nextItems];
      });

      setPage((prevPage) => prevPage + 1);
      setIsLoadingMore(false);
    }, 450);
  }, [isLoadingMore, baseProducts]);

  // IntersectionObserver for continuous scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreItems();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreItems, isLoadingMore]);

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

  return (
    <section className="bg-white rounded-3xl p-3.5 sm:p-5 border border-[#E4E6EB] shadow-2xs space-y-3.5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold shadow-xs shrink-0">
            <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#050505]">
                সকল পণ্য ও বাজার
              </h2>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                লাইভ ফিড
              </span>
            </div>
            <p className="text-[11px] text-[#65676B]">
              স্ক্রল করলেই নতুন নতুন পণ্য লোড হতে থাকবে
            </p>
          </div>
        </div>

        {/* Total loaded counter */}
        <div className="text-xs text-gray-500 font-medium">
          প্রদর্শিত: <span className="font-bold text-[#1877F2]">{displayedProducts.length}</span> টি পণ্য
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedFilter === tab.id
                ? 'bg-[#1877F2] text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Responsive Grid: AT LEAST 3 PRODUCTS VISIBLE PER ROW (3 cols on mobile, 4 on md, 5 on lg) */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 pt-1">
        {displayedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            onClick={() => setActiveProduct(product)}
            className="bg-white rounded-xl sm:rounded-2xl border border-[#E4E6EB] hover:border-[#1877F2] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
          >
            <div>
              {/* Product Image */}
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

            {/* Action: Compact Add to Cart */}
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
        ))}
      </div>

      {/* Infinite Scroll Sentinel & Loader */}
      <div
        ref={observerTarget}
        className="w-full py-6 flex flex-col items-center justify-center text-gray-500"
      >
        {isLoadingMore ? (
          <div className="flex items-center gap-2 bg-blue-50 text-[#1877F2] px-4 py-2 rounded-full border border-blue-200 text-xs font-bold shadow-xs animate-bounce">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>আরও পণ্য লোড হচ্ছে...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>নিচে স্ক্রল করুন, আরও পণ্য স্বয়ংক্রিয়ভাবে লোড হবে</span>
          </div>
        )}
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
                পণ্যের বিবরণ
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
